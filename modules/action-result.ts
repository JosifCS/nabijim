export type ActionResult<T = undefined> = {
	success: boolean
	message?: string
	redirect?: string
	data?: T
}

export function actionResult(redirect: string, message?: string): ActionResult
export function actionResult<T = undefined>(
	success: boolean,
	message?: string,
	data?: T
): ActionResult<any>
export function actionResult<T = undefined>(
	options: ActionResult<T>
): ActionResult<any>
export function actionResult<T = undefined>(
	param1: string | boolean | ActionResult<T>,
	param2?: string,
	param3?: T
): ActionResult<any> {
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
