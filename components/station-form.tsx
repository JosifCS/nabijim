import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EvCharger } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { FormInput } from "./common/form-input"
import { Form, FormSkeleton } from "./common/form"
import { getPrivateStation } from "@/modules/queries"
import { authorize } from "@/modules/auth"
import { EMPTY_PRIVATE_STATION } from "@/modules/empty-data"
import { editPrivateStation } from "@/actions/edit-private-station"

export async function StationForm({ stationId }: { stationId: number | null }) {
	const user = await authorize()
	const t = await getTranslations("Components.StationForm")

	const station = stationId
		? await getPrivateStation(user.id, stationId)
		: EMPTY_PRIVATE_STATION

	if (!station) return null // TODO Return empty

	return (
		<Card>
			<CardHeader
				title={t("station")}
				// description={t("description")}
				icon={<EvCharger />}
			/>
			<CardContent>
				<Form action={editPrivateStation}>
					<FormInput
						type="text"
						name="name"
						defaultValue={station.name}
						placeholder="Name"
					/>
					<FormInput
						type="text"
						name="city"
						defaultValue={station.chargingHub.city ?? ""}
						placeholder="City"
					/>
					<FormInput
						type="text"
						name="street"
						defaultValue={station.chargingHub.street ?? ""}
						placeholder="Street"
					/>
					<FormInput
						type="number"
						name="streetNumber"
						defaultValue={station.chargingHub.streetNumber ?? ""}
						placeholder="Street number"
					/>
					<FormInput
						type="number"
						name="houseNumber"
						defaultValue={station.chargingHub.houseNumber ?? ""}
						placeholder="House number"
					/>
				</Form>
			</CardContent>
		</Card>
	)
}

export async function StationFormSkeleton() {
	const t = await getTranslations("Components.StationForm")

	return (
		<Card>
			<CardHeader
				title={t("station")}
				//description={t("description")}
				icon={<EvCharger />}
			/>
			<CardContent className="flex flex-col gap-2">
				<FormSkeleton>
					<FormInput skeleton />
					<FormInput skeleton />
					<FormInput skeleton />
					<FormInput skeleton />
					<FormInput skeleton />
				</FormSkeleton>
			</CardContent>
		</Card>
	)
}
