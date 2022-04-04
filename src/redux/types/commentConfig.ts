import {
  IPageConfigSetErrorsAction,
  IPageConfigSetFormAction,
  IPageConfigSetFormDefaultAction,
  IPageConfigSetLoadingAction,
} from './index';

export interface ICommentForm {
  comment_postId: string;
  comment_name: string;
  comment_email: string;
  comment_body: string;
}

export enum ECommentConfigAction {
  COMMENT_CONFIG_SET_LOADING = 'COMMENT_CONFIG_SET_LOADING',
  COMMENT_CONFIG_SET_FORM = 'COMMENT_CONFIG_SET_FORM',
  COMMENT_CONFIG_SET_ERRORS = 'COMMENT_CONFIG_SET_ERRORS',
  COMMENT_CONFIG_SET_FORM_DEFAULT = 'COMMENT_CONFIG_SET_FORM_DEFAULT',
  COMMENT_CONFIG_RESET_STATE = 'COMMENT_CONFIG_RESET_STATE',
}

export interface ICommentConfigSetLoadingAction extends IPageConfigSetLoadingAction {}

export interface ICommentConfigSetFormAction extends IPageConfigSetFormAction<ICommentForm> {}

export interface ICommentConfigSetFormDefaultAction extends IPageConfigSetFormDefaultAction<ICommentForm> {}

export interface ICommentConfigSetErrorsAction extends IPageConfigSetErrorsAction<{ [key: string]: string }> {}

export type TCommentConfigAction =
  | ICommentConfigSetLoadingAction
  | ICommentConfigSetFormAction
  | ICommentConfigSetErrorsAction
  | ICommentConfigSetFormDefaultAction;

export interface ICommentConfigAction {
  type: ECommentConfigAction;
  payload: TCommentConfigAction;
}

export interface ICommentConfigState {
  isLoading: boolean;
  form: ICommentForm;
  formDefault: ICommentForm;
  errors: { [key: string]: string };
}
