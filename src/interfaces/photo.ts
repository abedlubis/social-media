export interface IPhotoParams {
  albumId: string;
}

export interface IPhotosAlbumResponseBody {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
