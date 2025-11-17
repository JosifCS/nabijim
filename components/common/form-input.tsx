"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Skeleton } from "../ui/skeleton"
import { cx } from "class-variance-authority"

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	skeleton?: boolean
}

export function FormInput({
	label,
	defaultValue,
	name,
	skeleton = false,
	placeholder,
	title,
	...props
}: FormInputProps) {
	const form = useFormContext()
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			{skeleton ? (
				<Skeleton
					className={cx("h-9 w-full rounded-md", props.className)}
				/>
			) : (
				<Input
					id={id}
					name={name}
					defaultValue={
						props.type == "file"
							? undefined
							: form.prevState?.[name ?? "x"] ?? defaultValue
					}
					onChange={form.onChange}
					title={title ?? label ?? placeholder}
					placeholder={placeholder}
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
