import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ReceiptEuro } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { FormInput } from "./common/form-input"
import { Form, FormSkeleton } from "./common/form"
import { getChargeTariff } from "@/modules/queries"

import { editChargeTariff } from "@/actions/edit-charge-tariff"
import { FormDate } from "./common/form-date"
import { addDays } from "@/modules/date"

export async function TariffCard({ tariffId }: { tariffId: number | null }) {
	const t = await getTranslations("Components.TariffCard")

	const tariff = tariffId ? await getChargeTariff(tariffId) : null

	return (
		<Card>
			<CardHeader
				title={t("tariff")}
				description={t("tariffDesc")}
				icon={<ReceiptEuro />}
			/>
			<CardContent>
				<Form action={editChargeTariff}>
					<input name="id" defaultValue={tariffId ?? 0} hidden />
					<FormInput
						type="text"
						name="name"
						placeholder={t("name")}
						defaultValue={tariff?.name ?? ""}
					/>
					<div className="grid grid-cols-2 gap-4">
						<FormDate
							name="validFrom"
							label={t("validFrom")}
							defaultValue={tariff?.validFrom ?? new Date()}
						/>
						<FormDate
							name="validTo"
							label={t("validTo")}
							defaultValue={tariff?.validTo ?? addDays(365)}
						/>
					</div>
					<FormInput
						type="number"
						name="price"
						placeholder={t("price")}
						defaultValue={tariff?.times.at(0)?.price ?? ""}
					/>
				</Form>
			</CardContent>
		</Card>
	)
}

export async function TariffCardSkeleton() {
	const t = await getTranslations("Components.TariffCard")

	return (
		<Card>
			<CardHeader
				title={t("tariff")}
				description={t("tariffDesc")}
				icon={<ReceiptEuro />}
			/>
			<CardContent>
				<FormSkeleton>
					<FormInput skeleton />
					<FormDate skeleton />
					<FormDate skeleton />
				</FormSkeleton>
			</CardContent>
		</Card>
	)
}
