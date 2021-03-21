import { normalizeString } from "../../common/string";
import { Parser } from "../Parser";

export interface SeriesInfo {
  img: string;
  name: string;
  genres: string[];
  date: SeriesInfoDate;
  status: string;
}

export interface SeriesInfoDate {
  start: string | null;
  end: string | null;
}

export default class SeriesInfoParser extends Parser {
  private _parseGenres($: CheerioStatic, genresContainer: Cheerio): string[] {
    const result = [];

    if (genresContainer.length !== 0) {
      $(genresContainer)
        .find("a")
        .each((_, genreContainer) => {
          const genre = $(genreContainer).text();

          result.push(genre);
        });
    }

    return result;
  }

  private _formatDate(date: string): string {
    return new Date(date).toJSON();
  }

  private _parseDate(dateContainer: Cheerio): SeriesInfoDate {
    const result: SeriesInfoDate = {
      start: null,
      end: null,
    };

    if (dateContainer.length !== 0) {
      const rawDates = (dateContainer[0].next.data || "").split("to");

      result.start = this._formatDate(rawDates[0]);
      result.end = this._formatDate(rawDates[1]);
    }

    return result;
  }

  private _parseStatus(statusContainer: Cheerio): string {
    let result = "";

    if (statusContainer.length !== 0 && statusContainer[0].next.data !== undefined) {
      result = normalizeString(statusContainer[0].next.data);
    }

    return result;
  }

  private _parseSeriesInfo($: CheerioStatic): SeriesInfo {
    const img = $(".thumnail_tool img").attr("src") || "";
    const name = normalizeString($(".bigChar").text());

    const dataContainers = $(".type");
    const dateContainer = dataContainers.find("span:contains('Date aired')");
    const genresContainer = dataContainers.has("span:contains('Genre')");
    const statusContainer = dataContainers.find("span:contains('Status')");

    const date: SeriesInfoDate = this._parseDate(dateContainer);
    const genres = this._parseGenres($, genresContainer);
    const status = this._parseStatus(statusContainer);

    const result: SeriesInfo = {
      img,
      name,
      genres,
      date,
      status,
    };

    return result;
  }

  public parse(html: string): SeriesInfo {
    const $ = this._loadHtml(html);
    const result: SeriesInfo = this._parseSeriesInfo($);

    return result;
  }
}
