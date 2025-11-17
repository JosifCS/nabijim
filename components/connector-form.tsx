import { getTranslations } from "next-intl/server"
import { FormInput } from "./common/form-input"
import { Form, FormSkeleton } from "./common/form"
import { getConnector } from "@/modules/queries"

import { EMPTY_CONNECTOR } from "@/modules/empty-data"
import { Label } from "./ui/label"
import { FormSelect } from "./common/form-select"
import { editConnector } from "@/actions/edit-connector"

export async function ConnectorForm({
	connectorId,
}: {
	connectorId: number | null
}) {
	const t = await getTranslations("Components.ConnectorForm")

	const connector = connectorId
		? await getConnector(connectorId)
		: EMPTY_CONNECTOR

	if (!connector) return null // TODO Return empty

	return (
		<Form action={editConnector}>
			<FormSelect
				name="type"
				defaultValue={connector.type}
				options={[{ value: "TYPE_2" }]}
			/>
		</Form>
	)
}

export async function StationFormSkeleton() {
	const t = await getTranslations("Components.ConnectorForm")

	return (
		<FormSkeleton>
			<FormInput skeleton />
			<Label>Adresa</Label>
			<div className="grid sm:grid-cols-[1fr_10rem_10rem] grid-cols- gap-2">
				<FormInput skeleton />
				<FormInput skeleton />
				<FormInput skeleton />
			</div>
			<div className="grid sm:grid-cols-[8rem_1fr_10rem] grid-cols- gap-2">
				<FormInput skeleton />
				<FormInput skeleton />
				<FormInput skeleton />
			</div>
		</FormSkeleton>
	)
}
