import { EStatusErrorCode } from '../../interfaces';

export enum EAppAction {
  APP_SET_IS_SIDEBAR_VISIBLE = 'APP_SET_IS_SIDEBAR_VISIBLE',
  APP_SET_ERROR_STATUS = 'APP_SET_ERROR_STATUS',
}

export interface IAppSetSidebarVisible {
  isSidebarVisible: boolean;
}

export interface IAppSetErrorStatus {
  errorStatus: EStatusErrorCode | null;
}

export type TAppPayload =
  | IAppSetSidebarVisible
  | IAppSetErrorStatus;

export interface IAppActions {
  type: EAppAction;
  payload: TAppPayload;
}

export interface IAppState {
  isSidebarVisible: boolean;
  errorStatus: EStatusErrorCode | null;
}