import { Component, OnInit, Inject } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  users: User[];
  userName: string;
  constructor(private socialAuthService: AuthService, private userService: UserService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService, private modalService: NgbModal) { }




  ngOnInit() {
    this.userName = this.storage.get('userName');
    
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
        this.userService.getUsers().subscribe(users => {
          this.users = users;
          // console.log(this.users);
          var checkAlreadyEmail;
          checkAlreadyEmail = false;
          this.users.forEach(user => {
            if (user.u_Email == userData.email) {
              checkAlreadyEmail = true;
            }
          });

          if (checkAlreadyEmail == false) {
            console.log("don't have email this go register");
            this.user = new User();
            this.user.u_Name = userData.name;
            this.user.u_Email = userData.email;
          }
          else {
            this.storage.set('userName', userData.name);
            window.location.reload();
          }
        })
      });
  }

  save(): void {
    this.userService.save(this.user).subscribe(user => {
      this.storage.set('userName', this.user.u_Name);
      window.location.reload();
    });
    // console.log(this.user);
  }



}
