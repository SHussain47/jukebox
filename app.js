import express from "express";
const app = express();
export default app;

import morgan from "morgan";

import tracksRouter from "./api/tracks_API.js";
import playlistsRouter from "./api/playlists_API.js";
import ptRouter from "./api/playlists_tracks_API.js";

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.send(`
    <h1>🎧 Jukebox API</h1>
    <p>Available endpoints:</p>
    <ul>
      <li><a href="/tracks">GET /tracks</a></li>
      <li><a href="/playlists">GET /playlists</a></li>
      <li>GET /playlists_tracks</li>
    </ul>
  `);
});

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);
app.use("/playlists_tracks", ptRouter);

//ToDo: Error handler
