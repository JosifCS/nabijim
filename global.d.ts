//n import "@tanstack/react-table"
import { routing } from "@/i18n/routing"
import { formats } from "@/i18n/request"
import messages from "./messages/en.json"

declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof routing.locales)[number]
		Messages: typeof messages
		Formats: typeof formats
	}
}

declare global {
	interface StringConstructor {
		/** Ekvivalent prázdného stringu *""*. */
		Empty: string
		/** *\r* */
		CR: string
		/** *\n* */
		LF: string
		/** *r\n* */
		CRLF: string
	}
}

// declare module "@tanstack/react-table" {
// 	interface ColumnMeta<TData extends RowData, TValue> {
// 		className?: string
// 	}
// }
