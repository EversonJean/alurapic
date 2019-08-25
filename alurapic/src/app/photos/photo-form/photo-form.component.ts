import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { NewPhoto } from '../photo/newPhoto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private formBuilfer: FormBuilder,
    private photoService: PhotoService,
    private router: Router) { }

  ngOnInit() {
    this.photoForm = this.formBuilfer.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    let dados = this.photoForm.getRawValue() as NewPhoto;
    dados.file = this.file;
    this.photoService.upload(dados).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  handleFile() {
    if (event) {
      this.file = event.target['files'][0];

      const reader = new FileReader();
      reader.onload = res => this.preview = res.target['result'];
      reader.readAsDataURL(this.file);
    }
  }
}
