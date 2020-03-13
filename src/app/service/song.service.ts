import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Song, RequestSong, RequestCreateSong } from '../songs/songs.model';
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

  createSong(id: string, request: FormGroup): Observable<FormGroup> {
    const songUrl = `${id}/songs`;
    return this.http.post<FormGroup>(`${this.url}${songUrl}/add`, request.value);
  }

  getSong(id: string, musicId: string): Observable<Song> {
    const songUrl = `${id}/songs`;
    const _url = `${this.url}${songUrl}/${musicId}`
    return this.http.get<Song>(_url)
  }

  updateSong(id: string, musicId: string, request: FormGroup): Observable<FormGroup> {
    const songUrl = `${id}/songs`;
    const _url = `${this.url}${songUrl}/update/${musicId}`
    return this.http.put<FormGroup>(_url, request.value)
  }

  deleteSong(id: string, musicId: string): Observable<any> {
    const songUrl = `${id}/songs`;
    const _url = `${this.url}${songUrl}/delete/${musicId}`
    return this.http.delete<any>(_url)
  }
}
