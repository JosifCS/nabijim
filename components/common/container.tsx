import { ReactNode } from "react"

export function Container({
	children,
	description,
	title,
}: {
	children: ReactNode
	title: string
	description: string
}) {
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="mb-4">
				<h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
					{title}
				</h1>
				<p className="hidden sm:block text-emerald-700 dark:text-emerald-300">
					{description}
				</p>
			</div>

			{children}
		</div>
	)
}
