import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Product } from "./product";
import { ProductService } from "./product.service";
import { CartService } from "../cart/cart.service";
import { Title } from "@angular/platform-browser";
import { LinkApi } from "../app.link-api";
import { SESSION_STORAGE, WebStorageService } from "angular-webstorage-service";
import swal from "sweetalert2";

// import { SearchProductFilterPipe } from './searchProductFilter.pipe';

@Component({
  selector: "my-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  addingProduct = false;
  error: any;
  showNgFor = false;
  inPage = 1;
  iteminPage = "10";
  iteminPageStr = "10";
  maxPage = 0;
  pageArray: number[];
  categoryBy = "";
  searchProductText = "";
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;

  userName = undefined;
  userRole = undefined;
  userId = undefined;

  listTryproduct = [];
  // this.user.userName = null;
  // this.user.userRole = null;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private titleService: Title,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.titleService.setTitle("Yaowarat101 - Products");
    this.userName = this.storage.get("userName");
    this.userRole = this.storage.get("userRole");
    this.userId = this.storage.get("userId");

    this.route.params.forEach((param: Params) => {
      if (param["category"] !== undefined) {
        this.categoryBy = param["category"];
        this.inPage = 1;
      }
    });

    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      products =>
        (this.products = products),
        // this.getPageArray()
      error => (this.error = error)
    );
  }

  // getPageArray(): void{
  //   // console.log(this.products)
  //   this.pageArray = [];
  //   // console.log(this.maxPage)
  //   let element = ((document.getElementById('itemMax') as HTMLInputElement).value);
  //   var productLength = element == '0' ? this.products.length:element;
  //   this.maxPage = Math.ceil(Number(productLength) / this.iteminPage);
  //   this.pageArray.push(1);
  //   for (let index = 2; index <= this.maxPage; index++) {
  //     this.pageArray.push(index);
  //   }
  // }

  addProduct(): void {
    if (this.addingProduct == false) {
      this.addingProduct = true;
      this.selectedProduct = null;
    } else {
      this.addingProduct = false;
    }
  }

  close(savedProduct: Product): void {
    this.addingProduct = false;
    if (savedProduct) {
      this.getProducts();
    }
    let element: HTMLElement = document.getElementById(
      "closemodalProduct"
    ) as HTMLElement;
    element.click();
  }

  async deleteProduct(product: Product) {
    await swal({
      title: "ยืนยันที่จะลบสินค้านี้?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก"
    }).then(result => {
      if (result.value) {
        this.productService.deleteProduct(product).subscribe(
          async res => {
            this.products = this.products.filter(h => h !== product);
            await swal("ลบสินค้าสำเร็จ!", "สินค้าของคุณถูกลบแล้ว.", "success");
            if (this.selectedProduct === product) {
              this.selectedProduct = null;
            }
          },
          error => (this.error = error)
        );
      }
    });
  }

  selectChange(): void {
    // this.getPageArray()
  }

  categoryChange(): void {
    if (this.categoryBy == "all") this.categoryBy = "";
    // this.getPageArray()
    this.changePage(1);
    // console.log(this.categoryBy)
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.maxPage) {
      this.inPage = page;
      window.scroll(0, 0);
    }
    // this.getPageArray()
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.addingProduct = false;
    // this.router.navigate(['/detail', this.selectedProduct.p_Id]);
  }

  async addtoCart(product: Product, id: number) {
    if (this.userId != undefined) {
      // console.log(product , id);
      this.cartService.post(product, id).subscribe(async res => {
        await swal({
          title: "ตะกร้าสินค้า",
          text: "เพิ่มในตะกร้าสินค้าสำเร็จ",
          type: "success",
          confirmButtonText: "ยืนยัน",
          backdrop: false
        });
      });
    } else {
      await swal({
        title: "เข้าสู่ระบบ",
        text: "โปรดเข้าสู่ระบบ",
        type: "error",
        showConfirmButton: true
      });
    }
  }

  counter(i: number) {
    i = Math.ceil(Number(i / Number(this.iteminPage)));
    this.maxPage = new Array(i).length;
    return new Array(i);
  }

  async clickTryproductBtn(product: Product) {
    if (this.listTryproduct.length < 5) {
      this.listTryproduct.push({ p_Id: product.p_Id, p_Name: product.p_Name });
    }

    let text = "";
    this.listTryproduct.forEach(data => {
      text += "<div>";
      text += "(" + data.p_Id + ")" + data.p_Name;
      text += "</div>";
    });
    await swal({
      position: "top-end",
      title: "รายการลองทอง",
      html: text,
      showConfirmButton: true,
      confirmButtonText: "ไปที่หน้าลองทอง",
      showCancelButton: true,
      cancelButtonText: "ลบทั้งหมด",
      showCloseButton: true,
      backdrop: false,
      width: 400
    }).then(result => {
      if (result.value) {
        this.storage.set("tryproduct", this.listTryproduct);
        if (this.categoryBy) {
          this.router.navigate(["../../tryproduct"], { relativeTo: this.route });
        } else {
          this.router.navigate(["../tryproduct"], { relativeTo: this.route });
        }
      } else {
        this.listTryproduct = [];
      }
    });
  }

  // searchTextChange(text: any): void{
  //   // this.products = this.searchProductFilter.transform(this.products, text);
  //   console.log(this.products);
  // }
}
