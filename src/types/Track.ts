import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
  id: number;
  title: string;
  album: Album;
  artist: Artist;
  duration: number;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: boolean;
  link: string;
  md5_image: string;
  preview: string;
  rank: number;
  readable: boolean;
  title_short: string;
  title_version: string;
  type: string;
}
