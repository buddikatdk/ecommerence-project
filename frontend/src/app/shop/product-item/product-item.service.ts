import { Injectable } from '@angular/core';
import { IImage } from 'src/app/shared/models/image';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:5001/api/';

  getImages(){
    return this.http.get<IImage[]>(this.baseUrl + 'products/images');
  }
}
