/**
 * Vytvoří hodnotu pro input type date.
 * @param date Date or ISO date string
 * @returns *"YYYY-MM-DD"*
 */
export function toDateString(date: Date | string): string
/**
 * Vytvoří hodnotu pro input type date.
 * @param date Date or ISO date string
 * @returns *"YYYY-MM-DD"* or undefined
 */
export function toDateString(
	date: Date | string | undefined | null
): string | undefined
export function toDateString(date: Date | string | undefined | null) {
	if (date == null || date == undefined) return undefined

	const d = typeof date === "string" ? new Date(date) : date

	const year = d.getFullYear()
	const month = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	return `${year}-${month}-${day}`
}

/**
 * Posun oproti dnešu o daný počet dní.
 * @param count Počet dní od aktuuálního dne.
 */
export function addDays(count: number): Date
/**
 * Změna datumu o daný počet dní.
 * @param date Datum
 * @param count Počet dní od `date`.
 */
export function addDays(date: Date | string, count: number): Date
export function addDays(param1: Date | string | number, param2?: number) {
	const d = typeof param1 === "number" ? new Date() : new Date(param1)
	const c = typeof param1 === "number" ? param1 : param2 ?? 0
	return new Date(d.getFullYear(), d.getMonth(), d.getDate() + c)
}
