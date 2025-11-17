"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

type FormRadioProps = {
	label?: string
	value?: string
	title?: string
	defaultValue?: string
	options: { value: string; label?: string }[]
	name?: string
	className?: string
	onChange?: (value: string) => void
}

export function FormRadio({
	label,
	options,
	name,
	title,
	onChange,
	...props
}: FormRadioProps) {
	const form = useFormContext()
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			<RadioGroup
				name={name}
				onValueChange={
					onChange
						? (v) => {
								form.onChange()
								onChange(v)
						  }
						: form.onChange
				}
				title={title ?? label}
				{...props}
			>
				{options.map((x) => (
					<div key={x.value} className="flex items-center gap-3">
						<RadioGroupItem
							value={x.value}
							id={`${id}-${x.value}`}
						/>
						<Label htmlFor={`${id}-${x.value}`}>
							{x.label ?? x.value}
						</Label>
					</div>
				))}
			</RadioGroup>
			{name && form.validationErrors?.[name] && (
				<small className="text-red-700">
					{form.validationErrors[name]}
				</small>
			)}
		</div>
	)
}
