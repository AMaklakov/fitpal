import { DataActionCreator } from '@model/data-action.model';

export interface IProgressTypes {
	START: string;
	SUCCESS: string;
	ERROR: string;
}
export const progressTypes = (key: string, action = 'FETCH'): IProgressTypes => ({
	START: `${key}/${action}/START`,
	SUCCESS: `${key}/${action}/SUCCESS`,
	ERROR: `${key}/${action}/ERROR`,
});

export interface IProgressActions<T1 = any, T2 = any, T3 = any> {
	START: DataActionCreator<T1>;
	SUCCESS: DataActionCreator<T2>;
	ERROR: DataActionCreator<T3>;
}

export const progressActions = <T1 = any, T2 = any, T3 = any>(types: IProgressTypes): IProgressActions<T1, T2, T3> => {
	return {
		START: data => ({ type: types.START, payload: data }),
		SUCCESS: data => ({ type: types.SUCCESS, payload: data }),
		ERROR: data => ({ type: types.ERROR, payload: data }),
	};
};

export const dataActionCreator = <PayloadType>(type: string): DataActionCreator<PayloadType> => {
	return (payload: PayloadType) => ({ type, payload });
};
