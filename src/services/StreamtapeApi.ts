import Api from "./Api";
import axios from "axios";
import StreamtapePlayerParser from "../helpers/parsers/players/StreamtapePlayer";
import { Video } from "../helpers/utils";

export interface StreamtapeVideo extends Video {}

export default class StreamtapeApi extends Api {
  private _playerParser: StreamtapePlayerParser;

  constructor() {
    super();
    this._playerParser = new StreamtapePlayerParser();
  }

  private async _videoSrc(urlToVideoSrc: string): Promise<string> {
    const { headers } = await axios.get(urlToVideoSrc, {
      maxRedirects: 0,
      validateStatus: (status) => status === 302,
    });

    return headers.location;
  }

  public async video(playerUrl: string): Promise<StreamtapeVideo> {
    const html = await this._fetch<string>(playerUrl);
    const player = this._playerParser.parse(html);
    const src = await this._videoSrc(player.urlToVideoSrc);

    const result: StreamtapeVideo = {
      src,
    };

    return result;
  }
}
