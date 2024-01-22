import { Track } from "./Track";

export interface DeezerApiResponse {
  data: Track[];
  total: number;
  next: string | null;
}
