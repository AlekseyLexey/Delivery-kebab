import type { IUser } from "../../types/userTypes"

export interface IAuthResponse {
	accessToken: string,
	refreshToken: string,
	user: IUser
}
