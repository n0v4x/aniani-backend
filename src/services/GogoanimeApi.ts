import ReleasesParser, { Release } from "../helpers/parsers/gogoanime/ReleasesParser";
import { SeriesId, EpisodeId, ServerId, Video } from "../helpers/utils";
import EpisodesParser, { Episode } from "../helpers/parsers/gogoanime/EpisodesParser";
import Api, { ApiError } from "./Api";
import Mp4uploadApi from "./Mp4uploadApi";
import SeriesInfoParser, { SeriesInfo } from "../helpers/parsers/gogoanime/SeriesInfoParser";
import { last } from "../helpers/common/array";
import { PlayersIds } from "../helpers/utils";
import { Mp4uploadVideo } from "./Mp4uploadApi";

type Page = string | number;

interface FetchedReleasesData {
  html: string;
}

interface FetchedEpisodesData extends FetchedReleasesData {}

interface FetchedPlayerSrcData {
  target: string;
}

interface Player {
  url: string;
  serverId: ServerId;
}

export interface Series {
  id: SeriesId;
  video: Video;
  info: SeriesInfo;
  currentEpisode: Episode;
  episodes: Episode[];
}

export default class GogoanimeApi extends Api {
  public static instance: GogoanimeApi;
  private _releasesParser: ReleasesParser;
  private _episodesParser: EpisodesParser;
  private _seriesInfoParser: SeriesInfoParser;
  private _mp4upload: Mp4uploadApi;

  constructor() {
    super();
    this._releasesParser = new ReleasesParser();
    this._episodesParser = new EpisodesParser();
    this._seriesInfoParser = new SeriesInfoParser();
    this._mp4upload = new Mp4uploadApi();
  }

  public static getInstance(): GogoanimeApi {
    if (!this.instance) {
      this.instance = new GogoanimeApi();
    }

    return this.instance;
  }

  private _buildReleasesUrl(page?: Page): string {
    return `${process.env.RELEASES_SOURCE}?page=${page}`;
  }

  public async releases(page?: Page): Promise<Release[]> {
    const data = await this._fetch<FetchedReleasesData>(this._buildReleasesUrl(page));

    if (!data.html) {
      throw new Error("Releases: html not found");
    }

    const result: Release[] = this._releasesParser.parse(data.html);

    return result;
  }

  private _buildEpisodesUrl(seriesId: SeriesId): string {
    return `${process.env.EPISODES_SOURCE}/${seriesId}`;
  }

  public async episodes(seriesId: SeriesId): Promise<Episode[]> {
    let result: Episode[];

    try {
      const data = await this._fetch<FetchedEpisodesData>(this._buildEpisodesUrl(seriesId));

      if (!data.html) {
        throw new Error("html not found");
      }

      result = this._episodesParser.parse(data.html);
    } catch (e) {
      throw new ApiError(e.message, "episodes");
    }

    return result;
  }

  private _seriesInfoUrl(seriesId: SeriesId): string {
    return `${process.env.DESCRIPTION_SOURCE}/${seriesId}`;
  }

  public async seriesInfo(seriesId: SeriesId): Promise<SeriesInfo> {
    let result: SeriesInfo;

    try {
      const html = await this._fetch<string>(this._seriesInfoUrl(seriesId));

      result = this._seriesInfoParser.parse(html);
    } catch (e) {
      throw new ApiError(e.message, "series info");
    }

    return result;
  }

  private _buildPlayerSrcUrl(seriesId: SeriesId, episodeId: EpisodeId, serverId: ServerId): string {
    return `${process.env.EPISODE_SOURCE}?filmId=${seriesId}&server=${serverId}&episode=${episodeId}`;
  }

  private async _player(
    seriesId: SeriesId,
    episodeId: EpisodeId,
    serverId: ServerId
  ): Promise<Player> {
    let result: Player;

    try {
      const data = await this._fetch<FetchedPlayerSrcData>(
        this._buildPlayerSrcUrl(seriesId, episodeId, serverId)
      );

      if (!data.target) {
        throw new Error("Player: src url not found");
      }

      result = {
        url: data.target,
        serverId,
      };
    } catch (e) {
      throw new ApiError(e.message, "player");
    }

    return result;
  }

  private async _video(player: Player): Promise<Mp4uploadVideo> {
    const result = this._mp4upload.video(player.url);

    return result;
  }

  private _episodeById(episodeId: EpisodeId) {
    return (episode: Episode): boolean => episode.altId === episodeId;
  }

  public async series(seriesId: SeriesId, episodeId: EpisodeId): Promise<Series> {
    const episodes: Episode[] = await this.episodes(seriesId);
    const episode: Episode = episodes.find(this._episodeById(episodeId)) || last(episodes);
    const player: Player = await this._player(seriesId, episode.id, PlayersIds.Default);
    const video: Mp4uploadVideo = await this._video(player);
    const seriesInfo: SeriesInfo = await this.seriesInfo(seriesId);

    const result: Series = {
      id: seriesId,
      video,
      info: seriesInfo,
      currentEpisode: episode,
      episodes,
    };

    return result;
  }
}
