import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { getLocale } from "next-intl/server"
import { ReactNode } from "react"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/sonner"

// inicializace konstant
String.Empty = ""
String.CR = "\r"
String.LF = "\n"
String.CRLF = "\r\n"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Nabijim",
	description: "Jednoduchá aplikace pro vytváření statistiky nabíjení.",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const locale = await getLocale()

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />

				<div className="pt-16 min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900">
					{children}
				</div>

				<Toaster />
			</body>
		</html>
	)
}
