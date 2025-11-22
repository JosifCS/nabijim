"use server"

import { actionResult } from "@/modules/action-result"
import { authorize } from "@/modules/auth"
import { StationImport } from "@/modules/station-import"

export async function importStations(providerId: number) {
	await authorize()

	try {
		const imp = new StationImport(providerId)
		await imp.downloadScheme()
		return actionResult(true, "Imported")
	} catch (e) {
		return actionResult(false, (e as Error).message)
	}
}
