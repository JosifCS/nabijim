"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/lib/utils"

type FormCheckboxProps = {
	label?: string
	description?: string
	value?: boolean
	title?: string
	defaultValue?: boolean
	name?: string
	className?: string
	skeleton?: boolean
	onChange?: (value: boolean) => void
}

export function FormCheckbox({
	label,
	value,
	name,
	title,
	onChange,
	className,
	defaultValue,
	description,
	skeleton,
}: FormCheckboxProps) {
	const form = useFormContext()
	const id = useId()

	if (skeleton) return <Skeleton className={cn("w-full, h-10", className)} />

	return (
		<div className="grid w-full items-center gap-1.5">
			<div title={title ?? label} className="flex items-start gap-3">
				<Checkbox
					id={id}
					defaultChecked={defaultValue}
					checked={value}
					className={className}
					name={name}
					onChange={
						onChange
							? () => {
									form.onChange()
									onChange(!value)
							  }
							: form.onChange
					}
				/>
				<div className="grid gap-2">
					{label && <Label htmlFor={id}>{label}</Label>}
					{description && (
						<p className="text-muted-foreground text-sm">
							{description}
						</p>
					)}
				</div>
			</div>
			{name && form.validationErrors?.[name] && (
				<small className="text-red-700">
					{form.validationErrors[name]}
				</small>
			)}
		</div>
	)
}
