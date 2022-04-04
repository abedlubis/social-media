import {
  IPageConfigSetErrorsAction,
  IPageConfigSetFormAction,
  IPageConfigSetFormDefaultAction,
  IPageConfigSetLoadingAction,
} from './index';

export interface IPostForm {
  post_title: string;
  post_body: string;
  post_userId: string;
}

export enum EPostConfigAction {
  POST_CONFIG_SET_LOADING = 'POST_CONFIG_SET_LOADING',
  POST_CONFIG_SET_FORM = 'POST_CONFIG_SET_FORM',
  POST_CONFIG_SET_ERRORS = 'POST_CONFIG_SET_ERRORS',
  POST_CONFIG_SET_FORM_DEFAULT = 'POST_CONFIG_SET_FORM_DEFAULT',
  POST_CONFIG_RESET_STATE = 'POST_CONFIG_RESET_STATE',
}

export interface IPostConfigSetLoadingAction extends IPageConfigSetLoadingAction {}

export interface IPostConfigSetFormAction extends IPageConfigSetFormAction<IPostForm> {}

export interface IPostConfigSetFormDefaultAction extends IPageConfigSetFormDefaultAction<IPostForm> {}

export interface IPostConfigSetErrorsAction extends IPageConfigSetErrorsAction<{ [key: string]: string }> {}

export type TPostConfigAction =
  | IPostConfigSetLoadingAction
  | IPostConfigSetFormAction
  | IPostConfigSetErrorsAction
  | IPostConfigSetFormDefaultAction;

export interface IPostConfigAction {
  type: EPostConfigAction;
  payload: TPostConfigAction;
}

export interface IPostConfigState {
  isLoading: boolean;
  form: IPostForm;
  formDefault: IPostForm;
  errors: { [key: string]: string };
}
