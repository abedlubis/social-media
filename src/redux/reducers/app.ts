import {
  EAppAction,
  IAppSetSidebarVisible,
  IAppSetErrorStatus,
  IAppState,
  IAppActions,
} from '../types/app';

const INITIAL_STATE: IAppState = {
  isSidebarVisible: true,
  errorStatus: null,
};

const AppReducer = (state = INITIAL_STATE, action: IAppActions): IAppState => {
  switch (action.type) {
    case EAppAction.APP_SET_IS_SIDEBAR_VISIBLE: {
      const { isSidebarVisible } = action.payload as IAppSetSidebarVisible;
      return { ...state, isSidebarVisible };
    }
    case EAppAction.APP_SET_ERROR_STATUS: {
      const { errorStatus } = action.payload as IAppSetErrorStatus;
      return { ...state, errorStatus };
    }
    default: {
      return state;
    }
  }
};

export default AppReducer;