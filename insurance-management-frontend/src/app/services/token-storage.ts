import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {
  [x: string]: any;

  constructor() { }
}
