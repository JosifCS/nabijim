"use server"

import { cookies } from "next/headers"

/**
 * Změna jazyka stránky.
 * @param locale "cs" nebo "en".
 */
export async function setLocale(locale: string) {
	const cs = await cookies()
	cs.set("locale", locale)
}
