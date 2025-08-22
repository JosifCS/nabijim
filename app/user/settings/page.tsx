import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { addressString } from "@/modules/utils"
import { Edit, MapPin, Plus, Trash2, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const user = await authorize()
	const t = await getTranslations("User.Settings")

	const stations = await prisma.chargeStation.findMany({
		where: { userId: user.id },
	})

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
					{t("settings")}
				</h1>
				<p className="text-emerald-700 dark:text-emerald-300">
					{t("description")}
				</p>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Zap className="h-5 w-5 text-emerald-600" />
								{t("stations")}
							</CardTitle>
							<CardDescription>
								{t("chargeDescription")}
							</CardDescription>
						</div>
						<Button className="bg-emerald-600 hover:bg-emerald-700">
							<Plus className="h-4 w-4 mr-2" />
							{t("addStation")}
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{stations.length === 0 ? (
						<div className="text-center py-8 text-gray-500 dark:text-gray-400">
							<Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
							<p>{t("noStations")}</p>
						</div>
					) : (
						<div className="grid gap-4">
							{stations.map((station) => (
								<div
									key={station.id}
									className="flex items-center justify-between p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20"
								>
									<div className="flex items-center gap-3">
										<div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-full">
											<Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
										</div>
										<div>
											<h3 className="font-semibold text-emerald-800 dark:text-emerald-200">
												{station.name}
											</h3>
											<div className="flex items-center gap-4 text-sm text-emerald-600 dark:text-emerald-400">
												<span>XX Kč/kWh</span>
												{addressString(station) && (
													<span className="flex items-center gap-1">
														<MapPin className="h-3 w-3" />
														{addressString(station)}
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300"
										>
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
