import {
  IPhotoAction,
  EPhotoAction,
} from '../types/photo';
import {
  IPhotosAlbumResponseBody,
} from '../../interfaces/photo';

export const setIsLoading = (isLoading: boolean): IPhotoAction => ({
  type: EPhotoAction.PHOTO_SET_IS_LOADING,
  payload: {
    isLoading,
  },
});

export const setUserAlbumPhotos = (userAlbumPhotos: IPhotosAlbumResponseBody[]): IPhotoAction => ({
  type: EPhotoAction.PHOTO_SET_USER_ALBUM_PHOTOS,
  payload: {
    userAlbumPhotos,
  },
});

export const resetState = () => ({
  type: EPhotoAction.PHOTO_RESET_STATE,
});
