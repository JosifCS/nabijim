import { Card, CardContent, CardHeader } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { Building2, Plus, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Skeleton } from "./ui/skeleton"
import { TableList, TableListItem } from "./common/table-list"

export async function Providers() {
	const t = await getTranslations("Components.Providers")

	const providers = await prisma.provider.findMany({
		include: { stations: { select: { _count: true } } },
	})

	return (
		<Card>
			<CardHeader
				title={t("providers")}
				description={t("providersDesc")}
				icon={<Building2 />}
				btnLabel={t("addProvider")}
				btnHref="/administration/provider"
				btnIcon={<Plus />}
			/>
			<CardContent className="flex flex-col gap-2">
				<TableList
					count={providers.length}
					emptyIcon={<Building2 />}
					emptyLabel={t("noProviders")}
				>
					{providers.map((x) => (
						<TableListItem
							key={x.id}
							title={x.name}
							icon={<Building2 />}
							editHref={`/administration/provider?id=${x.id}`}
						>
							<span
								className="flex items-center gap-1"
								title={t("stations")}
							>
								<Zap className="h-3 w-3" />
								{t("stationsCount", {
									count: x.stations.length,
								})}
							</span>
						</TableListItem>
					))}
				</TableList>
			</CardContent>
		</Card>
	)
}

export async function ProvidersSkeleton() {
	const t = await getTranslations("Components.Providers")

	return (
		<Card>
			<CardHeader
				title={t("providers")}
				description={t("providersDesc")}
				icon={<Building2 />}
				btnSkeleton="w-32"
			/>
			<CardContent className="flex flex-col gap-2">
				{[0, 1, 2].map((x) => (
					<div
						key={x}
						className="flex items-center justify-between p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20"
					>
						<div className="flex items-center gap-3">
							<div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full">
								<Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
							</div>
							<div>
								<Skeleton className="h-5 w-28 mb-2" />
								<Skeleton className="h-4 w-36" />
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-8 w-9" />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
