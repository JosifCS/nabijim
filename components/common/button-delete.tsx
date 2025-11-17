import { VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "../ui/button"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog"
import { useTranslations } from "next-intl"

export type ButtonDeleteProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		action: (actionId: number) => void
		actionId: number
	}

export function ButtonDelete({
	children,
	action,
	actionId,
	...props
}: ButtonDeleteProps) {
	const t = useTranslations("Components.Common.ButtonDelete")

	return (
		<AlertDialog>
			<Button {...props} asChild>
				<AlertDialogTrigger>{children}</AlertDialogTrigger>
			</Button>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t("title")}</AlertDialogTitle>
					<AlertDialogDescription>
						{t("description")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
					<AlertDialogAction actionId={actionId} action={action}>
						{t("continue")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
