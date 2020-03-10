import { Artist } from "../artist/artist.model";

export interface RequestSong {
    name: string,
    date: Date
}
export interface Song {
    id: number,
    name: string,
    date: Date
}
export interface RequestCreateSong {
    artist: Artist;
    id: number;
    song: Song;
}