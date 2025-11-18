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
	id: zfd.numeric(z.number()).optional(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	validFrom: zfd.text().transform((v) => new Date(`${v}T00:00:00`)),
	validTo: zfd.text().transform((v) => new Date(`${v}T00:00:00`)),
	price: zfd.numeric(),
})
export const editChargeTariff = safeAction(
	schema,
	async function ({ id, name, validFrom, validTo, price }) {
		const user = await authorize()
		const t = await getTranslations("Actions.EditChargeTariff")

		if (id) {
			const time = await prisma.tariffTime.findFirst({
				where: { tariffId: id },
			})
			await prisma.chargeTariff.update({
				where: { id: id },
				data: {
					name,
					validFrom,
					validTo,
					userId: user.id,
					times: {
						update: {
							where: { id: time!.id },
							data: {
								from: "00:00",
								to: "23:59",
								price,
								days: [0, 1, 2, 3, 4, 5, 6],
							},
						},
					},
				},
			})
			revalidatePath("/user/settings/tariff")
			return actionResult(true, t("saved"))
		} else {
			const { id } = await prisma.chargeTariff.create({
				data: {
					name,
					validFrom,
					validTo,
					userId: user.id,
					times: {
						create: {
							from: "00:00",
							to: "23:59",
							price,
							days: [0, 1, 2, 3, 4, 5, 6],
						},
					},
				},
			})
			revalidatePath("/user/settings/tariff")
			return actionResult(`/user/settings/tariff?id=${id}`, t("created"))
		}
	}
)
