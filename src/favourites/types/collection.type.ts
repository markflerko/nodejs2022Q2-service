export const ARTIST = 'artists';
export const TRACK = 'tracks';
export const ALBUM = 'albums';

export type CollectionType = typeof ARTIST | typeof TRACK | typeof ALBUM;

export const ARTIST_SERVICE = 'artistService';
export const TRACK_SERVICE = 'trackService';
export const ALBUM_SERVICE = 'albumService';

export const getMappedService = (collection: CollectionType) => {
  switch (collection) {
    case ARTIST:
      return ARTIST_SERVICE;
    case TRACK:
      return TRACK_SERVICE;
    case ALBUM:
      return ALBUM_SERVICE;
  }
};
