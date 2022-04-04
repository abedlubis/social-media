import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { PromiseVoid } from '../interfaces';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import { IPostConfigAction, IPostForm } from '../redux/types/postConfig';
import {
  setPostForm,
  setPostFormDefault,
  setIsLoading,
} from '../redux/actions/postConfig';
import {
  setErrorStatus,
} from '../redux/actions/app';
import {
  IUserPostResponseBody,
} from '../interfaces/post';
import {
  API_ROUTES,
} from '../constants';

export const getUserPost = (
  postId: string,
): ThunkAction<PromiseVoid, TAppState, {}, IPostConfigAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };

  try {
    d(setIsLoading(true));

    const url = API_ROUTES.getPostByPostId.replace('{postId}', postId);
    const res = await httpReq<IUserPostResponseBody[]>(url, config);

    const form: IPostForm = {
      post_userId: res[0].userId.toString(),
      post_title: res[0].title,
      post_body: res[0].body,
    };

    batch(() => {
      d(setPostForm(form));
      d(setPostFormDefault(form));
    });
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};

export const createUserPost = (
  userId: string,
): ThunkAction<PromiseVoid, TAppState, {}, IPostConfigAction> => async (d: Dispatch, state: () => TAppState) => {
  const { form } = state().postConfig;
  form.post_userId = userId;

  const data = {
    title: form.post_title,
    body: form.post_body,
    userId,
  };

  const config: HttpReqCfg = {
    data,
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  try {
    d(setIsLoading(true));

    const url = API_ROUTES.createUserPost;
    const res = await httpReq<IUserPostResponseBody>(url, config);
    toast.success(`New post #${res.id} created ...`);
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};

export const updateUserPost = (
  postId: string,
): ThunkAction<PromiseVoid, TAppState, {}, IPostConfigAction> => async (d: Dispatch, state: () => TAppState) => {
  const { form } = state().postConfig;

  const data = {
    id: postId,
    title: form.post_title,
    body: form.post_body,
    userId: form.post_userId,
  };

  const config: HttpReqCfg = {
    data,
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  try {
    d(setIsLoading(true));

    const url = API_ROUTES.updateUserPost.replace('{postId}', postId);
    const res = await httpReq<IUserPostResponseBody>(url, config);
    toast.success(`Post #${res.id} updated ...`);
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};
