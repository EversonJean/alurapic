import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { NewPhoto } from '../photo/newPhoto';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: any;
  percentDone = 0;

  constructor(
    private router: Router,
    private formBuilfer: FormBuilder,
    private photoService: PhotoService,
    private alertService: AlertService,
    private userService: UserService) { }

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
    this.photoService.upload(dados)
      .pipe(finalize(() => {
        this.router.navigate(['/user', this.userService.getUserName()]);
      }))
      .subscribe((event: HttpEvent<any>) => {

        if (event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else
          if (event instanceof HttpResponse) {
            this.alertService.success('photo complete', true);
            this.router.navigate(['/user', this.userService.getUserName()]);
          }
      },
        err => {
          console.log(err);
          this.alertService.danger('Upload error!');
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
