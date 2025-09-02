import {
	PrivateStations,
	PrivateStationsSkeleton,
} from "@/components/private-stations"
import { Providers, ProvidersSkeleton } from "@/components/providers"

import { authorize } from "@/modules/auth"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

export default async function Page() {
	const user = await authorize()
	const t = await getTranslations("Administration")

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
					{t("administration")}
				</h1>
				<p className="text-emerald-700 dark:text-emerald-300">
					{t("description")}
				</p>
			</div>

			<Suspense fallback={<ProvidersSkeleton />}>
				<Providers />
			</Suspense>
		</div>
	)
}
