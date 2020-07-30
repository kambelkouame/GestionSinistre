import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
info: any
  Userdata= {fullName:'',last_name:'',hab:'',email:'', password:''}
  cookieValue = '';
  constructor(public Api:CallApiService,public router: Router,private cookieService: CookieService  ) {}

  ngOnInit(){
      
    this.cookieValue = this.cookieService.get('email');
    
    if(this.cookieValue){
      this.router.navigateByUrl('/home')
    }
       

 
      }

  login() {
    this.Api.login(this.Userdata).subscribe(
      (data:any) => {
        if(data.message=="welcome"){
          this.cookieService.set( 'email', this.Userdata.email );
            
          this.info=data.message;
          this.router.navigateByUrl('/home')
        }else {
         this.info=data.message;
          this.router.navigateByUrl('/login')
        }

      },
      err => {
        console.warn(err)
      }
    )
  }

}
