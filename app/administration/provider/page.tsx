import { ProviderCard } from "@/components/provider-card"
import { Suspense } from "react"

export default async function Page({
	searchParams,
}: PageProps<"/administration/provider">) {
	const { id } = await searchParams

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl space-y-4">
			<Suspense>
				<ProviderCard providerId={id ? Number(id) : null} />
			</Suspense>

			{id && <div>Nabíjecí stanice</div>}
		</div>
	)
}
