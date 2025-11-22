import prisma from "@/lib/prisma"
import { ConnectorType } from "./connectors"

export class StationImport {
	private providerId: number

	constructor(providerId: number) {
		this.providerId = providerId
	}

	public async downloadScheme() {
		const provider = await prisma.provider.findFirst({
			where: { id: this.providerId },
			select: { importUrl: true, importSchema: true },
		})

		if (provider == null)
			throw new Error(
				`Station import data error, no provider with id ${this.providerId}`
			)

		if (provider.importUrl == null)
			throw new Error(
				`Station import data error, provider without import URL.`
			)

		if (provider.importSchema == null)
			throw new Error(
				`Station import data error, provider without import schema.`
			)

		const resp = await StationImport.fetchScheme(provider.importUrl)

		let data: unknown
		try {
			data = await resp.json()
		} catch (e) {
			throw new Error(
				`Station import data parse error: ${(e as Error).message}`
			)
		}

		let imp: StationImportProvider
		switch (provider.importSchema) {
			case "cez-2025":
				if (isProviderCez2025Scheme(data))
					imp = new StationImportCez2025(this.providerId, data)
				else
					throw new Error(
						`Station download error, invalid data for scheme: ${provider.importSchema}`
					)
				break
			default:
				throw new Error(
					`Station download error, invalid scheme type: ${provider.importSchema}`
				)
		}

		imp.run()
	}

	private static async fetchScheme(url: string) {
		let resp: Response
		try {
			resp = await fetch(url)
		} catch (e) {
			throw new Error(
				`Station import fetch error: ${(e as Error).message}`
			)
		}

		if (!resp.ok)
			throw new Error(`Station import fetch KO status: ${resp.status}`)

		return resp
	}
}

abstract class StationImportProvider<T = unknown> {
	protected data: T
	protected providerId: number
	protected abstract CONNECTORS: Record<
		Cez2025Scheme[0]["evses"][0]["connectors"][0]["standard"],
		ConnectorType
	>

	constructor(providerId: number, data: T) {
		this.data = data
		this.providerId = providerId
	}

	abstract run(): Promise<void>
}

class StationImportCez2025 extends StationImportProvider<Cez2025Scheme> {
	protected CONNECTORS: Record<
		Cez2025Scheme[0]["evses"][0]["connectors"][0]["standard"],
		ConnectorType
	> = {
		CCS_COMBO: "CCS2",
		CHADEMO: "CHADEMO",
		MENNEKES_TYPE_2: "TYPE_2",
	}

	constructor(providerId: number, data: Cez2025Scheme) {
		super(providerId, data)
	}

	public async run() {
		await this.deactivateRemovedStations(this.data)

		// stanice zařadit do hubu podle stejné adresy, nebo podle stejných souřadnic
		for (const station of this.data) {
			let hub = await this.findExitingHub(station)
			if (hub == null) hub = await this.newHub(station)

			const dbStation = await this.createOrUpdateStation(station, hub.id)

			await this.deactivateRemovedConnectors(dbStation.id, station.evses)

			for (const evse of station.evses) {
				for (const connector of evse.connectors) {
					const ac = connector.standard == "MENNEKES_TYPE_2",
						power =
							connector.powerOutput ??
							3 ** (1 / 2) *
								(connector.voltage ?? 0) *
								(connector.amperage ?? 0),
						type = this.CONNECTORS[connector.standard]

					const dbConnector = await prisma.connector.findFirst({
						where: {
							stationId: dbStation.id,
							customId: connector.connectorID.toString(),
						},
						select: {
							id: true,
						},
					})

					if (dbConnector)
						await prisma.connector.update({
							where: { id: dbConnector.id },
							data: { dc: !ac, needCable: ac, type, power },
						})
					else
						await prisma.connector.create({
							data: {
								dc: !ac,
								needCable: ac,
								type,
								power,
								stationId: dbStation.id,
							},
						})
				}
			}
		}
	}

	private async deactivateRemovedStations(stations: Cez2025Scheme) {
		const newCustomIds = stations.map((x) => x.customID)
		const existingStations = await prisma.publicStation.findMany({
			where: { providerId: this.providerId },
			select: { customId: true, stationId: true },
		})

		const notAvailable = existingStations.filter(
			(x) => x.customId == null || !newCustomIds.includes(x.customId)
		)

		await prisma.station.updateMany({
			where: { id: { in: notAvailable.map((x) => x.stationId) } },
			data: { available: false },
		})
	}

	private async deactivateRemovedConnectors(
		stationId: number,
		evses: Cez2025Scheme[0]["evses"]
	) {
		const newConnectorIds = evses
			.map((x) => x.connectors.map((x) => x.connectorID))
			.flat(1)
		const existingConnectors = await prisma.connector.findMany({
			where: { stationId },
			select: { customId: true, id: true },
		})

		const notAvailable = existingConnectors.filter(
			(x) =>
				x.customId == null ||
				!newConnectorIds.includes(Number(x.customId))
		)

		await prisma.connector.updateMany({
			where: { id: { in: notAvailable.map((x) => x.id) } },
			data: { available: false },
		})
	}

	private async newHub(station: Cez2025Scheme[0]) {
		return await prisma.chargingHub.create({
			data: {
				city: station.address.city,
				country: station.address.country,
				email: station.address.email,
				houseNumber: null,
				latitude: station.address.latitude,
				longitude: station.address.longitude,
				name: station.name.split(" ").at(0) ?? "N/A",
				phoneNumber: station.address.phoneNumber,
				postalCode: station.address.postalCode,
				street: station.address.street,
				streetNumber: null,
				url: station.address.url,
			},
			select: { id: true },
		})
	}

	private async createOrUpdateStation(
		station: Cez2025Scheme[0],
		hubId: number
	) {
		let dbStation = await prisma.station.findFirst({
			where: { public: { customId: { equals: station.customID } } },
			select: {
				id: true,
				publicId: true,
				connectors: {
					select: { id: true, customId: true },
				},
			},
		})

		if (dbStation == null) {
			dbStation = await prisma.station.create({
				data: {
					name: station.name,
					chargingHubId: hubId,
					public: {
						create: {
							customId: station.customID,
							imageUrl: station.images.at(0)?.imageUrl,
							providerId: this.providerId,
						},
					},
				},
				select: {
					id: true,
					publicId: true,
					connectors: {
						select: { id: true, customId: true },
					},
				},
			})
		} else {
			dbStation = await prisma.station.update({
				data: {
					name: station.name,
					chargingHubId: hubId,
					public: {
						upsert: {
							where: dbStation.publicId
								? { id: dbStation.publicId }
								: {},
							create: {
								customId: station.customID,
								imageUrl: station.images.at(0)?.imageUrl,
								providerId: this.providerId,
							},
							update: {
								customId: station.customID,
								imageUrl: station.images.at(0)?.imageUrl,
								providerId: this.providerId,
							},
						},
					},
				},
				where: {
					id: dbStation.id,
				},
				select: {
					id: true,
					publicId: true,
					connectors: {
						select: { id: true, customId: true },
					},
				},
			})
		}

		return dbStation
	}

	private async findExitingHub(station: Cez2025Scheme[0]) {
		return await prisma.chargingHub.findFirst({
			where: {
				OR: [
					{
						AND: [
							{ street: { equals: station.address.street } },
							{ city: { equals: station.address.city } },
							{
								country: {
									equals: station.address.country,
								},
							},
						],
					},
					{
						AND: [
							{
								latitude: {
									equals: station.address.latitude,
								},
							},
							{
								longitude: {
									equals: station.address.longitude,
								},
							},
						],
					},
				],
			},
			select: { id: true },
		})
	}
}

export const ProviderDataSchemes = ["cez-2025"] as const

export type ProviderDataScheme = (typeof ProviderDataSchemes)[number]

function isProviderCez2025Scheme(obj: unknown): obj is Cez2025Scheme {
	return (
		Array.isArray(obj) &&
		typeof obj[0] === "object" &&
		typeof obj[0].name === "string" &&
		typeof obj[0].visible === "boolean" &&
		typeof obj[0].customID === "string" &&
		Array.isArray(obj[0].description) &&
		typeof obj[0].description[0] === "object" &&
		typeof obj[0].description[0].language === "string" &&
		typeof obj[0].description[0].text === "string" &&
		Array.isArray(obj[0].images) &&
		typeof obj[0].images[0].imageUrl === "string" &&
		// typeof obj[0].instructions &&
		typeof obj[0].address === "object" &&
		typeof obj[0].address.street === "string" &&
		typeof obj[0].address.houseNumber === "string" &&
		// typeof obj[0].address.floor
		// typeof obj[0].address.postalCode
		typeof obj[0].address.city === "string" &&
		typeof obj[0].address.country === "string" &&
		// typeof obj[0].address.phoneNumber
		// typeof obj[0].address.email
		typeof obj[0].address.url === "string" &&
		typeof obj[0].address.latitude === "number" &&
		typeof obj[0].address.longitude === "number" &&
		Array.isArray(obj[0].evses) &&
		typeof obj[0].evses[0] === "object" &&
		typeof obj[0].evses[0].physicalReference === "string" &&
		Array.isArray(obj[0].evses[0].connectors) &&
		typeof obj[0].evses[0].connectors[0].connectorID === "number" &&
		typeof obj[0].evses[0].connectors[0].standard === "string" &&
		typeof obj[0].evses[0].connectors[0].format === "string" &&
		(typeof obj[0].evses[0].connectors[0].voltage === "number" ||
			obj[0].evses[0].connectors[0].voltage == null) &&
		(typeof obj[0].evses[0].connectors[0].amperage === "number" ||
			obj[0].evses[0].connectors[0].amperage == null) &&
		(typeof obj[0].evses[0].connectors[0].powerOutput === "number" ||
			obj[0].evses[0].connectors[0].powerOutput == null) &&
		typeof obj[0].evses[0].connectors[0].chargePointIdentity === "string"
	)
}

type Cez2025Scheme = {
	name: string
	visible: boolean
	customID: string
	description: {
		/** "cs" */
		language: string
		text: string
	}[]
	images: {
		imageUrl: string
	}[]
	instructions: null
	address: {
		street: string
		houseNumber: string
		floor: null
		postalCode: null
		city: string
		/** "CZE" */
		country: string
		phoneNumber: null
		email: null
		url: string
		latitude: number
		longitude: number
	}
	evses: {
		/** "R404 */
		physicalReference: string
		connectors: [
			{
				connectorID: number
				standard: "MENNEKES_TYPE_2" | "CCS_COMBO" | "CHADEMO"
				format: "CABLE"
				voltage: number | null
				amperage: number | null
				powerOutput: number | null
				chargePointIdentity: string
			}
		]
	}[]
}[]
