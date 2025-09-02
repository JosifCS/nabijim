import { GetPrivateStation, GetProvider } from "./queries"

export const EMPTY_PRIVATE_STATION: GetPrivateStation = {
	id: 0,
	publicId: null,
	privateId: null,
	serialNumber: null,
	name: String.Empty,
	chargingHubId: 0,
	connectors: [],
	chargingHub: {
		id: 0,
		email: null,
		name: String.Empty,
		city: null,
		street: null,
		streetNumber: null,
		houseNumber: null,
		postalCode: null,
		country: null,
		phoneNumber: null,
		url: null,
		latitude: null,
		longitude: null,
	},
}

export const EMPTY_PROVIDER: GetProvider = {
	id: 0,
	description: null,
	email: null,
	importUrl: null,
	name: String.Empty,
	phoneNumber: null,
	url: null,
	importSchema: null,
}
