import { z } from "zod"
import { ActionResult } from "./action-result"

export type SafeActionResult = {
	result: ActionResult
	prevState: any | null
	validationErrors: Record<string, string>
}

export function safeAction<S extends object, SchemaType extends z.ZodTypeAny>(
	schema: SchemaType,
	action: (data: z.output<SchemaType>) => Promise<ActionResult>
) {
	return async function handler(currentState: S, formData: FormData) {
		console.log(currentState, formData)
		const { success, data, error } = schema.safeParse(formData)

		if (data == undefined) {
			return {
				prevState: parseForm(formData),
				validationErrors: formatIssues(error),
				result: { success: false, message: "No data for result" },
			}
		}

		console.log(error?.flatten())
		try {
			const result = await action(data)

			return {
				prevState: parseForm(formData),
				validationErrors: formatIssues(error),
				result,
			}
		} catch (e: unknown) {
			console.log("ERRRROR-----------")
		}

		return {
			prevState: parseForm(formData),
			validationErrors: formatIssues(error),
			result: {
				success,
			},
		}
	}
}

function parseForm(formData: FormData) {
	var object: any = {}
	formData.forEach((value, key) => {
		// přeskakuji data doplněná reactem
		if (key.at(0) == "$") return

		// Reflect.has in favor of: object.hasOwnProperty(key)
		if (!Reflect.has(object, key)) {
			object[key] = value
			return
		}
		if (!Array.isArray(object[key])) {
			object[key] = [object[key]]
		}
		object[key].push(value)
	})
	return object
}

function formatIssues(errors: z.ZodError<z.input<any>> | undefined) {
	let object: any = {}

	errors?.issues.forEach((issue) => {
		object[issue.path.at(0) ?? ""] = issue.message
	})

	return object
}
