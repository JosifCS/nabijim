import { TrendingUp, Zap, Euro, Calendar } from "lucide-react"
import { StatCard, StatCardSkeleton } from "./common/stat-card"
import { getLocale, getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

export async function ChargingStats() {
	const locale = await getLocale()
	const t = await getTranslations("Components.ChargingStats")

	const totalCount = 1,
		totalKwh = 55,
		totalCost = 1235,
		averageCost = 9.54,
		thisMonthKwh = 89,
		thisMonthCost = 984

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<StatCard
				label={t("thisMonth")}
				value={`${thisMonthKwh.toFixed(1)} kWh`}
				description={t("thisMonthDesc", { thisMonthCost })}
				icon={<TrendingUp />}
			/>

			<StatCard
				label={t("totalEnergy")}
				value={`${totalKwh.toFixed(1)} kWh`}
				description={t("totalEnergyDesc")}
				icon={<Zap />}
			/>

			<StatCard
				label={t("totalCost")}
				value={totalCost.toLocaleString(locale, {
					style: "currency",
					currency: "CZK",
				})}
				description={t("totalCostDesc", { averageCost })}
				icon={<Euro />}
			/>

			<StatCard
				label={t("totalCount")}
				value={totalCount.toFixed()}
				description={t("totalCountDesc")}
				icon={<Calendar />}
			/>
		</div>
	)
}

export function ChargingStatsSkeleton() {
	const t = useTranslations("Components.ChargingStats")

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<StatCardSkeleton label={t("thisMonth")} icon={<TrendingUp />} />

			<StatCardSkeleton label={t("totalEnergy")} icon={<Zap />} />

			<StatCardSkeleton label={t("totalCost")} icon={<Euro />} />

			<StatCardSkeleton label={t("totalCount")} icon={<Calendar />} />
		</div>
	)
}
