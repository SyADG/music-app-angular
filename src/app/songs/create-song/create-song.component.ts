import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, formatDate } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  id: string = this.activatedRoute.snapshot.paramMap.get("id");

  validation = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(80),
  ]
  validationDate = [
    Validators.required,
    // Validators.minLength(8),
    Validators.maxLength(10)
  ]

  createSongForm = new FormGroup({
    artist: new FormGroup({
      id: new FormControl(''),
    }),
    id: new FormControl(''),
    song: new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', this.validation),
      date: new FormControl('', this.validation)
    })
  })
  constructor(
    private songService: SongService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() { }

  create() {
    // console.warn(this.createSongForm)
    this.songService.createSong(this.id, this.createSongForm).subscribe();
    this.router.navigate(['/..']);
  }

  cancel() {
    this.router.navigate(['/..']);
  }
}
