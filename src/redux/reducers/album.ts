import {
  EAlbumAction,
  IAlbumAction,
  ISetAlbumLoadingAction,
  ISetUserAlbumAction,
  IAlbumState,
} from '../types/album';

const INITIAL_STATE: IAlbumState = {
  userAlbums: [],
  isLoading: false,
};

const AlbumReducer = (state = INITIAL_STATE, action: IAlbumAction): IAlbumState => {
  switch (action.type) {
    case EAlbumAction.ALBUM_SET_IS_LOADING: {
      const { isLoading } = action.payload as ISetAlbumLoadingAction;
      return { ...state, isLoading };
    }
    case EAlbumAction.ALBUM_SET_USER_ALBUM: {
      const { userAlbums } = action.payload as ISetUserAlbumAction;
      return { ...state, userAlbums };
    }
    case EAlbumAction.ALBUM_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default AlbumReducer;
