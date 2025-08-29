import { editPrivateStation } from "@/actions/edit-private-station"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { Calendar, Clock, Euro, Zap } from "lucide-react"
import { notFound } from "next/navigation"

export default async function Page({
	searchParams,
}: PageProps<"/user/settings/station">) {
	const user = await authorize()
	const { id } = await searchParams

	const station = Number(id)
		? await getPrivateStation(user.id, Number(id))
		: NEW_STATION

	if (!station) return notFound()

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<Card>
				<CardContent>
					<Form action={editPrivateStation}>
						<FormInput
							type="text"
							name="name"
							defaultValue={station.name}
							placeholder="Name"
						/>
						<FormInput
							type="text"
							name="city"
							defaultValue={station.city ?? ""}
							placeholder="City"
						/>
						<FormInput
							type="text"
							name="street"
							defaultValue={station.street ?? ""}
							placeholder="Street"
						/>
						<FormInput
							type="number"
							name="streetNumber"
							defaultValue={station.streetNumber ?? ""}
							placeholder="Street number"
						/>
						<FormInput
							type="number"
							name="houseNumber"
							defaultValue={station.houseNumber ?? ""}
							placeholder="House number"
						/>
					</Form>
				</CardContent>
			</Card>

			<div className="mb-8">
				<div className="flex items-start justify-between mb-4">
					<div></div>
				</div>
			</div>

			<p>STATISTIKY - Celkem nabíjení, Celkem kWh, Celkem utraceno</p>

			{station.connectors.map((x) => (
				<Card key={x.id}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Zap className="h-5 w-5 text-emerald-600" />
							{x.name || `Konektor ${x.id}`}
							<Badge variant={x.dc ? "default" : "secondary"}>
								{x.dc ? "DC" : "AC"}
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent>
						{x.tariffs.length === 0 ? (
							<p className="text-gray-500 dark:text-gray-400">
								Žádné tarify nejsou k dispozici
							</p>
						) : (
							<div className="space-y-4">
								{x.tariffs.map((tar) => (
									<div
										key={tar.id}
										className="border border-emerald-200 dark:border-emerald-800 rounded-lg p-4"
									>
										<div className="flex items-center justify-between mb-3">
											<h4 className="font-semibold text-emerald-800 dark:text-emerald-200">
												{tar.name || `Tarif ${tar.id}`}
											</h4>
											<div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
												<Calendar className="h-4 w-4" />
												<span>
													{new Date(
														tar.validFrom
													).toLocaleDateString(
														"cs-CZ"
													)}
													{tar.validTo &&
														` - ${new Date(
															tar.validTo
														).toLocaleDateString(
															"cs-CZ"
														)}`}
												</span>
											</div>
										</div>
										<div className="grid gap-2">
											{tar.times.map((time) => (
												<div
													key={time.id}
													className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded"
												>
													<div className="flex items-center gap-4">
														<div className="flex items-center gap-1">
															<Clock className="h-4 w-4 text-emerald-600" />
															<span className="text-sm">
																{time.from} -{" "}
																{time.to}
															</span>
														</div>
														<div className="flex gap-1">
															{time.days.map(
																(day) => (
																	<Badge
																		key={
																			day
																		}
																		variant="outline"
																		className="text-xs"
																	>
																		{day}
																	</Badge>
																)
															)}
														</div>
													</div>
													<div className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300">
														<Euro className="h-4 w-4" />
														<span>
															{time.price} Kč/kWh
														</span>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	)
}

const NEW_STATION = {
	id: 0,
	name: String.Empty,
	city: String.Empty,
	street: String.Empty,
	streetNumber: null,
	houseNumber: null,
	connectors: [],
}

async function getPrivateStation(userId: number, id: number) {
	return await prisma.station.findFirst({
		where: { id, private: { userId } },
		select: {
			id: true,
			name: true,
			city: true,
			streetNumber: true,
			street: true,
			houseNumber: true,
			connectors: {
				select: {
					dc: true,
					id: true,
					tariffs: {
						select: {
							times: true,
							name: true,
							id: true,
							validFrom: true,
							validTo: true,
						},
					},
					name: true,
					chargeSessions: true,
				},
			},
		},
	})
}
