import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { MapPin, Zap, Clock, Euro } from "lucide-react"
import { Badge } from "./ui/badge"
import { getLocale, getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"
import { Skeleton } from "./ui/skeleton"

export async function RecentChargings() {
	const locale = await getLocale()
	const t = await getTranslations("Components.RecentChargings")

	const chargings: {
		id: number
		duration: number | null
		provider: string
		date: Date
		kwh: number
		totalCost: number
		startTime: Date | null
		endTime: Date | null
	}[] = [
		{
			id: 1,
			date: new Date(),
			duration: 147 * 60,
			kwh: 21.45,
			totalCost: 215.47,
			endTime: null,
			startTime: null,
			provider: "ČEZ",
		},
	]

	if (chargings.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="text-emerald-800 dark:text-emerald-200">
						{t("lastCharging")}
					</CardTitle>
					<CardDescription>{t("noCharging")}</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-center text-muted-foreground py-8">
						{t("help")}
					</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-emerald-800 dark:text-emerald-200">
					{t("lastCharging")}
				</CardTitle>
				<CardDescription>
					{t("count", { count: chargings.length })}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{chargings.map((charging) => (
						<div
							key={charging.id}
							className="flex items-center justify-between p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-colors"
						>
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2">
									<MapPin className="h-4 w-4 text-emerald-600" />
									<span
										className="font-medium text-emerald-800 dark:text-emerald-200"
										title={t("provider")}
									>
										{charging.provider}
									</span>
									<Badge
										variant="outline"
										className="text-xs"
										title={t("date")}
									>
										{new Date(
											charging.date
										).toLocaleDateString("cs-CZ")}
									</Badge>
								</div>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div
										className="flex items-center gap-1"
										title={t("totalEnergy")}
									>
										<Zap className="h-3 w-3" />
										{charging.kwh.toFixed(2)} kWh
									</div>
									<div
										className="flex items-center gap-1"
										title={t("duration")}
									>
										<Clock className="h-3 w-3" />
										{(
											(charging.duration ?? 0) / 60
										).toLocaleString(locale, {
											style: "unit",
											unit: "minute",
										})}
									</div>
									<div
										className="flex items-center gap-1"
										title={t("pricePerKwh")}
									>
										<Euro className="h-3 w-3" />
										{(
											charging.totalCost / charging.kwh
										).toFixed(2)}{" "}
										Kč/kWh
									</div>
								</div>
							</div>
							<div className="text-right">
								<div
									className="text-lg font-bold text-emerald-800 dark:text-emerald-200"
									title={t("totalCost")}
								>
									{charging.totalCost.toLocaleString(locale, {
										style: "currency",
										currency: "CZK",
									})}
								</div>
								<div
									className="text-xs text-muted-foreground"
									title={t("chargingTime")}
								>
									{charging.startTime?.toLocaleTimeString(
										locale
									)}
									{charging.startTime && charging.endTime
										? " - "
										: " "}
									{charging.endTime?.toLocaleTimeString(
										locale
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export function RecentChargingsSkeleton() {
	const t = useTranslations("Components.RecentChargings")

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-emerald-800 dark:text-emerald-200">
					{t("lastCharging")}
				</CardTitle>
				<Skeleton className="h-5 w-40" />
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{[0, 1, 2].map((x) => (
						<div
							key={x}
							className="flex items-center justify-between p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/50 transition-colors"
						>
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2 h-6">
									<MapPin className="h-4 w-4 text-emerald-600" />
									<Skeleton className="bg-emerald-100 h-[22px] w-20" />
									<Skeleton className="h-[22px] w-24" />
								</div>
								<div className="flex items-center gap-4 text-sm text-muted-foreground h-5">
									<div className="flex items-center gap-1">
										<Zap className="h-3 w-3" />
										<Skeleton className="h-4 w-14" />
									</div>
									<div className="flex items-center gap-1">
										<Clock className="h-3 w-3" />
										<Skeleton className="h-4 w-14" />
									</div>
									<div className="flex items-center gap-1">
										<Euro className="h-3 w-3" />
										<Skeleton className="h-4 w-14" />
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2 items-end">
								<Skeleton className="bg-emerald-100 h-6 w-16" />
								<Skeleton className="h-4 w-20" />
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
