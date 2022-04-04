import {
  EUsersAction,
  ISetUsersDataAction,
  ISetUsersIsLoadingAction,
  IUsersAction,
  IUsersState,
} from '../types/users';

const INITIAL_STATE: IUsersState = {
  isLoading: false,
  data: [],
};

const UsersReducer = (state = INITIAL_STATE, action: IUsersAction): IUsersState => {
  switch (action.type) {
    case EUsersAction.USERS_SET_IS_LOADING: {
      const { isLoading } = action.payload as ISetUsersIsLoadingAction;
      return { ...state, isLoading };
    }
    case EUsersAction.USERS_SET_DATA: {
      const { data } = action.payload as ISetUsersDataAction;
      return { ...state, data };
    }
    case EUsersAction.USERS_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default UsersReducer;
