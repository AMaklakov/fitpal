import { BigSource } from 'big.js';
import { IWeight } from '@redux/store/reducer/user/weight.reducer';

export enum UserActions {
	SetModalVisible = 'USER/WEIGHT/CHANGE_USER_WEIGHT/SET_MODAL_VISIBLE',
	ChangeUserWeightStart = 'USER/WEIGHT/CHANGE_USER_WEIGHT/START',
	ChangeUserWeightSuccess = 'USER/WEIGHT/CHANGE_USER_WEIGHT/SUCCESS',
	ChangeUserWeightError = 'USER/WEIGHT/CHANGE_USER_WEIGHT/ERROR',
}

export const setWeightModalVisible = (visible?: boolean) => ({
	type: UserActions.SetModalVisible,
	payload: visible,
});

export const changeUserWeightStart = (weight: BigSource) => ({
	type: UserActions.ChangeUserWeightStart,
	payload: weight,
});
export const changeUserWeightSuccess = (userWeight: Pick<IWeight, 'date' | 'weight'>) => ({
	type: UserActions.ChangeUserWeightSuccess,
	payload: userWeight,
});
export const changeUserWeightError = (error: object) => ({
	type: UserActions.ChangeUserWeightError,
	payload: error,
});
