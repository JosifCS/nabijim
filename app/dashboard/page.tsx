import { ChargingStats } from "@/components/charging-stats"
import { ButtonLink } from "@/components/common/button-link"
import { RecentChargings } from "@/components/recent-chargings"
import { Plus } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Dashboard")

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="text-center mb-8">
				<ButtonLink
					href="/dashboard/dialog/new-charge"
					size="lg"
					className="px-8 py-4 text-lg font-semibold"
				>
					<Plus className="h-6 w-6 mr-2" />
					{t("recordCharging")}
				</ButtonLink>
			</div>

			<ChargingStats />

			<RecentChargings />
		</div>
	)
}
