export type UserRole = 'courier' | 'customer'

export interface IFormData {
	email: string,
	password: string
	role: UserRole | ''
}
