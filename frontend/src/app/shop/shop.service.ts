import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { ICategories } from '../shared/models/category';
import { IImage } from '../shared/models/image';
import { delay, map } from 'rxjs/operators';
import { ISubCategory } from '../shared/models/subcategory';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.categoryId !==0) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }

    if (shopParams.subCategoryId !==0) {
      params = params.append('subCategoryId', shopParams.subCategoryId.toString());
    }

    if(shopParams.search)
    {
      params = params.append('search',shopParams.search);
    }

      params = params.append('sort', shopParams.sort);
      params = params.append('pageIndex',shopParams.pageNumber.toString());
      params = params.append('pageSize',shopParams.pageSize.toString());


    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((respose) => {
          return respose.body;
        })
      );
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getCategories() {
    return this.http.get<ICategories[]>(this.baseUrl + 'products/categories');
  }

  getImages() {
    return this.http.get<IImage[]>(this.baseUrl + 'products/images');
  }

  getSubCategories() {
    return this.http.get<ISubCategory[]>(
      this.baseUrl + 'products/subcategories'
    );
  }

  getProduct(id: number)
  {
    return this.http.get<IProduct>(this.baseUrl + 'products/' +id);
  }

  getProductImages(id: number)
  {
    return this.http.get<IImage[]>(this.baseUrl + 'products/images/' +id);
  }
}
