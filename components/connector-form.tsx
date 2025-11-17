import { getTranslations } from "next-intl/server"
import { FormInput } from "./common/form-input"
import { Form, FormSkeleton } from "./common/form"
import { getConnector } from "@/modules/queries"

import { EMPTY_CONNECTOR } from "@/modules/empty-data"
import { FormSelect } from "./common/form-select"
import { editConnector } from "@/actions/edit-connector"
import { CONNECTORS } from "@/modules/connectors"
import { FormCheckbox } from "./common/form-checkbox"
import { ConnectorPowerInput } from "./connector-power-input"

export async function ConnectorForm({
	connectorId,
	stationId,
}: {
	connectorId: number | null
	stationId: number
}) {
	const t = await getTranslations("Components.ConnectorForm")

	const connector = connectorId
		? await getConnector(connectorId)
		: EMPTY_CONNECTOR

	if (!connector) return null // TODO Return empty

	return (
		<Form action={editConnector}>
			<input name="id" defaultValue={connector.id} hidden />
			<input name="stationId" defaultValue={stationId} hidden />
			<FormSelect
				name="type"
				placeholder={t("type")}
				defaultValue={connector.type}
				options={CONNECTORS.map((x) => ({
					value: x,
					label: t(`Connector.${x}` as never),
				}))}
			/>
			<ConnectorPowerInput
				label={t("power")}
				defaultValue={connector.power}
			/>
			<FormCheckbox
				name="needCable"
				label={t("needCable")}
				description={t("needCableDesc")}
				defaultValue={connector.needCable}
			/>
		</Form>
	)
}

export async function ConnectorFormSkeleton() {
	return (
		<FormSkeleton>
			<FormInput skeleton />
			<FormInput skeleton />
			<FormCheckbox skeleton />
		</FormSkeleton>
	)
}
