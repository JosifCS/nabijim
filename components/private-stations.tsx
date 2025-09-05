import { Card, CardContent, CardHeader } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { addressString } from "@/modules/utils"
import { MapPin, Plus, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Skeleton } from "./ui/skeleton"
import { TableList, TableListItem } from "./common/table-list"

export async function PrivateStations({ userId }: { userId: number }) {
	const t = await getTranslations("Components.PrivateStations")

	const stations = await prisma.privateStation.findMany({
		where: { userId },
		select: { id: true, station: { include: { chargingHub: true } } },
	})

	return (
		<Card>
			<CardHeader
				title={t("stations")}
				description={t("chargeDescription")}
				icon={<Zap />}
				btnLabel={t("addStation")}
				btnIcon={<Plus />}
				btnHref="/user/settings/station"
			/>
			<CardContent className="flex flex-col gap-2">
				<TableList
					count={stations.length}
					emptyLabel={t("noStations")}
					emptyIcon={<Zap />}
				>
					{stations.map((x) => (
						<TableListItem
							key={x.id}
							title={x.station.name}
							icon={<Zap />}
							editHref={`/user/settings/station?id=${x.station.id}`}
						>
							<span title={t("priceKwh")}>XX Kč/kWh</span>
							{addressString(x.station.chargingHub) && (
								<span
									className="flex items-center gap-1"
									title={t("address")}
								>
									<MapPin className="h-3 w-3" />
									{addressString(x.station.chargingHub)}
								</span>
							)}
						</TableListItem>
					))}
				</TableList>
			</CardContent>
		</Card>
	)
}

export async function PrivateStationsSkeleton() {
	const t = await getTranslations("Components.PrivateStations")

	return (
		<Card>
			<CardHeader
				title={t("stations")}
				description={t("chargeDescription")}
				icon={<Zap />}
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
