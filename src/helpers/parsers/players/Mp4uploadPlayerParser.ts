import { Parser } from "../Parser";

interface VideoSrcParts {
  protocol: string;
  hostname: string;
  port: string;
  path: string;
}

enum VideoSrcPartsPos {
  Protocol = 3,
  Subdomain = 27,
  Domain = 2,
  TopLvlDomain = 1,
  Port = 56,
  Slug = 55,
  FileName = 12,
  FileExt = 25,
}

export interface Mp4uploadPlayer {
  src: string;
}

export default class Mp4uploadPlayerParser extends Parser {
  private _getRawDataParts(html: string): string[] {
    const data = (html.match(/('|")(\|com.*\|source)\1/) || [])[2];

    if (!data) throw new Error("Video parts not found in html");

    const result = data.split("|");

    return result;
  }

  private _getVideoSrcParts(rawDataParts: string[]): VideoSrcParts {
    const protocol = rawDataParts[VideoSrcPartsPos.Protocol];
    const hostname = `${rawDataParts[VideoSrcPartsPos.Subdomain]}.${
      rawDataParts[VideoSrcPartsPos.Domain]
    }.${rawDataParts[VideoSrcPartsPos.TopLvlDomain]}`;
    const port = rawDataParts[VideoSrcPartsPos.Port];
    const fileName = `${rawDataParts[VideoSrcPartsPos.FileName]}.${
      rawDataParts[VideoSrcPartsPos.FileExt]
    }`;
    const path = `${rawDataParts[VideoSrcPartsPos.Slug]}/${fileName}`;
    const result = {
      protocol,
      hostname,
      port,
      path,
    };

    return result;
  }

  private _videoSrcPartsToStr(videoSrcParts: VideoSrcParts): string {
    const result = `${videoSrcParts.protocol}://${videoSrcParts.hostname}:${videoSrcParts.port}/d/${videoSrcParts.path}`;

    return result;
  }

  private _parseVideoSrc(html: string): string {
    const rawDataParts = this._getRawDataParts(html);
    const videoSrcParts = this._getVideoSrcParts(rawDataParts);
    const result = this._videoSrcPartsToStr(videoSrcParts);

    return result;
  }

  private _parseMp4uploadPlayer(html: string): Mp4uploadPlayer {
    const src = this._parseVideoSrc(html);
    const result: Mp4uploadPlayer = {
      src,
    };

    return result;
  }

  public parse(html: string): Mp4uploadPlayer {
    const result = this._parseMp4uploadPlayer(html);

    return result;
  }

  // public async parse(url: string): Promise<Mp4uploadPlayerData> {
  //   const html = await this._fetchData(url);
  //   const videoSrc = this._parseVideoSrc(html);

  //   const result: Mp4uploadPlayerData = {
  //     src: videoSrc,
  //   };

  //   return result;
  // }
}
