import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { addressString } from "@/modules/utils"
import {
	Calendar,
	Clock,
	Earth,
	Edit,
	Euro,
	MapPin,
	UserLock,
	Zap,
} from "lucide-react"
import { notFound } from "next/navigation"

export default async function Page() {
	const user = await authorize()
	const station = await prisma.chargeStation.findFirst({
		where: { id: 0 },
		select: {
			provider: true,
			customName: true,
			name: true,
			userId: true,
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

	if (station == null) return notFound()

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="mb-8">
				<div className="flex items-start justify-between mb-4">
					<div>
						<h1 className="text-3xl text-emerald-800 dark:text-emerald-200 mb-2">
							{station.customName?.length ? (
								<>
									<span className="font-bold">
										{station.customName}
									</span>
									<span className="font-bold">
										({station.name})
									</span>
								</>
							) : (
								station.name
							)}
						</h1>
						<div className="flex items-center gap-4 text-emerald-700 dark:text-emerald-300">
							<div className="flex items-center gap-1">
								{station.provider != null && (
									<Earth className="h-4 w-4" />
								)}
								{station.userId != null && (
									<UserLock className="h-4 w-4" />
								)}
								<span>
									{station.provider?.name ?? user.email}
								</span>
							</div>
							{(station.city || station.street) && (
								<div className="flex items-center gap-1">
									<MapPin className="h-4 w-4" />
									<span>{addressString(station)}</span>
								</div>
							)}
						</div>
					</div>
					<Button
						variant="outline"
						className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
					>
						<Edit className="h-4 w-4 mr-2" />
						Upravit
					</Button>
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
