import {
  IUserPostResponseBody,
  IPostCommentsResponseBody,
} from '../../interfaces/post';

export enum EPostAction {
  POST_SET_IS_LOADING = 'POST_SET_IS_LOADING',
  POST_SET_IS_MODAL_LOADING = 'POST_SET_IS_MODAL_LOADING',
  POST_SET_USER_POST = 'POST_SET_USER_POST',
  POST_SET_COMMENT = 'POST_SET_COMMENT',
  POST_RESET_STATE = 'POST_RESET_STATE',
}

export interface ISetPostIsLoading {
  isLoading: boolean;
}

export interface ISetModalIsLoading {
  isModalLoading: boolean;
}

export interface ISetPostUserData {
  userPosts: IUserPostResponseBody[];
}

export interface ISetPostComments {
  comments: IPostCommentsResponseBody[]
}

export type TPostAction =
  | ISetPostIsLoading
  | ISetPostUserData
  | ISetPostComments
  | ISetModalIsLoading;

export interface IPostAction {
  type: EPostAction;
  payload: TPostAction;
}

export interface IPostState {
  userPosts: IUserPostResponseBody[];
  isLoading: boolean;
  comments: IPostCommentsResponseBody[];
  isModalLoading: boolean;
}
