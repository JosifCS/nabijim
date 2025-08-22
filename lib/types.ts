import { getTranslations } from "next-intl/server"

export type Translations = Awaited<ReturnType<typeof getTranslations>>

/**
 * A type for easy definition of Page or Layout parameters. In the KEYS type parameter,
 * just enter a list of expected `params` parameters.
 * Plus the type contains a general definition of `searchParams`.
 *
 * @example
 * type Props = PageProps<"id" | "name">
 * // Result:
 * // {
 * //   params: Promise<{ id: string; name: string }>;
 * //   searchParams: Promise<Record<string, string | string[] | undefined>>;
 * // }
 */
export type PageProps<KEYS extends keyof any = string> = {
	params: Promise<Readonly<{ [P in KEYS]: string }>>
	searchParams: Promise<
		Readonly<Record<string, string | string[] | undefined>>
	>
}
