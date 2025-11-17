/** Typy nabíjecích konektrorů. `"TYPE_1"` a `"TYPE_2"` jsou AC,
 * `"CCS1"`, `"CCS2"` a `"CHADEMO"` jsou DC.
 * `"TESLA"` a `"GB_T"` mohou být AC i DC.  */
export const CONNECTORS = [
	"TYPE_2",
	"CCS2",
	"TYPE_1",
	"CCS1",
	"CHADEMO",
	"TESLA",
	"GB_T",
] as const

/** Typy nabíjecích konektrorů. `"TYPE_1"` a `"TYPE_2"` jsou AC,
 * `"CCS1"`, `"CCS2"` a `"CHADEMO"` jsou DC.
 * `"TESLA"` a `"GB_T"` mohou být AC i DC.  */
export type Connectors = (typeof CONNECTORS)[number]
