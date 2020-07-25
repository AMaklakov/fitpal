import { IStore } from '@redux/store';

export const getIsAuthorized = (store: IStore) => store.user.auth.isAuthorized;
