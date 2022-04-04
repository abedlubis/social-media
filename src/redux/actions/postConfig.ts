import {
  IPostConfigAction,
  EPostConfigAction,
  IPostForm,
} from '../types/postConfig';

export const setIsLoading = (isLoading: boolean): IPostConfigAction => ({
  type: EPostConfigAction.POST_CONFIG_SET_LOADING,
  payload: {
    isLoading,
  },
});

export const setPostForm = (form: IPostForm): IPostConfigAction => ({
  type: EPostConfigAction.POST_CONFIG_SET_FORM,
  payload: {
    form,
  },
});

export const setPostFormDefault = (formDefault: IPostForm): IPostConfigAction => ({
  type: EPostConfigAction.POST_CONFIG_SET_FORM_DEFAULT,
  payload: {
    formDefault,
  },
});

export const setPostFormErrors = (errors: { [key: string]: string }): IPostConfigAction => ({
  type: EPostConfigAction.POST_CONFIG_SET_ERRORS,
  payload: {
    errors,
  },
});

export const resetState = () => ({
  type: EPostConfigAction.POST_CONFIG_RESET_STATE,
});
