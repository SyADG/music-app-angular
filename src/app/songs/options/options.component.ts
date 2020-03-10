import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  id: string;
  musicId: string;

  validation = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(80),
  ]
  updateSongForm = new FormGroup({
    name: new FormControl('', this.validation),
    date: new FormControl('', this.validation)
  })

  constructor(
    private songService: SongService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id1');
    this.musicId = this.activatedRoute.snapshot.paramMap.get('id2');
    this.songService.getSong(this.id, this.musicId).subscribe(
      res =>
        this.updateSongForm.patchValue({ name: res.name, date: res.date })
    )
  }
  update() {
    // let date = String(this.updateSongForm.value.date)
    // this.updateSongForm.value.date = new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`)
    // this.updateSongForm.value.date.setDate(this.updateSongForm.value.date.getDate() + 1)
    this.songService.updateSong(this.id, this.musicId, this.updateSongForm).subscribe();
    this.router.navigate(['/..']);
  }
  cancel() {
    this.location.back();
  }
  delete() {
    if (confirm(`Are you sure to delete ${this.updateSongForm.value.name}?`)) {
      this.songService.deleteSong(this.id, this.musicId).subscribe();
      this.router.navigate(['/../songs']);
    }
  }
}
