import { Container } from "@/components/common/container"
import {
	PrivateStations,
	PrivateStationsSkeleton,
} from "@/components/private-stations"
import {
	PrivateTariffs,
	PrivateTariffsSkeleton,
} from "@/components/private-tariffs"

import { authorize } from "@/modules/auth"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

export default async function Page() {
	const user = await authorize()
	const t = await getTranslations("User.Settings")

	return (
		<Container title={t("settings")} description={t("description")}>
			<Suspense fallback={<PrivateStationsSkeleton />}>
				<PrivateStations userId={user.id} />
			</Suspense>
			<Suspense fallback={<PrivateTariffsSkeleton />}>
				<PrivateTariffs userId={user.id} />
			</Suspense>
		</Container>
	)
}
