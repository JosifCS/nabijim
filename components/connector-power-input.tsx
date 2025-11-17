"use client"

import { ChangeEvent, useState } from "react"
import { FormInput } from "./common/form-input"
import { Button } from "./ui/button"

export function ConnectorPowerInput({
	label,
	defaultValue,
}: {
	label: string
	defaultValue: number
}) {
	const [value, setValue] = useState(String(defaultValue))

	function change(e: ChangeEvent<HTMLInputElement>) {
		const v = e.currentTarget.value
		setValue(v)
	}
	return (
		<div className="flex gap-2">
			<FormInput
				type="number"
				name="power"
				placeholder={label}
				value={value}
				onChange={change}
				step={1}
				min={1}
				max={5000}
			/>
			<div className="flex gap-2">
				<Button
					type="button"
					variant="outline"
					onClick={() => setValue("11")}
				>
					11 kW
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => setValue("50")}
				>
					50 kW
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => setValue("200")}
				>
					200 kW
				</Button>
			</div>
		</div>
	)
}
