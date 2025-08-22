"use client"

import { Globe } from "lucide-react"
import { Button } from "./ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { setLocale } from "@/actions/set-locale"

export function LocaleSelect({
	label,
	locale,
}: {
	label: string
	locale: string
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900 bg-transparent"
					title={label}
				>
					<Globe className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{label}</DropdownMenuLabel>
				<DropdownMenuRadioGroup
					value={locale}
					onValueChange={setLocale}
				>
					<DropdownMenuRadioItem value="cs">
						Česky
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="en">
						English
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
