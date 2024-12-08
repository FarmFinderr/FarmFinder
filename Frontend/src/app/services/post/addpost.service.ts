import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddpostService {

  private postAddedSource = new Subject<void>();
  postAdded$ = this.postAddedSource.asObservable();

  notifyPostAdded() {
    this.postAddedSource.next();
  }
}
