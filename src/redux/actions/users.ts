import {
  EUsersAction,
  IUsersAction,
  TUsersData,
} from '../types/users';

export const setIsLoading = (isLoading: boolean): IUsersAction => ({
  type: EUsersAction.USERS_SET_IS_LOADING,
  payload: {
    isLoading,
  },
});

export const setUsersData = (data: TUsersData[]): IUsersAction => ({
  type: EUsersAction.USERS_SET_DATA,
  payload: {
    data,
  },
});

export const resetState = () => ({
  type: EUsersAction.USERS_RESET_STATE,
});
