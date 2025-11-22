"use client"

import { Button } from "./ui/button"

import { ReactNode } from "react"

export function ButtonData<T>({
	data,
	children,
	onClick,
}: {
	data: T
	onClick: (data: T) => Promise<unknown>
	children: ReactNode
}) {
	return <Button onClick={() => onClick(data)}>{children}</Button>
}
