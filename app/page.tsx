import { ButtonLink } from "@/components/button-link"
import { InfoCard } from "@/components/info-card"
import { auth0 } from "@/lib/auth0"
import {
	BarChart3,
	Clock,
	Euro,
	Home,
	Mail,
	MapPin,
	Plus,
	TrendingUp,
	Zap,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await auth0.getSession()

	if (session) redirect("/dashboard")

	const t = await getTranslations("Index")

	return (
		<div className="container mx-auto px-4 py-12 max-w-6xl">
			<div className="text-center mb-16">
				<div className="flex justify-center mb-6">
					<div className="p-4 bg-emerald-600 rounded-full">
						<Zap className="h-12 w-12 text-white" />
					</div>
				</div>
				<h1 className="text-5xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">
					Nabíjím.to
				</h1>
				<p className="text-xl text-emerald-700 dark:text-emerald-300 mb-8 max-w-3xl mx-auto">
					{t("description")}
				</p>
				<ButtonLink
					href="/dashboard"
					size="lg"
					className="px-8 py-4 text-lg"
				>
					{t("begin")}
				</ButtonLink>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
				<InfoCard
					icon={<Home />}
					title={t("homeTitle")}
					description={t("homeDesc")}
				/>

				<InfoCard
					icon={<MapPin />}
					title={t("publicTitle")}
					description={t("publicDesc")}
				/>

				<InfoCard
					icon={<Mail />}
					title={t("mailTitle")}
					description={t("mailDesc")}
				/>

				<InfoCard
					icon={<BarChart3 />}
					title={t("statsTitle")}
					description={t("statsDesc")}
				/>

				<InfoCard
					icon={<TrendingUp />}
					title={t("trendsTitle")}
					description={t("trendsDesc")}
				/>

				<InfoCard
					icon={<Clock />}
					title={t("fastTitle")}
					description={t("fastDesc")}
				/>
			</div>

			<div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
				<h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 text-center mb-8">
					{t("whyUse")}
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="text-center">
						<div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full w-fit mx-auto mb-4">
							<Euro className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
							{t("costControl")}
						</h3>
						<p className="text-emerald-600 dark:text-emerald-400">
							{t("costDesc")}
						</p>
					</div>
					<div className="text-center">
						<div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full w-fit mx-auto mb-4">
							<TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
							{t("optimalization")}
						</h3>
						<p className="text-emerald-600 dark:text-emerald-400">
							{t("optimalizationDesc")}
						</p>
					</div>
					<div className="text-center">
						<div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full w-fit mx-auto mb-4">
							<BarChart3 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
							{t("overview")}
						</h3>
						<p className="text-emerald-600 dark:text-emerald-400">
							{t("overviewDesc")}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
