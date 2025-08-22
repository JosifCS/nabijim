import { Globe, LogOut, User, Zap } from "lucide-react"
import { Button } from "./ui/button"
import { getLocale, getTranslations } from "next-intl/server"
import { ButtonLink } from "./button-link"
import { auth0 } from "@/lib/auth0"
import { LocaleSelect } from "./locale-select"

export async function Header() {
	const session = await auth0.getSession()
	const locale = await getLocale()
	const t = await getTranslations("Components.Header")

	return (
		<header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-emerald-200 dark:border-emerald-800">
			<div className="container mx-auto px-4 py-4 max-w-6xl">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-emerald-600 rounded-full">
							<Zap className="h-5 w-5 text-white" />
						</div>
						<span className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
							Nabíjím.to
						</span>
					</div>

					<div className="flex items-center gap-3">
						<LocaleSelect
							locale={locale}
							label={t("localeSelect")}
						/>
						{session ? (
							<ButtonLink
								href="/auth/logout"
								size="sm"
								className="bg-emerald-600 hover:bg-emerald-700 text-white"
							>
								<LogOut className="h-4 w-4 mr-2" />
								{t("logout")}
							</ButtonLink>
						) : (
							<ButtonLink
								href="/auth/login"
								size="sm"
								className="bg-emerald-600 hover:bg-emerald-700 text-white"
							>
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
