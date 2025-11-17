"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/action-result"
import { revalidatePath } from "next/cache"
import { getTranslations } from "next-intl/server"
import { CONNECTORS } from "@/modules/connectors"

const schema = zfd.formData({
	id: z.number().optional(),
	stationId: zfd.numeric(z.number()),
	type: zfd.text(z.enum(CONNECTORS)),
	power: zfd.numeric(),
	needCable: zfd.checkbox(),
})
export const editConnector = safeAction(
	schema,
	async function ({ id, needCable, power, type, stationId }) {
		await authorize()
		const t = await getTranslations("Actions.EditConnector")

		const dc = type == "CHADEMO" || type == "CCS1" || type == "CCS2"

		if (id) {
			await prisma.connector.update({
				where: { id: id },
				data: { needCable, power, type, dc },
			})
		} else {
			await prisma.connector.create({
				data: { dc, needCable, power, type, stationId },
			})
		}

		revalidatePath(`/user/settings/station?id=${stationId}`)
		return actionResult(
			`/user/settings/station?id=${stationId}`,
			id ? t("saved") : t("created")
		)
	}
)
