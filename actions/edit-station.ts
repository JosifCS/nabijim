"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/action-result"

const schema = zfd.formData({
	id: zfd.numeric(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: z.string().trim(),
})
export const editStation = safeAction(
	schema,
	async function ({ id, description, name }) {
		const user = await authorize()

		if (id) {
			await prisma.chargeStation.update({
				where: { id: id, userId: user.id },
				data: { name },
			})
			return actionResult(true, "saved", `/user/settings`)
		} else {
			const story = await prisma.chargeStation.create({
				data: { name, userId: user.id },
			})
			return actionResult(true, "created", `/user/settings`)
		}
	}
)
