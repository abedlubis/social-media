import { Dispatch } from 'redux';
import { batch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { PromiseVoid } from '../interfaces';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import { ICommentConfigAction, ICommentForm } from '../redux/types/commentConfig';
import {
  setCommentForm,
  setCommentFormDefault,
  setIsLoading,
} from '../redux/actions/commentConfig';
import {
  setErrorStatus,
} from '../redux/actions/app';
import {
  IPostCommentsResponseBody,
} from '../interfaces/post';
import {
  API_ROUTES,
} from '../constants';

export const getPostComment = (
  commentId: string,
): ThunkAction<PromiseVoid, TAppState, {}, ICommentConfigAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };

  try {
    d(setIsLoading(true));

    const url = API_ROUTES.getCommentById.replace('{commentId}', commentId);
    const res = await httpReq<IPostCommentsResponseBody[]>(url, config);

    const form: ICommentForm = {
      comment_postId: res[0].postId.toString(),
      comment_body: res[0].body,
      comment_email: res[0].email,
      comment_name: res[0].name,
    };

    batch(() => {
      d(setCommentForm(form));
      d(setCommentFormDefault(form));
    });
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};

export const createPostComment = (
  postId: string,
): ThunkAction<PromiseVoid, TAppState, {}, ICommentConfigAction> => async (d: Dispatch, state: () => TAppState) => {
  const { form } = state().commentConfig;
  form.comment_postId = postId;

  const data = {
    name: form.comment_name,
    body: form.comment_body,
    email: form.comment_email,
    postId: form.comment_postId,
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

    const url = API_ROUTES.createPostComment;
    const res = await httpReq<IPostCommentsResponseBody>(url, config);
    toast.success(`New post #${res.id} created ...`);
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};

export const updatePostComment = (
  commentId: string,
): ThunkAction<PromiseVoid, TAppState, {}, ICommentConfigAction> => async (d: Dispatch, state: () => TAppState) => {
  const { form } = state().commentConfig;

  const data = {
    id: commentId,
    name: form.comment_name,
    email: form.comment_email,
    body: form.comment_body,
    userId: form.comment_postId,
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

    const url = API_ROUTES.updatePostComment.replace('{commentId}', commentId);
    const res = await httpReq<IPostCommentsResponseBody>(url, config);
    toast.success(`Comment #${res.id} updated ...`);
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};

export const deletePostComment = (
  commentId: string,
): ThunkAction<PromiseVoid, TAppState, {}, ICommentConfigAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'DELETE',
  };

  try {
    d(setIsLoading(true));
    const url = API_ROUTES.deletePostComment.replace('{commentId}', commentId);
    await httpReq(url, config);

    toast.success(`Comment #${commentId} successfully deleted ...`);
  } catch (err: any) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};
