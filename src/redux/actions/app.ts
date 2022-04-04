import {
  EAppAction,
  IAppActions,
} from '../types/app';
import {
  EStatusErrorCode,
} from '../../interfaces';

export const setSidebarVisible = (isSidebarVisible: boolean): IAppActions => ({
  type: EAppAction.APP_SET_IS_SIDEBAR_VISIBLE,
  payload: {
    isSidebarVisible,
  },
});

export const setErrorStatus = (errorStatus: EStatusErrorCode): IAppActions => ({
  type: EAppAction.APP_SET_ERROR_STATUS,
  payload: {
    errorStatus,
  },
});
