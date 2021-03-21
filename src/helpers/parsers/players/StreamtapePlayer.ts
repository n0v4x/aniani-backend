import { Parser } from "../Parser";

export interface StreamtapePlayer {
  urlToVideoSrc: string;
}

export default class StreamtapePlayerParser extends Parser {
  private _normalizeUrlToVideoSrc(urlToVideoSrc: string): string {
    const result = `https:${urlToVideoSrc}`;

    return result;
  }

  private _parseUrlToVideoSrc($: CheerioStatic): string {
    const rawUrl = $("#videolink").text();
    const result = this._normalizeUrlToVideoSrc(rawUrl);

    return result;
  }

  public parse(html: string): StreamtapePlayer {
    const $ = this._loadHtml(html);
    const urlToVideoSrc = this._parseUrlToVideoSrc($);

    const result: StreamtapePlayer = {
      urlToVideoSrc,
    };

    return result;
  }
}
