export type ActionResult<T extends object | null> = {
	success: boolean
	message?: string
	redirect?: string
	data?: T
}

export function actionResult(
	redirect: string,
	message?: string
): ActionResult<null>
export function actionResult<T extends object>(
	success: boolean,
	message?: string,
	data?: T
): ActionResult<T>
export function actionResult<T extends object>(
	options: ActionResult<T>
): ActionResult<T>
export function actionResult<T extends object>(
	param1: string | boolean | ActionResult<T>,
	param2?: string,
	param3?: T
): ActionResult<T> {
	if (typeof param1 === "string")
		return {
			success: true,
			redirect: param1,
			message: param2,
		}

	if (typeof param1 === "boolean")
		return {
			success: param1,
			message: param2,
			data: param3,
		}

	if (typeof param1 === "object") return param1

	throw Error("actionResult unexpected params")
}
