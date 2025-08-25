import prisma from "@/lib/prisma"

export type GetPrivateStation = Awaited<ReturnType<typeof getPrivateStation>>

export async function getPrivateStation(userId: number, id: number) {
	return await prisma.chargeStation.findFirst({
		where: { id, userId },
		select: {
			provider: true,
			customName: true,
			name: true,
			userId: true,
			city: true,
			streetNumber: true,
			street: true,
			houseNumber: true,
			connectors: {
				select: {
					dc: true,
					id: true,
					tariffs: {
						select: {
							times: true,
							name: true,
							id: true,
							validFrom: true,
							validTo: true,
						},
					},
					name: true,
					chargeSessions: true,
				},
			},
		},
	})
}
