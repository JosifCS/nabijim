import { ButtonLink } from "@/components/common/button-link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import {
	BatteryFull,
	BatteryLow,
	BatteryMedium,
	Cable,
	Edit,
	PlugZap,
	Plus,
	Trash2,
	Zap,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Skeleton } from "./ui/skeleton"

export async function Connectors({ stationId }: { stationId: number }) {
	const t = await getTranslations("Components.Connectors")

	const connectors = await prisma.connector.findMany({
		where: { stationId },
	})

	return (
		<Card>
			<CardHeader
				title={t("connectors")}
				description={t("description")}
				icon={<PlugZap />}
				btnLabel={t("addConnector")}
				btnHref="/user/settings/station"
				btnIcon={<Plus />}
			/>
			<CardContent className="flex flex-col gap-2">
				{connectors.length === 0 ? (
					<div className="text-center py-8 text-gray-500 dark:text-gray-400">
						<Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>{t("noConnectors")}</p>
					</div>
				) : (
					<div className="grid gap-4">
						{connectors.map((x) => {
							const Icon =
								x.power > 200
									? BatteryFull
									: x.power > 50
									? BatteryMedium
									: BatteryLow

							return (
								<div
									key={x.id}
									className="flex items-center justify-between p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20"
								>
									<div className="flex items-center gap-3">
										<div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full">
											<Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
										</div>
										<div>
											<h3 className="font-semibold text-emerald-800 dark:text-emerald-200">
												{`${
													x.dc ? "DC" : "AC"
												} –⁠⁠⁠⁠⁠⁠ ${x.type}`}
											</h3>
											<div className="flex items-center gap-4 text-sm text-emerald-600 dark:text-emerald-400">
												<span title={t("priceKwh")}>
													XX Kč/kWh
												</span>
												{x.needCable && (
													<span className="flex items-center gap-1">
														<Cable className="h-3 w-3" />
														{t("needCable")}
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<ButtonLink
											href={`/user/settings/station`}
											variant="outline"
											size="sm"
											title={t("edit")}
											className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300"
										>
											<Edit className="h-4 w-4" />
										</ButtonLink>
										<Button
											variant="outline"
											size="sm"
											title={t("remove")}
											className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export async function PrivateStationsSkeleton() {
	const t = await getTranslations("Components.Connectors")

	return (
		<Card>
			<CardHeader
				title={t("connectors")}
				description={t("description")}
				icon={<PlugZap />}
				btnSkeleton="w-32"
			/>
			<CardContent className="flex flex-col gap-2">
				{[0, 1, 2].map((x) => (
					<div
						key={x}
						className="flex items-center justify-between p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20"
					>
						<div className="flex items-center gap-3">
							<div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full">
								<Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
							</div>
							<div>
								<Skeleton className="h-5 w-28 mb-2" />
								<Skeleton className="h-4 w-36" />
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-8 w-9" />
							<Skeleton className="h-8 w-9" />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
