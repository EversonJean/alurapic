import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingType } from './loading-type.enum';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new Subject<LoadingType>();

  getLoading() {
    return this.loadingSubject.asObservable().pipe(startWith(LoadingType.stopped));
  }

  start() {
    this.loadingSubject.next(LoadingType.loading)
  }

  stop() {
    this.loadingSubject.next(LoadingType.stopped);
  }
}
