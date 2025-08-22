import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { VariantProps } from "class-variance-authority"
import { HTMLAttributeAnchorTarget } from "react"

export type ButtonLinkProps = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		href: string
		target?: HTMLAttributeAnchorTarget | undefined
	}

export function ButtonLink({
	children,
	href,
	target,
	...props
}: ButtonLinkProps) {
	return (
		<Button {...props}>
			<Link href={href} target={target}>
				{children}
			</Link>
		</Button>
	)
}
