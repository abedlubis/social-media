import {
  EPostConfigAction,
  IPostConfigSetLoadingAction,
  IPostConfigSetFormAction,
  IPostConfigSetErrorsAction,
  IPostConfigSetFormDefaultAction,
  IPostConfigAction,
  IPostConfigState,
} from '../types/postConfig';

const INITIAL_STATE: IPostConfigState = {
  isLoading: false,
  errors: {},
  form: {
    post_userId: '',
    post_body: '',
    post_title: '',
  },
  formDefault: {
    post_userId: '',
    post_body: '',
    post_title: '',
  },
};

const PostConfigReducer = (state = INITIAL_STATE, action: IPostConfigAction): IPostConfigState => {
  switch (action.type) {
    case EPostConfigAction.POST_CONFIG_SET_LOADING: {
      const { isLoading } = action.payload as IPostConfigSetLoadingAction;
      return { ...state, isLoading };
    }
    case EPostConfigAction.POST_CONFIG_SET_FORM: {
      const { form } = action.payload as IPostConfigSetFormAction;
      return { ...state, form };
    }
    case EPostConfigAction.POST_CONFIG_SET_FORM_DEFAULT: {
      const { formDefault } = action.payload as IPostConfigSetFormDefaultAction;
      return { ...state, formDefault };
    }
    case EPostConfigAction.POST_CONFIG_SET_ERRORS: {
      const { errors } = action.payload as IPostConfigSetErrorsAction;
      return { ...state, errors };
    }
    case EPostConfigAction.POST_CONFIG_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default PostConfigReducer;
