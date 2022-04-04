import {
  ICommentConfigAction,
  ECommentConfigAction,
  ICommentForm,
} from '../types/commentConfig';

export const setIsLoading = (isLoading: boolean): ICommentConfigAction => ({
  type: ECommentConfigAction.COMMENT_CONFIG_SET_LOADING,
  payload: {
    isLoading,
  },
});

export const setCommentForm = (form: ICommentForm): ICommentConfigAction => ({
  type: ECommentConfigAction.COMMENT_CONFIG_SET_FORM,
  payload: {
    form,
  },
});

export const setCommentFormDefault = (formDefault: ICommentForm): ICommentConfigAction => ({
  type: ECommentConfigAction.COMMENT_CONFIG_SET_FORM_DEFAULT,
  payload: {
    formDefault,
  },
});

export const setCommentFormErrors = (errors: { [key: string]: string }): ICommentConfigAction => ({
  type: ECommentConfigAction.COMMENT_CONFIG_SET_ERRORS,
  payload: {
    errors,
  },
});

export const resetState = () => ({
  type: ECommentConfigAction.COMMENT_CONFIG_RESET_STATE,
});
