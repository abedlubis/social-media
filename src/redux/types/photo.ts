import { IPhotosAlbumResponseBody } from '../../interfaces/photo';

export enum EPhotoAction {
  PHOTO_SET_IS_LOADING = 'PHOTO_SET_IS_LOADING',
  PHOTO_SET_USER_ALBUM_PHOTOS = 'PHOTO_SET_USER_ALBUM_PHOTOS',
  PHOTO_RESET_STATE = 'PHOTO_RESET_STATE',
}

export interface ISetPhotoLoadingAction {
  isLoading: boolean;
}

export interface ISetUserAlbumPhotoAction {
  userAlbumPhotos: IPhotosAlbumResponseBody[];
}

export type TPhotoAction =
  | ISetPhotoLoadingAction
  | ISetUserAlbumPhotoAction;

export interface IPhotoAction {
  type: EPhotoAction;
  payload: TPhotoAction;
}

export interface IPhotoState {
  isLoading: boolean;
  userAlbumPhotos: IPhotosAlbumResponseBody[];
}
