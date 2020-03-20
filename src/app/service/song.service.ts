import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Song } from '../songs/songs.model';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private url = `${environment.url}/artists/`

  private songs = new BehaviorSubject<Song[]>([]);

  get songs$() { return this.songs.asObservable(); }

  constructor(private http: HttpClient) { }

  getSongs(id: string): void {
    const songUrl = `${id}/songs`;
    const _url = `${this.url}${songUrl}`
    this.http.get<Song[]>(_url)
      .subscribe(response => this.songs.next(response));
  }

  createSong(id: String, request: FormGroup): Observable<FormGroup> {
    const songUrl = `${this.url}${id}/songs/add`;
    return this.http.post<FormGroup>(songUrl, request.value);
  }

  getSong(id: string, musicId: string): Observable<Song> {
    const songUrl = `${this.url}${id}/songs/${musicId}`;
    return this.http.get<Song>(songUrl)
  }

  updateSong(id: string, musicId: string, request: FormGroup): Observable<FormGroup> {
    const songUrl = `${this.url}${id}/songs/update/${musicId}`;
    return this.http.put<FormGroup>(songUrl, request.value);
  }

  deleteSong(id: string, musicId: string): Observable<any> {
    const songUrl = `${this.url}${id}/songs/delete/${musicId}`;
    return this.http.delete<any>(songUrl);
  }
}
