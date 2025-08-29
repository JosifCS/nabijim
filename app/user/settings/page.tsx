import {
	PrivateStations,
	PrivateStationsSkeleton,
} from "@/components/private-stations"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

export default async function Page() {
	const user = await authorize()
	const t = await getTranslations("User.Settings")

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
					{t("settings")}
				</h1>
				<p className="text-emerald-700 dark:text-emerald-300">
					{t("description")}
				</p>
			</div>

			<Suspense fallback={<PrivateStationsSkeleton />}>
				<PrivateStations userId={user.id} />
			</Suspense>
		</div>
	)
}
