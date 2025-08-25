import { User, Zap } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import { ButtonLink } from "./button-link"
import { auth0 } from "@/lib/auth0"
import { LocaleSelect } from "./locale-select"
import { UserMenu } from "./user-menu"
import Link from "next/link"

export async function Header() {
	const session = await auth0.getSession()
	const locale = await getLocale()
	const t = await getTranslations("Components.Header")

	return (
		<header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-emerald-200 dark:border-emerald-800 z-10">
			<div className="container mx-auto px-4 py-4 max-w-6xl">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3">
						<div className="p-2 bg-emerald-600 rounded-full">
							<Zap className="h-5 w-5 text-white" />
						</div>
						<span className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
							Nabíjím.to
						</span>
					</Link>

					<div className="flex items-center gap-3">
						<LocaleSelect
							locale={locale}
							label={t("localeSelect")}
						/>
						{session ? (
							<UserMenu
								messages={{
									userName:
										session.user.name ??
										session.user.email ??
										"N/A",
									logout: t("logout"),
									myAccount: t("myAccount"),
									settings: t("settings"),
								}}
							/>
						) : (
							<ButtonLink href="/auth/login" size="sm">
								<User className="h-4 w-4 mr-2" />
								{t("login")}
							</ButtonLink>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
