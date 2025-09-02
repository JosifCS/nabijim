import { auth0 } from "@/lib/auth0"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function authorize() {
	const session = await auth0.getSession()

	if (session) {
		const user = await getUser(session.user.email!)
		const admins: string[] = JSON.parse(process.env.ADMINS ?? "[]")

		return {
			email: user.email,
			id: user.id,
			nickname: session.user.nickname!,
			admin: admins.includes(user.email),
		}
	}

	redirect("/auth/login")
}

async function getUser(email: string) {
	let user = await prisma.user.findFirst({
		where: { email: { equals: email } },
		select: { id: true, email: true },
	})

	// pokud se uživatel zrovna zaregistorval, tak si ho potřebuju přidat do vlastní databáze
	if (user == null)
		user = await prisma.user.create({
			data: { email: email },
			select: { id: true, email: true },
		})

	return user
}
