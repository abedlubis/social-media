import { IUsersResponseBody } from '../../interfaces/users';

export enum EUsersAction {
  USERS_SET_DATA = 'USERS_SET_DATA',
  USERS_SET_IS_LOADING = 'USERS_SET_IS_LOADING',
  USERS_RESET_STATE = 'USERS_RESET_STATE',
}

export type TUsersData = Omit<IUsersResponseBody, 'website' | 'company'>;

export interface ISetUsersDataAction {
  data: TUsersData[];
}

export interface ISetUsersIsLoadingAction {
  isLoading: boolean;
}

export type TUsersPayload =
  | ISetUsersDataAction
  | ISetUsersIsLoadingAction;

export interface IUsersAction {
  type: EUsersAction;
  payload: TUsersPayload;
}

export interface IUsersState {
  isLoading: boolean;
  data: TUsersData[];
}
