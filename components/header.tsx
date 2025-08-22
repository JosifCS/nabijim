import { Globe, User, Zap } from "lucide-react"
import { Button } from "./ui/button"
import { getTranslations } from "next-intl/server"

export async function Header() {
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
						<Button
							variant="outline"
							size="sm"
							className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900 bg-transparent"
						>
							<Globe className="h-4 w-4 mr-2" />
							CZ
						</Button>
						<Button
							size="sm"
							className="bg-emerald-600 hover:bg-emerald-700 text-white"
						>
							<User className="h-4 w-4 mr-2" />
							{t("login")}
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
