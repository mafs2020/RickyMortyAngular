import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:3000';
  constructor() { }
}
