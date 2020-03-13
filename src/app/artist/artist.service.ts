import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Artist, RequestArtist } from './artist.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ArtistService {

  private url = "https://music-app-spring.azurewebsites.net/artists"

  private artists = new BehaviorSubject<Artist[]>([]);

  get artists$() { return this.artists.asObservable(); }

  constructor(private http: HttpClient) { }

  getArtists(): void {
    console.warn(sessionStorage.getItem('username'))
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    this.http.get<Artist[]>(this.url, {headers})
      .subscribe(response => this.artists.next(response));
  }

  createArtist(request: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(this.url + "/add", request.value);
  }

  getArtist(id: string): Observable<Artist> {
    const _url = `${this.url}/${id}`
    return this.http.get<Artist>(_url)
  }

  updateArtist(id: string, request: FormGroup): Observable<FormGroup> {
    const _url = `${this.url}/update/${id}`;
    let artist: RequestArtist = request.value;
    return this.http.put<FormGroup>(_url, artist)
  }

  deleteArtist(id: string): Observable<any>{
    const _url = `${this.url}/delete/${id}`
    return this.http.delete<any>(_url)
  }
}
