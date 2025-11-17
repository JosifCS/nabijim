import { Card, CardContent, CardHeader } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import {
	BatteryFull,
	BatteryLow,
	BatteryMedium,
	Cable,
	PlugZap,
	Plus,
	Zap,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Skeleton } from "./ui/skeleton"
import { TableList, TableListItem } from "./common/table-list"

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
				btnHref={`/user/settings/dialog/connector?stationId=${stationId}`}
				btnIcon={<Plus />}
			/>
			<CardContent className="flex flex-col gap-2">
				<TableList
					count={connectors.length}
					emptyLabel={t("noConnectors")}
					emptyIcon={<Zap />}
				>
					{connectors.map((x) => {
						const Icon =
							x.power > 200
								? BatteryFull
								: x.power > 50
								? BatteryMedium
								: BatteryLow

						return (
							<TableListItem
								key={x.id}
								title={`${x.dc ? "DC" : "AC"} –⁠⁠⁠⁠⁠⁠ ${
									x.type
								}`}
								icon={<Icon />}
								editHref={`/user/settings/station`}
							>
								<span title={t("priceKwh")}>XX Kč/kWh</span>
								{x.needCable && (
									<span className="flex items-center gap-1">
										<Cable className="h-3 w-3" />
										{t("needCable")}
									</span>
								)}
							</TableListItem>
						)
					})}
				</TableList>
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
