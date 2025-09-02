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
	isAdmin,
}: {
	messages: Record<
		"logout" | "userName" | "myAccount" | "settings" | "administration",
		string
	>
	isAdmin: boolean
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm" className="flex gap-2">
					<User className="h-4 w-4" />
					<span className="hidden sm:inline-block">
						{messages.userName}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{messages.myAccount}</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/user/settings">{messages.settings}</Link>
					</DropdownMenuItem>
					{isAdmin && (
						<DropdownMenuItem asChild>
							<Link href="/administration">
								{messages.administration}
							</Link>
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/auth/logout">{messages.logout}</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
