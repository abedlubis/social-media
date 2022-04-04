import {
  IAlbumAction,
  EAlbumAction,
} from '../types/album';
import {
  IUserAlbumsResponseBody,
} from '../../interfaces/album';

export const setIsLoading = (isLoading: boolean): IAlbumAction => ({
  type: EAlbumAction.ALBUM_SET_IS_LOADING,
  payload: {
    isLoading,
  },
});

export const setUserAlbumData = (userAlbums: IUserAlbumsResponseBody[]): IAlbumAction => ({
  type: EAlbumAction.ALBUM_SET_USER_ALBUM,
  payload: {
    userAlbums,
  },
});

export const resetState = () => ({
  type: EAlbumAction.ALBUM_RESET_STATE,
});
