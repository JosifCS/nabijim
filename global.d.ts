import en from "./messages/en.json";
//n import "@tanstack/react-table"

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  interface StringConstructor {
    /** Ekvivalent prázdného stringu *""*. */
    Empty: string;
    /** *\r* */
    CR: string;
    /** *\n* */
    LF: string;
    /** *r\n* */
    CRLF: string;
  }
}

// declare module "@tanstack/react-table" {
// 	interface ColumnMeta<TData extends RowData, TValue> {
// 		className?: string
// 	}
// }
