export class Profile {
	id?: number;
	name?: string;
	email?: string;
	usuario?: string;
	bio?: string;
	avatarUrl?: string;

	constructor(data: Partial<Profile> = {}) {
		Object.assign(this, data);
	}
}
