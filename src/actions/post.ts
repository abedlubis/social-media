import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { PromiseVoid } from '../interfaces';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import { IPostAction } from '../redux/types/post';
import {
  setUserPostData,
  setIsLoading,
  setModalIsLoading,
  setPostComments,
} from '../redux/actions/post';
import {
  setErrorStatus,
} from '../redux/actions/app';
import {
  IUserPostResponseBody,
  IPostCommentsResponseBody,
} from '../interfaces/post';
import {
  API_ROUTES,
} from '../constants';

export const getUserPostsData = (
  userId: string,
  start: number,
  limit: number,
): ThunkAction<PromiseVoid, TAppState, {}, IPostAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };
  try {
    d(setIsLoading(true));
    const url = `${API_ROUTES.getPostByUserId}&_start=${start}&_limit=${limit}`.replace('{userId}', userId);
    const res = await httpReq<IUserPostResponseBody[]>(url, config);

    d(setUserPostData(res));
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};

export const getCommentsByPostId = (
  postId: string,
): ThunkAction<PromiseVoid, TAppState, {}, IPostAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };

  try {
    d(setModalIsLoading(true));
    const url = API_ROUTES.getCommentsByPostId.replace('{postId}', postId);
    const res = await httpReq<IPostCommentsResponseBody[]>(url, config);

    d(setPostComments(res));
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setModalIsLoading(false));
  }
};

export const deleteUserPost = (
  postId: string,
): ThunkAction<PromiseVoid, TAppState, {}, IPostAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'DELETE',
  };

  try {
    d(setIsLoading(true));
    const url = API_ROUTES.deleteUserPost.replace('{postId}', postId);
    await httpReq(url, config);

    toast.success(`POST #${postId} successfully deleted ...`);
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};
