import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  // 1) 20 tracks
  await db.query(`
    INSERT INTO tracks (name, duration_ms) VALUES
      ('Blinding Lights',          200040),
      ('Watermelon Sugar',         174000),
      ('Levitating',               203880),
      ('Good 4 U',                 178560),
      ('Stay',                     141840),
      ('Heat Waves',               238560),
      ('Peaches',                  198000),
      ('Drivers License',          242040),
      ('Industry Baby',            212160),
      ('Bad Habits',               231840),
      ('Shivers',                  204720),
      ('Montero',                  137280),
      ('Kiss Me More',             174720),
      ('Beggin',                   140640),
      ('Astronaut in the Ocean',   132960),
      ('Save Your Tears',          215640),
      ('Deja Vu',                  215880),
      ('Leave the Door Open',      251880),
      ('Fancy Like',               130320),
      ('Thats What I Want',        177840)
    ON CONFLICT DO NOTHING
  `);

  // 2) 10 playlists
  await db.query(`
    INSERT INTO playlists (name, description) VALUES
      ('Morning Workout',     'High-energy songs to start the day'),
      ('Chill Vibes',         'Relax and unwind'),
      ('Road-Trip Hits',      'Sing-along classics'),
      ('Top 2021',            'Biggest songs of the year'),
      ('Pop Essentials',      'Must-have pop tracks'),
      ('Work-from-Home Flow', 'Background beats'),
      ('Party Starters',      'Get the crowd moving'),
      ('Late-Night Mood',     'After-dark atmosphere'),
      ('Study Beats',         'Focus-friendly tunes'),
      ('Feel-Good Favorites', 'Instant mood boost')
    ON CONFLICT DO NOTHING
  `);

  // 3) link 15 songs to playlists
  await db.query(`
    WITH 
      morning AS (SELECT id FROM playlists WHERE name='Morning Workout' LIMIT 1),
      chill   AS (SELECT id FROM playlists WHERE name='Chill Vibes' LIMIT 1),
      road    AS (SELECT id FROM playlists WHERE name='Road-Trip Hits' LIMIT 1),
      pop     AS (SELECT id FROM playlists WHERE name='Pop Essentials' LIMIT 1),
      party   AS (SELECT id FROM playlists WHERE name='Party Starters' LIMIT 1),
      study   AS (SELECT id FROM playlists WHERE name='Study Beats' LIMIT 1),
      feel    AS (SELECT id FROM playlists WHERE name='Feel-Good Favorites' LIMIT 1),
      top21   AS (SELECT id FROM playlists WHERE name='Top 2021' LIMIT 1)

  INSERT INTO playlists_tracks (playlist_id, track_id)
  SELECT pairs.playlist_id, pairs.track_id
  FROM (VALUES
    ( (SELECT id FROM morning), (SELECT id FROM tracks WHERE name='Blinding Lights' LIMIT 1) ),
    ( (SELECT id FROM morning), (SELECT id FROM tracks WHERE name='Watermelon Sugar' LIMIT 1) ),
    ( (SELECT id FROM morning), (SELECT id FROM tracks WHERE name='Industry Baby' LIMIT 1) ),
    ( (SELECT id FROM chill),   (SELECT id FROM tracks WHERE name='Heat Waves' LIMIT 1) ),
    ( (SELECT id FROM chill),   (SELECT id FROM tracks WHERE name='Save Your Tears' LIMIT 1) ),
    ( (SELECT id FROM road),    (SELECT id FROM tracks WHERE name='Levitating' LIMIT 1) ),
    ( (SELECT id FROM road),    (SELECT id FROM tracks WHERE name='Peaches' LIMIT 1) ),
    ( (SELECT id FROM pop),     (SELECT id FROM tracks WHERE name='Good 4 U' LIMIT 1) ),
    ( (SELECT id FROM pop),     (SELECT id FROM tracks WHERE name='Deja Vu' LIMIT 1) ),
    ( (SELECT id FROM party),   (SELECT id FROM tracks WHERE name='Stay' LIMIT 1) ),
    ( (SELECT id FROM party),   (SELECT id FROM tracks WHERE name='Montero' LIMIT 1) ),
    ( (SELECT id FROM study),   (SELECT id FROM tracks WHERE name='Drivers License' LIMIT 1) ),
    ( (SELECT id FROM study),   (SELECT id FROM tracks WHERE name='Kiss Me More' LIMIT 1) ),
    ( (SELECT id FROM feel),    (SELECT id FROM tracks WHERE name='Shivers' LIMIT 1) ),
    ( (SELECT id FROM top21),   (SELECT id FROM tracks WHERE name='Bad Habits' LIMIT 1) )
  ) AS pairs(playlist_id, track_id)
  ON CONFLICT DO NOTHING
`);
}
