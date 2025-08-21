import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { ReactNode } from "react"
import { Skeleton } from "./ui/skeleton"

interface ChargingStatsProps {
	label: string
	value: string
	description: string
	icon: ReactNode
}

export function StatCard({
	label,
	value,
	description,
	icon,
}: ChargingStatsProps) {
	return (
		<Card className="border-emerald-200 dark:border-emerald-800 gap-2">
			<CardHeader className="flex flex-row items-center justify-between space-y-0">
				<CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
					{label}
				</CardTitle>
				<div className="text-emerald-600">{icon}</div>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
					{value}
				</div>
				<p className="text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	)
}

export function StatCardSkeleton({
	label,
	icon,
}: Pick<ChargingStatsProps, "label" | "icon">) {
	return (
		<Card className="border-emerald-200 dark:border-emerald-800 gap-2">
			<CardHeader className="flex flex-row items-center justify-between space-y-0">
				<CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
					{label}
				</CardTitle>
				<div className="text-emerald-600">{icon}</div>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-6 w-32 mb-2 bg-emerald-100" />
				<Skeleton className="h-4 w-24" />
			</CardContent>
		</Card>
	)
}
