import { Container } from "@/components/common/container"
import { Providers, ProvidersSkeleton } from "@/components/providers"

import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

export default async function Page() {
	const t = await getTranslations("Administration")

	return (
		<Container title={t("administration")} description={t("description")}>
			<Suspense fallback={<ProvidersSkeleton />}>
				<Providers />
			</Suspense>
		</Container>
	)
}
