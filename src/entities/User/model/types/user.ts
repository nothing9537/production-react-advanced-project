export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export interface User {
	id: string;
	username: string;
	avatar?: string;
	role?: UserRole;
}

export interface UserSchema {
	authData?: User | null;

	_mounted: boolean;
}
