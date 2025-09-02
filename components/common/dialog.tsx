import { ReactNode } from "react"
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog"
import { ActionDialog } from "./action-dialog"

type DialogProps = {
	title: string
	description?: string
	children?: ReactNode
}

export function Dialog({ title, children, description }: DialogProps) {
	return (
		<ActionDialog>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>
				{children}
			</DialogContent>
		</ActionDialog>
	)
}
