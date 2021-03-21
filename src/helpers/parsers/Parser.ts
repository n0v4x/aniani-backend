import cheerio from "cheerio";

export abstract class Parser {
  protected _loadHtml(html: string): CheerioStatic {
    return cheerio.load(html);
  }
  public abstract parse(url: string): any;
}
