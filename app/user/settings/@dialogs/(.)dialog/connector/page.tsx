import { Dialog } from "@/components/common/dialog"

import {
	ConnectorForm,
	ConnectorFormSkeleton,
} from "@/components/connector-form"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function Page({
	searchParams,
}: PageProps<"/user/settings/dialog/connector">) {
	const { id, stationId } = await searchParams

	const station = await prisma.station.findFirst({
		where: { id: Number(stationId) },
		select: {
			name: true,
		},
	})

	if (!station) return notFound()

	return (
		<Dialog
			title={"Upravit nabíjecí konektor"}
			description={`Nabíjecí stanice ${station.name}`}
		>
			<Suspense fallback={<ConnectorFormSkeleton />}>
				<ConnectorForm connectorId={Number(id)} />
			</Suspense>
		</Dialog>
	)
}
