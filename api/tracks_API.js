import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTracksById } from "#db/queries/tracks_queries";

// GET /tracks sends array of all tracks
router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

// GET /tracks/:id sends track specified by id
router.param("id", async (req, res, next, id) => {
  const track = await getTracksById(id);
  if (!track) return res.status(404).send("Track not found.");

  req.track = track; /** Creating and setting track equal to track */
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.track);
});
