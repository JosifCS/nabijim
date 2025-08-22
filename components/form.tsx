"use client"

import {
	createContext,
	useActionState,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useDebouncedCallback } from "use-debounce"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { SafeActionResult } from "@/modules/safe-action"

type FormWrapper = {
	action: any
	children: React.ReactNode
	className?: string
	autoSave?: boolean
	submitLabel?: string
}

const FormContext = createContext<SafeActionResult & { onChange: () => void }>({
	prevState: null,
	validationErrors: {},
	result: {
		success: true,
	},
	onChange: () => {},
})

export const useFormContext = () => useContext(FormContext)

export function Form({
	action,
	children,
	className,
	autoSave = false,
	submitLabel = "Save",
}: FormWrapper) {
	const ref = useRef<HTMLFormElement>(null)
	const router = useRouter()

	const debounced = useDebouncedCallback(() => {
		ref.current!.requestSubmit()
	}, 3000)

	const [unsaved, setUnsaved] = useState(false)
	const [state, formAction, isPending] = useActionState<SafeActionResult>(
		action,
		{
			prevState: null,
			validationErrors: {},
			result: {
				success: true,
			},
		}
	)

	const handleChange = useCallback(() => {
		if (autoSave) {
			setUnsaved(true)
			debounced()
		}
	}, [autoSave])

	useEffect(() => {
		if (state.result.success) {
			setUnsaved(false)
			if (state.result.message) {
				toast.success(state.result.message)

				/*else {
					toast({
						variant: "error",
						title: "Error",
						description: data.message,
					})
				}*/
			}

			if (state.result.redirect) {
				router.back()
				//router.push(state.result.redirect)
			} /*else {
				router.back()
			}*/
		} /*else if (typeof result.serverError === "string") {
			toast({
				variant: "error",
				title: "Server error",
				description: result.serverError,
			})
		}*/ else if (state.validationErrors) {
			toast.error("Invalid form")
		}

		return () => {
			if (state.result.redirect) router.push(state.result.redirect)
		}
	}, [state])

	return (
		<form
			ref={ref}
			action={formAction}
			className={cn("flex flex-col gap-4", className)}
			autoComplete="off"
		>
			<FormContext.Provider
				value={{
					prevState: state.prevState,
					validationErrors: state.validationErrors,
					result: state.result,
					onChange: handleChange,
				}}
			>
				{children}
			</FormContext.Provider>
			{autoSave ? (
				<p className="text-sm text-muted-foreground text-end mb-0">
					{isPending
						? "Saving..."
						: unsaved
						? "Unsaved changes"
						: "Saved"}
				</p>
			) : (
				<div className="w-full flex justify-end">
					<Button type="submit">{submitLabel}</Button>
				</div>
			)}
		</form>
	)
}
