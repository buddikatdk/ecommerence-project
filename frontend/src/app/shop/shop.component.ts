import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { ICategories } from '../shared/models/category';
import { IBrand } from '../shared/models/brand';
import { IImage } from '../shared/models/image';
import { ISubCategory } from '../shared/models/subcategory';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  categories: ICategories[];
  subcategories: ISubCategory[];
  images: IImage[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name : 'By Name', value: 'name'},
    {name : 'By Price', value: 'priceAsc'},
    {name : 'Price: Low to High', value: 'priceAsc'},
    {name : 'Price: High to Low', value: 'priceDesc'}
  ];


  event_list = [
    {
      event:' Event 1',
      eventLocation:'Bangalore',
      eventDescription:'In bangalore, first event is going to happen. Please be careful about it',
      img: 'https://picsum.photos/900/500?random&t=1',
      eventStartDate: new Date('2019/05/20'),
      eventEndingDate: new Date('2019/05/24')
    },
     {
      event:' Event 2',
      eventLocation:'Dubai',
      eventDescription:'Dubai is another place to host so,e, first event is going to happen. Please be careful about it',
      img: 'https://picsum.photos/900/500?random&t=3',
      eventStartDate: new Date('2019/07/28'),
      eventEndingDate: new Date('2019/07/30')
    },
     {
      event:' Event 3',
      eventLocation:'New York',
      eventDescription:'NewYork sits on top of event hosting',
      img: 'https://picsum.photos/900/500?random&t=4',
      eventStartDate: new Date('2020/05/20'),
      eventEndingDate: new Date('2020/05/24')
    },
     {
      event:' Event 4',
      eventLocation:'Singapore',
      eventDescription:'Singapore is another great hosting city',
      img: 'https://picsum.photos/900/500?random&t=6',
      eventStartDate: new Date('2018/05/20'),
      eventEndingDate: new Date('2018/05/24')
    },
    {
      event:' Event 5',
      eventLocation:'Berlin',
      eventDescription: 'Berlin is best place to hang on',
      img: 'https://picsum.photos/900/500?random&t=7',
      eventStartDate: new Date('2017/07/10'),
      eventEndingDate: new Date('2017/08/14')
    },
    {
      event:' Event 6',
      eventLocation:'Mumbai',
      eventDescription:'Mumbai is hub of startups',
      img: 'https://picsum.photos/900/500?random&t=8',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },
    {
      event:' Event 7',
      eventLocation:'Barcelona',
      eventDescription:'Barcelona is another good city',
      img: 'https://picsum.photos/900/500?random&t=6',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },
  ]

  upcoming_events =  this.event_list.filter( event => event.eventStartDate > new Date());
  past_events = this.event_list.filter(event => event.eventEndingDate < new Date());
  current_events =  this.event_list.filter( event => (event.eventStartDate >= new Date() && (event.eventEndingDate <= new Date())))


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
this.getProducts();
this.getBrands();
this.getCategories();
this.getSubCategories();
this.getProductImages();
  }

  getProducts()
  {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands()
  {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id:0, brandName:'All'},...response];
    }, error => {
      console.log(error);
    });
  }

  getCategories()
  {
    this.shopService.getCategories().subscribe(response => {
      this.categories = [{id:0, categoryName:'All'},...response];
    }, error => {
      console.log(error);
    });
  }

  getSubCategories()
  {
    this.shopService.getSubCategories().subscribe(response => {
      this.subcategories = response;
    }, error => {
      console.log(error);
    });
  }

  getProductImages()
  {
    this.shopService.getProductImages(this.shopParams.productId).subscribe(response => {
      this.images = response;
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId:number)
  {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onCategorySelected(categoryId: number)
  {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSubCategorySelected(subcategoryId: number)
  {
    this.shopParams.subCategoryId = subcategoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any)
  {
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
