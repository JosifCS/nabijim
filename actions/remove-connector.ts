"use server"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"

import { revalidatePath } from "next/cache"

export async function removeConnector(id: number) {
	await authorize()

	const connector = await prisma.connector.findFirst({ where: { id } })

	await prisma.connector.delete({
		where: { id: id },
	})

	revalidatePath(`/user/settings/station?id=${connector?.stationId}`)
}
