"use client"

import { useRouter } from "next/navigation"
import { Dialog } from "./ui/dialog"

interface ActionDialogProps {
	children: React.ReactNode
}

export function ActionDialog({ children }: ActionDialogProps) {
	const router = useRouter()

	return (
		<Dialog open onOpenChange={(open) => !open && router.back()}>
			{children}
		</Dialog>
	)
}
