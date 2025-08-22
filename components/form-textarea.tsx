"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Label } from "./ui/label"
import { Skeleton } from "./ui/skeleton"
import { cx } from "class-variance-authority"
import { Textarea } from "./ui/textarea"

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
	label?: string
	rows?: number
	skeleton?: boolean
}

export function FormTextArea({
	label,
	defaultValue,
	name,
	skeleton = false,
	...props
}: FormTextAreaProps) {
	const form = useFormContext()
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			{skeleton ? (
				<Skeleton
					className={cx("h-20 w-full rounded-md", props.className)}
				/>
			) : (
				<Textarea
					id={id}
					name={name}
					defaultValue={
						props.type == "file"
							? undefined
							: form.prevState?.[name ?? "x"] ?? defaultValue
					}
					onChange={form.onChange}
					{...props}
				/>
			)}
			{name && form.validationErrors?.[name] && (
				<small className="text-red-700">
					{form.validationErrors[name]}
				</small>
			)}
		</div>
	)
}
