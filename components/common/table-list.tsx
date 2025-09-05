import { ReactNode } from "react"
import { ButtonLink } from "./button-link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export type TableListProps = React.ComponentProps<"div"> & {
	count: number
	emptyLabel: string
	emptyIcon: ReactNode
}

export function TableList({
	count,
	emptyIcon,
	emptyLabel,
	children,
	className,
	...props
}: TableListProps) {
	if (count === 0)
		return (
			<div
				className={cn(
					"text-center py-8 text-gray-500 dark:text-gray-400",
					className
				)}
				{...props}
			>
				<div className="[&>svg]:h-12 [&>svg]:w-12 [&>svg]:mx-auto [&>svg]:mb-4 [&>svg]:opacity-50">
					{emptyIcon}
				</div>
				<p>{emptyLabel}</p>
			</div>
		)

	return (
		<div className={cn("grid gap-4", className)} {...props}>
			{children}
		</div>
	)
}

export type TableListItemProps = {
	title: ReactNode
	icon?: ReactNode
	children?: ReactNode
	editHref?: string
	removeHref?: string
}

export function TableListItem({
	title,
	icon,
	children,
	editHref,
	removeHref,
}: TableListItemProps) {
	const t = useTranslations("Components.Common.TableList")
	return (
		<div className="flex items-center justify-between p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20">
			<div className="flex items-center gap-3">
				{icon ? (
					<div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full [&>svg]:h-4 [&>svg]:w-4 text-emerald-600 dark:text-emerald-400">
						{icon}
					</div>
				) : null}
				<div>
					<h3 className="font-semibold text-emerald-800 dark:text-emerald-200">
						{title}
					</h3>
					<div className="flex items-center gap-4 text-sm text-emerald-600 dark:text-emerald-400">
						{children}
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2">
				{editHref ? (
					<ButtonLink
						href={editHref}
						variant="outline"
						size="sm"
						title={t("edit")}
						className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300"
					>
						<Edit className="h-4 w-4" />
					</ButtonLink>
				) : null}
				{removeHref ? (
					<Button
						variant="outline"
						size="sm"
						title={t("remove")}
						className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				) : null}
			</div>
		</div>
	)
}
