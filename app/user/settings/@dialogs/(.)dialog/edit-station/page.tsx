import { newCharge } from "@/actions/new-charge"
import { Dialog } from "@/components/common/dialog"
import { Form } from "@/components/common/form"
import { FormInput } from "@/components/common/form-input"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"

export default async function Page() {
	return (
		<Dialog
			title={"Upravit dobíjecí stanici"}
			description="Přidejte nové nabíjení"
		>
			<Form action={newCharge}>
				<FormInput
					title="Příběh"
					name="schema"
					type="file"
					accept="application/json"
				/>

				<DialogFooter>
					<Button type="submit">Importovat</Button>
				</DialogFooter>
			</Form>
		</Dialog>
	)
}
