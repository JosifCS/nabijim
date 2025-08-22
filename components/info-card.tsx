import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ReactNode } from "react"

export function InfoCard({
	description,
	icon,
	title,
}: {
	title: string
	description: string
	icon: ReactNode
}) {
	return (
		<Card className="border-emerald-200 dark:border-emerald-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
			<CardHeader>
				<div className="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-full w-fit mb-2">
					{icon}
				</div>
				<CardTitle className="text-emerald-800 dark:text-emerald-200">
					{title}
				</CardTitle>
				<CardDescription className="text-emerald-600 dark:text-emerald-400">
					{description}
				</CardDescription>
			</CardHeader>
		</Card>
	)
}
