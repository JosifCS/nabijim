"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/action-result"

const schema = zfd.formData({
	id: zfd.numeric().optional(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: zfd.text(z.string().optional()),
	email: zfd.text(z.email().optional()),
	phoneNumber: zfd.text(z.string().optional()),
	url: zfd.text(z.url().optional()),
	importUrl: zfd.text(z.url().optional()),
	importSchema: zfd.text(z.enum(["cez-2025"]).optional()),
})
export const editProvider = safeAction(
	schema,
	async function ({
		id,
		name,
		description,
		email,
		importSchema,
		importUrl,
		phoneNumber,
		url,
	}) {
		const user = await authorize(true)

		if (id) {
			await prisma.provider.update({
				where: { id },
				data: {
					name,
					description: description?.length ? description : null,
					email: email?.length ? email : null,
					url: url?.length ? url : null,
					importSchema: importSchema?.length ? importSchema : null,
					importUrl: importUrl?.length ? importUrl : null,
					phoneNumber: phoneNumber?.length ? phoneNumber : null,
				},
			})
			return actionResult(true, "saved", `/administration`)
		} else {
			await prisma.provider.create({
				data: {
					name,
					description: description?.length ? description : null,
					email: email?.length ? email : null,
					url: url?.length ? url : null,
					importSchema: importSchema?.length ? importSchema : null,
					importUrl: importUrl?.length ? importUrl : null,
					phoneNumber: phoneNumber?.length ? phoneNumber : null,
				},
			})
			return actionResult(true, "created", `/administration`)
		}
	}
)
