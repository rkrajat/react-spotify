const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const CLIENT_ID = "e9739b5ffe8449b9b5d4e3df7116721f";

const SCOPES = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  //Listening History
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  //Spotify Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  //Playback
  "streaming",
  //Playlists
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  //Library
  "user-library-modify",
  "user-library-read",
  //Users
  "user-read-email",
  "user-read-private",
];

const authorizeAppURL = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: `${window.location.origin}/`,
    scope: encodeURIComponent(SCOPES.join(" ")),
    response_type: "token",
    state: "todoRandomlyGenerateThis",
  });
  return `${AUTH_ENDPOINT}?${params.toString()}`;
};

export default authorizeAppURL;
