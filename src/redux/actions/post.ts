import {
  IPostAction,
  EPostAction,
} from '../types/post';
import {
  IUserPostResponseBody,
  IPostCommentsResponseBody,
} from '../../interfaces/post';

export const setIsLoading = (isLoading: boolean): IPostAction => ({
  type: EPostAction.POST_SET_IS_LOADING,
  payload: {
    isLoading,
  },
});

export const setUserPostData = (userPosts: IUserPostResponseBody[]): IPostAction => ({
  type: EPostAction.POST_SET_USER_POST,
  payload: {
    userPosts,
  },
});

export const setPostComments = (comments: IPostCommentsResponseBody[]): IPostAction => ({
  type: EPostAction.POST_SET_COMMENT,
  payload: {
    comments,
  },
});

export const setModalIsLoading = (isModalLoading: boolean): IPostAction => ({
  type: EPostAction.POST_SET_IS_MODAL_LOADING,
  payload: {
    isModalLoading,
  },
});

export const resetState = () => ({
  type: EPostAction.POST_RESET_STATE,
});
