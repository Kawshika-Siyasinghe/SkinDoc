import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import {AuthConstants} from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) { }

  login(postData: { password: string; email: string }): Observable<any> {
    return this.httpService.post('login', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('signup', postData);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.userData$.next('');
      this.router.navigate(['/login']);
    });
  }

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    });
  }
}
