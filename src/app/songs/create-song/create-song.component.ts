import { Component, OnInit } from '@angular/core';
import { SongService } from '../../service/song.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    Validators.maxLength(10)
  ]

  createSongForm = new FormGroup({
    name: new FormControl('', this.validation),
    date: new FormControl('', this.validation)
  })
  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() { }

  create() {
    this.songService.createSong(this.id, this.createSongForm).subscribe();
    this.router.navigate(['artist']);
  }

  cancel() {
    this.router.navigate(['artist']);
  }
}
