export type SeriesId = string | number;
export type EpisodeId = string | number;
export type ServerId = string | number;

export enum PlayersIds {
  Mp4upload = 35,
  Streamtap = 40,
  Default = PlayersIds.Mp4upload,
}

export interface Video {
  src: string;
}
