import { Card, CardContent, CardHeader } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { Plus, ReceiptEuro } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Skeleton } from "./ui/skeleton"
import { TableList, TableListItem } from "./common/table-list"

export async function PrivateTariffs({ userId }: { userId: number }) {
	const t = await getTranslations("Components.PrivateTariffs")

	const tariffs = await prisma.chargeTariff.findMany({
		where: { userId },
		include: {
			times: true,
		},
	})

	return (
		<Card>
			<CardHeader
				title={t("tariffs")}
				description={t("tariffsDescription")}
				icon={<ReceiptEuro />}
				btnLabel={t("addTariff")}
				btnIcon={<Plus />}
				btnHref="/user/settings/tariff"
			/>
			<CardContent className="flex flex-col gap-2">
				<TableList
					count={tariffs.length}
					emptyLabel={t("noTariffs")}
					emptyIcon={<ReceiptEuro />}
				>
					{tariffs.map((x) => (
						<TableListItem
							key={x.id}
							title={x.name}
							icon={<ReceiptEuro />}
							editHref={`/user/settings/tariff?id=${x.id}`}
						>
							<span title={`t("priceKwh")`}>
								{x.times.at(0)?.price ?? 0} Kč/kWh
							</span>
						</TableListItem>
					))}
				</TableList>
			</CardContent>
		</Card>
	)
}

export async function PrivateTariffsSkeleton() {
	const t = await getTranslations("Components.PrivateTariffs")

	return (
		<Card>
			<CardHeader
				title={t("tariffs")}
				description={t("tariffsDescription")}
				icon={<ReceiptEuro />}
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
								<ReceiptEuro className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
							</div>
							<div>
								<Skeleton className="h-5 w-28 mb-2" />
								<Skeleton className="h-4 w-36" />
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="h-8 w-9" />
							<Skeleton className="h-8 w-9" />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
