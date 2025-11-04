import db from "#db/client";

// GET /tracks sends array of all tracks
export async function getTracks() {
  try {
    const sql = `
      SELECT * FROM tracks;
    `;
    const { rows: tracks } = await db.query(sql);
    return tracks;
  } catch (error) {
    console.error("Error with getTracks query: ", error);
    throw error;
  }
}

// GET /tracks/:id sends track specified by id
export async function getTracksById(id) {
  try {
    const sql = `
      SELECT * 
      FROM tracks
      WHERE id = $1
    `;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows[0];
  } catch (error) {
    console.error("Error with getTracksById query: ", error);
    throw error;
  }
}
