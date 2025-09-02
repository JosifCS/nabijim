import { editPrivateStation } from "@/actions/edit-private-station"
import { Connectors } from "@/components/connectors"
import { Form } from "@/components/common/form"
import { FormInput } from "@/components/common/form-input"
import { Card, CardContent } from "@/components/ui/card"
import { authorize } from "@/modules/auth"
import { notFound } from "next/navigation"
import { getProvider } from "@/modules/queries"
import { EMPTY_PROVIDER } from "@/modules/empty-data"
import { FormSelect } from "@/components/common/form-select"
import { editProvider } from "@/actions/edit-provider"

export default async function Page({
	searchParams,
}: PageProps<"/administration/provider">) {
	const user = await authorize()
	const { id } = await searchParams

	const provider = Number(id) ? await getProvider(Number(id)) : EMPTY_PROVIDER

	if (!provider) return notFound()

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl space-y-4">
			<Card>
				<CardContent>
					<Form action={editProvider}>
						<FormInput
							type="text"
							name="name"
							defaultValue={provider.name}
							placeholder="Name"
						/>
						<FormInput
							type="text"
							name="description"
							defaultValue={provider.description ?? ""}
							placeholder="Description"
						/>
						<FormInput
							type="email"
							name="email"
							defaultValue={provider.email ?? ""}
							placeholder="Email"
						/>
						<FormInput
							type="tel"
							name="phoneNumber"
							defaultValue={provider.phoneNumber ?? ""}
							placeholder="Phone number"
						/>
						<FormInput
							type="url"
							name="url"
							defaultValue={provider.url ?? ""}
							placeholder="URL"
						/>
						<FormInput
							type="url"
							name="importUrl"
							placeholder="Import URL"
							defaultValue={provider.importUrl ?? ""}
						/>
						<FormSelect
							name="importSchema"
							placeholder="Import schema"
							options={[{ value: "cez-2025" }]}
							defaultValue={provider.importSchema ?? undefined}
						/>
					</Form>
				</CardContent>
			</Card>

			{provider.id && <div>Importovat data</div>}
			{provider.id && <div>Nabíjecí stanice</div>}
		</div>
	)
}
