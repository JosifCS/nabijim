import { redirect } from "next/navigation"

export default async function CatchAll() {
	return redirect(`/user/settings`)
}
