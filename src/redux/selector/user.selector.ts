import { IStore } from '@redux/store';

export const getUserWeight = (state: IStore) => state.user.weightData.weight;
