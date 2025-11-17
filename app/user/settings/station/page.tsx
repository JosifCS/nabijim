import { Connectors } from "@/components/connectors"

import { StationForm, StationFormSkeleton } from "@/components/station-form"
import { Suspense } from "react"

export default async function Page({
	searchParams,
}: PageProps<"/user/settings/station">) {
	const { id } = await searchParams

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl space-y-4">
			<Suspense fallback={<StationFormSkeleton />}>
				<StationForm stationId={Number(id)} />
			</Suspense>

			{Number(id) ? <Connectors stationId={Number(id)} /> : null}
		</div>
	)
}
