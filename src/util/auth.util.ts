interface ILogin {
	login: string;
	password: string;
}

export const validateLogin = (obj: ILogin): true | string | null => {
	return true;
};
