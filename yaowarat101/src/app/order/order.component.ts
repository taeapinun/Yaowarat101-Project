import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './order';
import { LinkApi } from '../app.link-api';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[];
  orderlist: Order[];
  urlUpload = LinkApi.link + 'uploadorder/11';
  uploader: FileUploader = new FileUploader({ url: this.urlUpload, itemAlias: 'photoorder' });
  payment = {
    method: "",
    date: "",
    time: "",
    amount: ""
  }
  // uploader: FileUploader;

  picApi = LinkApi.pic;


  userName = undefined;
  userRole = undefined;
  userId = undefined;
  userPoint = undefined;
  selectOrderId = 0;

  constructor(private orderService: OrderService, @Inject(SESSION_STORAGE) private storage: WebStorageService,private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Yaowarat101 - Order List');
    this.orders = new Array<Order>();
    this.orderlist = new Array<Order>();
    this.userName = this.storage.get('userName');
    this.userRole = this.storage.get('userRole');
    this.userPoint = this.storage.get('userPoint');
    if (this.userRole == 'admin') {
      this.userId = '1 or 1=1';
    }
    else {
      this.userId = this.storage.get('userId');
    }
    // console.log(this.userId)

    this.orderService.getOrders(this.userId).subscribe(orders => (
      this.orders = orders,
      console.log(this.orders),
      // console.log(orders),
      this.orderService.getOrderList(this.userId).subscribe(orderlist => (
        this.orderlist = orderlist,
        this.orderlist.reverse()
      ),
        error => (console.log(error))
      )

    ),
      error => (console.log(error))
    )



    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // console.log(this.orderlist)
    // console.log(this.orders);
  }


  async reportOrder() {
    // console.log(this.selectOrderId);
    // this.uploader = new FileUploader({ url: this.urlUpload, itemAlias: 'photoorder' });
    // this.uploader = new FileUploader({ url: this.urlUpload, itemAlias: 'photoorder' });
    // this.uploader = FileUploader({url: this.urlUpload});

    /// cant work !
    // console.log(this.uploader)
    this.uploader.uploadAll();
    // console.log(this.payment)

    this.orderService.updateOrderPayment(this.payment, "รอตรวจสอบเงินเข้า", this.selectOrderId);
    
    // alert("แจ้งชำระเงินสำหรับคำสั่งซื้อ " + this.selectOrderId + " สำเร็จ")

    await swal({
      title: 'คำสั่งซื้อ',
      text: "แจ้งชำระเงินสำหรับคำสั่งซื้อ " + this.selectOrderId + " สำเร็จ",
      type: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ยืนยัน'
    })

    // this.ngOnInit();
    window.location.reload()

  }

  selectOrder(id: number): void {
    // console.log(id)
    this.selectOrderId = id;
    this.urlUpload = LinkApi.link + 'uploadorder/' + id
    this.uploader.options.url = this.urlUpload;
    // console.log(this.urlUpload)
  }

  async confirmBtn(id: number, userid: number) {
    // console.log("id = " + userid)
    
    // alert("อัพเดทสถานะรายการสินค้าสำเร็จ");
    // console.log(this.userPoint);
    
    
    const {value: number} = await swal({
      title: 'คะแนนสะสม',
      input: 'number',
      inputPlaceholder: 'กรอกคะแนนสะสม',
      type: 'info',
      showConfirmButton: true,
      confirmButtonText: 'ยืนยัน',
      showCloseButton: true
    })

    if(number){
      status = "ชำระเงินแล้ว"
      this.orderService.updateUserPoint(Number(number), userid);
      if(this.storage.get('userId') == userid){
        this.storage.set('userPoint', Number(this.userPoint)+Number(number));
      }
      this.orderService.updateStatus(status, id);
      await swal({
        title: 'คำสั่งซื้อ',
        text: 'อัพเดทสถานะรายการสินค้าสำเร็จ',
        type: 'success',
        showConfirmButton: true,
        confirmButtonText: 'ยืนยัน'
      })
      window.location.reload();
    }
    else{

    }

    // await swal({
    //   title: 'คำสั่งซื้อ',
    //   text: 'อัพเดทสถานะรายการสินค้าสำเร็จ',
    //   type: 'success',
    //   showConfirmButton: true,
    //   confirmButtonText: 'ยืนยัน'
    // })
  }

  async rejectBtn(id: number) {
    status = "ปฏิเสธคำสั่งซื้อ"
    this.orderService.updateStatus(status, id);
    // alert("อัพเดทสถานะรายการสินค้าสำเร็จ");
    await swal({
      title: 'คำสั่งซื้อ',
      text: 'อัพเดทสถานะรายการสินค้าสำเร็จ',
      type: 'error',
      showConfirmButton: true,
      confirmButtonText: 'ยืนยัน'
    })
    window.location.reload();
  }


  async updateBtn(id: number) {

    const {value: text} = await swal({
      title: 'หมายเลขพัสดุ',
      input: 'text',
      inputPlaceholder: 'กรอกรหัสในการติดตามพัสดุสินค้า',
      type: 'info',
      showConfirmButton: true,
      confirmButtonText: 'ยืนยัน',
      showCloseButton: true
    })

    if(text){
      status = "ส่งของแล้ว เลขติดตามพัสดุ: " + text
      this.orderService.updateStatus(status, id);
      await swal({
        title: 'คำสั่งซื้อ',
        text: 'อัพเดทสถานะรายการสินค้าสำเร็จ',
        type: 'success',
        showConfirmButton: true,
        confirmButtonText: 'ยืนยัน'
      })
      window.location.reload();
    }
    else{

    }
    // var tracktext = prompt("โปรดกรอกเลขสำหรับการติดตามพัสดุ", "")
    // // console.log(tracktext);
    // if (tracktext == null || tracktext == "") {

    // } else {
    //   status = "ส่งของแล้ว เลขติดตามพัสดุ: " + tracktext
    //   this.orderService.updateStatus(status, id);
    //   alert("อัพเดทสถานะรายการสินค้าสำเร็จ");
    //   window.location.reload();
    // }
  }





}
