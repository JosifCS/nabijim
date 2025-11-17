import * as React from "react"

import { cn } from "@/lib/utils"
import { ButtonLink } from "../common/button-link"
import { Skeleton } from "./skeleton"
import { type ClassValue } from "clsx"

function Card({
	className,
	children,
	title,

	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export type CardHeaderProps = React.ComponentProps<"div"> & {
	title?: string
	description?: string
	btnLabel?: string
	btnHref?: string
	btnIcon?: React.ReactNode
	btnSkeleton?: ClassValue
	icon?: React.ReactNode
}

function CardHeader({
	className,
	title,
	description,
	btnHref,
	btnLabel,
	btnIcon,
	btnSkeleton,
	children,
	icon,
	...props
}: CardHeaderProps) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className
			)}
			{...props}
		>
			{title || description || btnLabel || icon ? (
				<div className="flex items-center justify-between">
					<div>
						{title || icon ? (
							<CardTitle className="flex items-center gap-2">
								<div className="text-emerald-600 [&>svg]:h-5 [&>svg]:w-5">
									{icon}
								</div>
								{title}
							</CardTitle>
						) : null}
						{description ? (
							<CardDescription className="hidden sm:block">
								{description}
							</CardDescription>
						) : null}
					</div>
					{btnHref && btnLabel ? (
						<ButtonLink
							href={btnHref}
							className="[&>svg]:h-5 [&>svg]:w-5"
						>
							{btnIcon}
							{btnLabel}
						</ButtonLink>
					) : null}
					{btnSkeleton ? (
						<Skeleton className={cn("h-9", btnSkeleton)} />
					) : null}
				</div>
			) : null}
			{children}
		</div>
	)
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className
			)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	)
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	)
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
}
