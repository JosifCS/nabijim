import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EvCharger } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { FormInput } from "./common/form-input"
import { Form, FormSkeleton } from "./common/form"
import { getPrivateStation } from "@/modules/queries"
import { authorize } from "@/modules/auth"
import { EMPTY_PRIVATE_STATION } from "@/modules/empty-data"
import { editPrivateStation } from "@/actions/edit-private-station"
import { Label } from "./ui/label"

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
				description={t("privateStation")}
				icon={<EvCharger />}
			/>
			<CardContent>
				<Form action={editPrivateStation}>
					<FormInput
						type="text"
						name="name"
						defaultValue={station.name}
					/>
					<Label>Adresa</Label>
					<div className="grid sm:grid-cols-[1fr_10rem_10rem] grid-cols- gap-2">
						<FormInput
							type="text"
							name="street"
							className="grow"
							defaultValue={station.chargingHub.street ?? ""}
							placeholder={t("street")}
						/>
						<FormInput
							type="number"
							name="streetNumber"
							defaultValue={
								station.chargingHub.streetNumber ?? ""
							}
							placeholder={t("streetNumber")}
						/>
						<FormInput
							type="number"
							name="houseNumber"
							defaultValue={station.chargingHub.houseNumber ?? ""}
							placeholder={t("houseNumber")}
						/>
					</div>
					<div className="grid sm:grid-cols-[8rem_1fr_10rem] grid-cols- gap-2">
						<FormInput
							type="text"
							name="postalCode"
							defaultValue={station.chargingHub.postalCode ?? ""}
							placeholder={t("postalCode")}
						/>
						<FormInput
							type="text"
							name="city"
							defaultValue={station.chargingHub.city ?? ""}
							placeholder={t("city")}
						/>
						<FormInput
							type="text"
							name="country"
							defaultValue={station.chargingHub.country ?? ""}
							placeholder={t("country")}
						/>
					</div>
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
			</CardContent>
		</Card>
	)
}
