import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;

  commentForm: FormGroup;
  comments$: Observable<PhotoComment[]>;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getComments();
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(300)
      ])]
    });
  }

  getComments() {
    this.comments$ = this.photoService.getComments(this.photoId);
  }

  addComment() {
    const comment = this.commentForm.get('comment').value;
    this.comments$ = this.photoService
      .addComments(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(tap(() => {      
        this.commentForm.reset();
      }));
  }
}
