import { Component, OnInit, Inject } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { LinkApi } from '../app.link-api';

@Component({
  selector: 'my-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  linkApi = LinkApi.link;
  picApi = LinkApi.pic;
  user: User;
  users: User[];
  userName: string;
  login = {
    email: "",
    password: ""
  }
  confirmPassword = "";

  constructor(private socialAuthService: AuthService, private userService: UserService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService, private modalService: NgbModal) { }




  ngOnInit() { 
    this.userName = this.storage.get('userName');
    // console.log(this.storage.get('userRole'));
    // console.log(this.storage.get('userId'));
    this.user = new User();
    // console.log(this.user)
  }


  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }

    if (socialPlatform == "email") {
      this.user = new User();
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.userService.getUsers().subscribe(async users => {
          // console.log(users)
          this.users = users;
          // console.log(this.users);
          var checkAlreadyEmail;
          checkAlreadyEmail = false;
          var userRole;
          var userName;
          var userPoint;
          var userId;
          this.users.forEach(async user => {
            if (user.u_Email == userData.email) {
              checkAlreadyEmail = true;
              userRole = user.u_Role;
              userId = user.u_Id;
              userName = user.u_Name;
              userPoint = user.u_Point;
            }
          });

          if (checkAlreadyEmail == false) {
            // console.log("don't have email this go register");
            await swal({
              title: 'เข้าสู่ระบบ',
              text: 'โปรดสมัครสมาชิกก่อน',
              type: 'error',
              showConfirmButton: true
            })
            this.user.u_Name = userData.name;
            this.user.u_Email = userData.email;
            let element: HTMLElement = document.getElementById('pills-Register-tab') as HTMLElement;
            element.click();
          }
          else {
            this.storage.set('userId', userId);
            this.storage.set('userName', userData.name);
            this.storage.set('userRole', userRole);
            this.storage.set('userPoint', userPoint);



            // console.log(userData)
            window.location.reload(); //test
          }
        })
      });
  }

  async save() {
    if (this.user.u_Password != this.confirmPassword) {
      await swal({
        title: 'เข้าสู่ระบบ',
        text: 'รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง',
        type: 'error',
        showConfirmButton: true
      })
    }
    else {
      this.userService.save(this.user).subscribe(async user => {
        await swal({
          title: 'สมัครสมาชิก',
          text: 'สมัครสมาชิกสำเร็จ',
          type: 'success',
          showConfirmButton: true
        })
        window.location.reload();
      });
    }

    // console.log(this.user);
  }


  test(): void {
    // console.log(this.user)
  }

  async loginBtn() {
    // console.log(this.login)

    this.userService.getUsers().subscribe(async data => {
      // console.log(data);
      // console.log(this.login);
      // console.log(" ");
      var checkEmail = false;
      data.forEach(async val => {
        if (val.u_Email == this.login.email) {
          // console.log(val.u_Email + " ==== " + this.login.email)
          checkEmail = true;
          if (val.u_Password == this.login.password) {
            // console.log(val.u_Password + " ==== " + this.login.password)
            this.storage.set('userId', val.u_Id);
            this.storage.set('userName', val.u_Name);
            this.storage.set('userRole', val.u_Role);
            this.storage.set('userPoint', val.u_Point);
            await swal({
              title: 'เข้าสู่ระบบ',
              text: 'เข้าสู่ระบบสำเร็จ',
              type: 'success',
              showConfirmButton: true
            })
            window.location.reload(); //test
          }
          else {
            // alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
            await swal({
              title: 'เข้าสู่ระบบ',
              text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
              type: 'error',
              showConfirmButton: true
            })
          }
        }

      });
      if (checkEmail == false) await swal({
        title: 'เข้าสู่ระบบ',
        text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        type: 'error',
        showConfirmButton: true
      })
    })




    // console.log()
  }



}
