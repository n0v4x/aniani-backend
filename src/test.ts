import dotenv from "dotenv";

dotenv.config();
import * as fs from "fs";

import StreamtapePlayer from "./helpers/parsers/players/StreamtapePlayer";
import Mp4uploadPlayer from "./helpers/parsers/players/Mp4uploadPlayerParser";
import GogoanimeDescription from "./helpers/parsers/gogoanime/SeriesInfoParser";
import GogoanimeReleases from "./helpers/parsers/gogoanime/ReleasesParser";
import GogoanimeEpisodes from "./helpers/parsers/gogoanime/EpisodesParser";
import GogoanimeApi from "./services/GogoanimeApi";

const player = fs.readFileSync("./data-examples/player-info.html", "utf-8");
const description = fs.readFileSync("./data-examples/description.html", "utf-8");
const releases = fs.readFileSync("./data-examples/list-of-anime.html", "utf-8");
const episodes = fs.readFileSync("./data-examples/list-of-episodes.html", "utf-8");

// const mp4uploadPlayerParser = new Player();
const descriptionParser = new GogoanimeDescription();
const releasesParser = new GogoanimeReleases();
const episodesParser = new GogoanimeEpisodes();

const mp4uploadPlayerParser = new Mp4uploadPlayer();
const streamTypePlayerParser = new StreamtapePlayer();

const api = GogoanimeApi.getInstance();

(async () => {
  // console.log(await api.releases());
  // console.log(await api.episodes("ylqx"));
  // console.log(await api.series("ylqx", "2"));
})();

// console.log(releasesParser.parse(releases));
// console.log(episodesParser.parse(episodes));
// console.log(descriptionParser.parse(description));
