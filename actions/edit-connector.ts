"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/action-result"
import { revalidatePath } from "next/cache"
import { getTranslations } from "next-intl/server"

const schema = zfd.formData({
	id: z.number().optional(),
})
export const editConnector = safeAction(schema, async function ({ id }) {
	const user = await authorize()
	const t = await getTranslations("Actions.EditConnector")

	if (id) {
		await prisma.connector.update({
			where: { id: id },
			data: {},
		})
		revalidatePath("/user/settings/station")
		return actionResult(true, t("saved"))
	} else {
		const { id } = await prisma.connector.create({
			data: {},
		})
		revalidatePath("/user/settings/station")
		return actionResult(`/user/settings/station?id=${id}`, t("created"))
	}
})
