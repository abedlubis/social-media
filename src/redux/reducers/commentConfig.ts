import {
  ECommentConfigAction,
  ICommentConfigSetLoadingAction,
  ICommentConfigSetFormAction,
  ICommentConfigSetFormDefaultAction,
  ICommentConfigSetErrorsAction,
  ICommentConfigAction,
  ICommentConfigState,
} from '../types/commentConfig';

const INITIAL_STATE: ICommentConfigState = {
  isLoading: false,
  errors: {},
  form: {
    comment_postId: '',
    comment_name: '',
    comment_email: '',
    comment_body: '',
  },
  formDefault: {
    comment_postId: '',
    comment_name: '',
    comment_email: '',
    comment_body: '',
  },
};

const CommentConfigReducer = (state = INITIAL_STATE, action: ICommentConfigAction): ICommentConfigState => {
  switch (action.type) {
    case ECommentConfigAction.COMMENT_CONFIG_SET_LOADING: {
      const { isLoading } = action.payload as ICommentConfigSetLoadingAction;
      return { ...state, isLoading };
    }
    case ECommentConfigAction.COMMENT_CONFIG_SET_FORM: {
      const { form } = action.payload as ICommentConfigSetFormAction;
      return { ...state, form };
    }
    case ECommentConfigAction.COMMENT_CONFIG_SET_FORM_DEFAULT: {
      const { formDefault } = action.payload as ICommentConfigSetFormDefaultAction;
      return { ...state, formDefault };
    }
    case ECommentConfigAction.COMMENT_CONFIG_SET_ERRORS: {
      const { errors } = action.payload as ICommentConfigSetErrorsAction;
      return { ...state, errors };
    }
    case ECommentConfigAction.COMMENT_CONFIG_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default CommentConfigReducer;
