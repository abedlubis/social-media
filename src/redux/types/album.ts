import { IUserAlbumsResponseBody } from '../../interfaces/album';

export enum EAlbumAction {
  ALBUM_SET_IS_LOADING = 'ALBUM_SET_IS_LOADING',
  ALBUM_SET_USER_ALBUM = 'ALBUM_SET_USER_ALBUM',
  ALBUM_RESET_STATE = 'ALBUM_RESET_STATE',
}

export interface ISetAlbumLoadingAction {
  isLoading: boolean;
}

export interface ISetUserAlbumAction {
  userAlbums: IUserAlbumsResponseBody[];
}

export type TAlbumAction =
  | ISetAlbumLoadingAction
  | ISetUserAlbumAction;

export interface IAlbumAction {
  type: EAlbumAction;
  payload: TAlbumAction;
}

export interface IAlbumState {
  userAlbums: IUserAlbumsResponseBody[];
  isLoading: boolean;
}
