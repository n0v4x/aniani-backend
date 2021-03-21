import Mp4uploadPlayerParser from "../helpers/parsers/players/Mp4uploadPlayerParser";
import Api, { ApiError } from "./Api";
import { Video } from "../helpers/utils";

export interface Mp4uploadVideo extends Video {}

export default class Mp4uploadApi extends Api {
  private _playerParser: Mp4uploadPlayerParser;

  constructor() {
    super();
    this._playerParser = new Mp4uploadPlayerParser();
  }

  public async video(playerUrl: string): Promise<Mp4uploadVideo> {
    let result: Mp4uploadVideo;

    try {
      const html = await this._fetch<string>(playerUrl);

      result = this._playerParser.parse(html);
    } catch (e) {
      throw new ApiError(e.message, "video");
    }

    return result;
  }
}
