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
	id: zfd.numeric().optional(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	city: z.string().trim(),
	street: z.string().trim(),
	streetNumber: zfd.numeric(z.number().optional()),
	houseNumber: zfd.numeric(z.number().optional()),
})
export const editPrivateStation = safeAction(
	schema,
	async function ({ id, city, name, street, houseNumber, streetNumber }) {
		const user = await authorize()
		const t = await getTranslations("Actions.EditPrivateStation")

		if (id) {
			await prisma.station.update({
				where: { id: id, private: { userId: user.id } },
				data: {
					name,
					chargingHub: {
						update: {
							streetNumber,
							houseNumber,
							city: city.length ? city : null,
							street: street.length ? street : null,
						},
					},
				},
			})
			revalidatePath("/user/settings/station")
			return actionResult(true, t("saved"))
		} else {
			const { id } = await prisma.station.create({
				data: {
					private: { create: { userId: user.id } },
					name,
					chargingHub: {
						create: {
							streetNumber,
							houseNumber,
							city: city.length ? city : null,
							street: street.length ? street : null,
						},
					},
				},
			})
			revalidatePath("/user/settings/station")
			return actionResult(`/user/settings/station?id=${id}`, t("created"))
		}
	}
)
