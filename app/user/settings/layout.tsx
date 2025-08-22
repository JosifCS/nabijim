import { authorize } from "@/modules/auth"
import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
	// title: "Nabijim",
	// description: "Jednoduchá aplikace pro vytváření statistiky nabíjení.",
}

export default async function Layout({
	children,
	dialogs,
}: {
	children: React.ReactNode
	dialogs: React.ReactNode
}) {
	await authorize()

	return (
		<>
			{children} {dialogs}
		</>
	)
}
