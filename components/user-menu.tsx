"use client"

import { User } from "lucide-react"
import { Button } from "./ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import Link from "next/link"

export function UserMenu({
	messages,
}: {
	messages: {
		logout: string
		userName: string
		myAccount: string
		settings: string
	}
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm">
					<User className="h-4 w-4 mr-2" />
					{messages.userName}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{messages.myAccount}</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/user/settings">{messages.settings}</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/auth/logout">{messages.logout}</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
