import { editPrivateStation } from "@/actions/edit-private-station"
import { Connectors } from "@/components/connectors"
import { Form } from "@/components/common/form"
import { FormInput } from "@/components/common/form-input"
import { Card, CardContent } from "@/components/ui/card"
import { authorize } from "@/modules/auth"
import { notFound } from "next/navigation"
import { getPrivateStation } from "@/modules/queries"
import { EMPTY_PRIVATE_STATION } from "@/modules/empty-data"

export default async function Page({
	searchParams,
}: PageProps<"/user/settings/station">) {
	const user = await authorize()
	const { id } = await searchParams

	const station = Number(id)
		? await getPrivateStation(user.id, Number(id))
		: EMPTY_PRIVATE_STATION

	if (!station) return notFound()
	station.chargingHub
	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl space-y-4">
			<Card>
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
							defaultValue={
								station.chargingHub.streetNumber ?? ""
							}
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

			{station.id && <Connectors stationId={station.id} />}
		</div>
	)
}
