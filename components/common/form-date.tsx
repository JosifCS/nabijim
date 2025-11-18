"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Skeleton } from "../ui/skeleton"
import { cx } from "class-variance-authority"
import { toDateString } from "@/modules/date"

type FormDateProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"value" | "defaultValue" | "onChange" | "type"
> & {
	label?: string
	skeleton?: boolean
	value?: Date | string
	defaultValue?: Date | string
	onChange?: (value: Date) => void
}

export function FormDate({
	label,
	defaultValue,
	name,
	skeleton = false,
	placeholder,
	title,
	value,
	onChange,
	...props
}: FormDateProps) {
	const form = useFormContext()
	const id = useId()

	return (
		<div>
			{label && (
				<Label className="mb-1.5" htmlFor={id}>
					{label}
				</Label>
			)}
			{skeleton ? (
				<Skeleton
					className={cx("h-9 w-full rounded-md", props.className)}
				/>
			) : (
				<Input
					id={id}
					name={name}
					type="date"
					defaultValue={toDateString(
						(form.prevState?.[name ?? "x"] as string) ??
							defaultValue
					)}
					onChange={(e) => {
						form.onChange()
						if (onChange) onChange(new Date(e.currentTarget.value))
					}}
					title={title ?? label ?? placeholder}
					placeholder={placeholder}
					value={toDateString(value)}
					{...props}
				/>
			)}

			{name && form.validationErrors?.[name] && (
				<small className="text-red-700 mt-1.5">
					{form.validationErrors[name]}
				</small>
			)}
		</div>
	)
}
