import {
  EPhotoAction,
  IPhotoAction,
  IPhotoState,
  ISetPhotoLoadingAction,
  ISetUserAlbumPhotoAction,
} from '../types/photo';

const INITIAL_STATE: IPhotoState = {
  isLoading: false,
  userAlbumPhotos: [],
};

const PhotoReducer = (state = INITIAL_STATE, action: IPhotoAction): IPhotoState => {
  switch (action.type) {
    case EPhotoAction.PHOTO_SET_IS_LOADING: {
      const { isLoading } = action.payload as ISetPhotoLoadingAction;
      return { ...state, isLoading };
    }
    case EPhotoAction.PHOTO_SET_USER_ALBUM_PHOTOS: {
      const { userAlbumPhotos } = action.payload as ISetUserAlbumPhotoAction;
      return { ...state, userAlbumPhotos };
    }
    case EPhotoAction.PHOTO_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default PhotoReducer;
