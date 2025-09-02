import prisma from "@/lib/prisma"

export type GetPrivateStation = Awaited<ReturnType<typeof getPrivateStation>>

export async function getPrivateStation(userId: number, id: number) {
	return await prisma.station.findFirst({
		where: { id, private: { userId } },
		include: {
			chargingHub: true,
			connectors: true,
		},
	})
}
