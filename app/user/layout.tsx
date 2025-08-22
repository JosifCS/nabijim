import { authorize } from "@/modules/auth"
import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
	// title: "Nabijim",
	// description: "Jednoduchá aplikace pro vytváření statistiky nabíjení.",
}

export default async function Layout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	await authorize()

	return <>{children}</>
}
