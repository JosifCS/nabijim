import { TariffCard, TariffCardSkeleton } from "@/components/tariff-card"
import { Suspense } from "react"

export default async function Page({
	searchParams,
}: PageProps<"/user/settings/tariff">) {
	const { id } = await searchParams

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl space-y-4">
			<Suspense fallback={<TariffCardSkeleton />}>
				<TariffCard tariffId={id ? Number(id) : null} />
			</Suspense>
		</div>
	)
}
