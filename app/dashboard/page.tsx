import { ChargingStats } from "@/components/charging-stats"
import { RecentChargings } from "@/components/recent-chargings"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Dashboard")

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="text-center mb-8">
				<Button
					// onClick={() => setShowAddDialog(true)}
					size="lg"
					className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
				>
					<Plus className="h-6 w-6 mr-2" />
					{t("recordCharging")}
				</Button>
			</div>

			<ChargingStats />

			<RecentChargings />
		</div>
	)
}
