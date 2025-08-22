export function addressString(address: {
	city: string | null
	street: string | null
	streetNumber: number | null
	houseNumber: number | null
}) {
	if (
		address.city &&
		address.street &&
		address.houseNumber &&
		address.streetNumber
	)
		return `${address.street} ${address.streetNumber}/${address.houseNumber}, ${address.city}`

	if (address.city && address.street && address.streetNumber)
		return `${address.street} ${address.streetNumber}, ${address.city}`

	if (address.city) return address.city

	return null
}
