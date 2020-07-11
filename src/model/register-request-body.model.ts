export interface IRegisterRequestBody {
	email: string;
	password: string;
	weight: string;
	height: string;

	firstName?: string;
	lastName?: string;
	// middleName?: string;

	isMale?: boolean;
	age?: string;
}
