import { Building2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Form } from "./common/form"
import { FormInput } from "./common/form-input"
import { FormSelect } from "./common/form-select"
import { getTranslations } from "next-intl/server"
import { getProvider } from "@/modules/queries"
import { EMPTY_PROVIDER } from "@/modules/empty-data"
import { editProvider } from "@/actions/edit-provider"
import { Button } from "./ui/button"
import { ProviderDataSchemes } from "@/modules/station-import"
import { ButtonData } from "./button-data"
import { importStations } from "@/actions/import-stations"

export async function ProviderCard({
	providerId,
}: {
	providerId: number | null
}) {
	const provider = providerId ? await getProvider(providerId) : EMPTY_PROVIDER

	if (!provider) return null // TODO 404 reurn

	const t = await getTranslations("Components.ProviderCard")
	return (
		<Card>
			<CardHeader
				title={t("provider")}
				description={t("providerDesc")}
				icon={<Building2 />}
			/>
			<CardContent>
				<Form action={editProvider}>
					<FormInput
						type="text"
						name="name"
						defaultValue={provider.name}
						label={t("name")}
					/>
					<FormInput
						type="text"
						name="description"
						defaultValue={provider.description ?? ""}
						label={t("description")}
					/>
					<FormInput
						type="email"
						name="email"
						defaultValue={provider.email ?? ""}
						label={t("email")}
					/>
					<FormInput
						type="tel"
						name="phoneNumber"
						defaultValue={provider.phoneNumber ?? ""}
						label={t("phoneNumber")}
					/>
					<FormInput
						type="url"
						name="url"
						defaultValue={provider.url ?? ""}
						label={t("url")}
					/>
					<FormInput
						type="url"
						name="importUrl"
						label={t("importUrl")}
						defaultValue={provider.importUrl ?? ""}
					/>
					<FormSelect
						name="importSchema"
						label={t("importSchema")}
						options={ProviderDataSchemes.map((value) => ({
							value,
						}))}
						defaultValue={provider.importSchema ?? undefined}
					/>
				</Form>

				{provider.importSchema != null &&
					provider.importUrl != null && (
						<ButtonData data={providerId!} onClick={importStations}>
							{t("import")}
						</ButtonData>
					)}
			</CardContent>
		</Card>
	)
}
