import { normalizeString } from "../../common/string";
import { Parser } from "../Parser";
import slugify from "slugify";
import { PlayersIds } from "../../utils";

export interface Episode {
  id: string;
  altId: string;
  name: string;
  available: boolean;
}

export default class EpisodesParser extends Parser {
  private _formatName(name: string): string {
    return normalizeString(name);
  }

  private _parseEpisode($: CheerioStatic, episodeContainer: CheerioElement): Episode {
    const id = $(episodeContainer).attr("data-name");
    const name = this._formatName($(episodeContainer).attr("data-name-normalized"));
    const altId = slugify(name);
    const serversIds = $(episodeContainer).attr("data-servers").split(",");
    const available = serversIds.includes(PlayersIds.Default.toString());
    const result: Episode = {
      id,
      altId,
      name,
      available,
    };

    return result;
  }

  private _parseEpisodes($: CheerioStatic): Episode[] {
    const result: Episode[] = [];

    $("li a[data-name]").each((_, episodeContainer) => {
      const episode = this._parseEpisode($, episodeContainer);

      result.push(episode);
    });

    return result;
  }

  public parse(html: string): Episode[] {
    const $ = this._loadHtml(html);
    const result: Episode[] = this._parseEpisodes($);

    return result;
  }
}
