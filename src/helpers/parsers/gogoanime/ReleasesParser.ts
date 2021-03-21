import cheerio from "cheerio";
import { normalizeString } from "../../common/string";
import { Parser } from "../Parser";

export interface Release {
  id: string;
  name: string;
  img: string;
  type: string;
  episode: string;
}

export default class ReleasesParser extends Parser {
  private _formatType(type: string): string {
    return normalizeString(type).toLowerCase();
  }

  private _formatEpisode(episode: string): string {
    return normalizeString(episode.replace(/^\s*ep\s*/i, "")).toLowerCase();
  }

  private _formatName(name: string): string {
    return normalizeString(name);
  }

  private _parseId(url: string): string {
    const tokens = url.split("-");
    const result = tokens[tokens.length - 1];

    return result;
  }

  private _parseRelease($: CheerioStatic, releaseContainer: CheerioElement): Release {
    const nameContaienr = $(releaseContainer).find(".name a");

    const id = this._parseId(nameContaienr.attr("href"));
    const name = this._formatName(nameContaienr.text());
    const img = $(releaseContainer).find("img[data-src]").attr("data-src");
    const type = this._formatType($(releaseContainer).find(".type").text());
    const episode = this._formatEpisode($(releaseContainer).find(".episode").text());
    const result: Release = {
      id,
      name,
      img,
      type,
      episode,
    };

    return result;
  }

  private _parseReleases($: CheerioStatic): Release[] {
    const result: Release[] = [];

    $("li").each((_, releaseContainer) => {
      const release: Release = this._parseRelease($, releaseContainer);

      result.push(release);
    });

    return result;
  }

  public parse(html: string): Release[] {
    const $ = cheerio.load(html);
    const result = this._parseReleases($);

    return result;
  }
}
