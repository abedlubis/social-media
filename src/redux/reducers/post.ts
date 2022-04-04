import {
  EPostAction,
  ISetPostIsLoading,
  ISetPostUserData,
  ISetPostComments,
  ISetModalIsLoading,
  IPostState,
  IPostAction,
} from '../types/post';

const INITIAL_STATE: IPostState = {
  userPosts: [],
  isLoading: false,
  comments: [],
  isModalLoading: false,
};

const PostReducer = (state = INITIAL_STATE, action: IPostAction): IPostState => {
  switch (action.type) {
    case EPostAction.POST_SET_IS_LOADING: {
      const { isLoading } = action.payload as ISetPostIsLoading;
      return { ...state, isLoading };
    }
    case EPostAction.POST_SET_USER_POST: {
      const { userPosts } = action.payload as ISetPostUserData;
      return { ...state, userPosts };
    }
    case EPostAction.POST_SET_IS_MODAL_LOADING: {
      const { isModalLoading } = action.payload as ISetModalIsLoading;
      return { ...state, isModalLoading };
    }
    case EPostAction.POST_SET_COMMENT: {
      const { comments } = action.payload as ISetPostComments;
      return { ...state, comments };
    }
    case EPostAction.POST_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default PostReducer;
