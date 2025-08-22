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
export const newCharge = safeAction(
	schema,
	async function ({ id, description, name }) {
		const user = await authorize()

		await prisma.chargeSession.create({
			data: {
				extraFees: 0,
				kwh: 24,
				price: 450,
				providerId: 0,
				userId: user.id,
				connectorId: 0,
			},
		})

		return actionResult(
			true,
			"created", // TODO localize
			`/dashboard`
		)
	}
)
