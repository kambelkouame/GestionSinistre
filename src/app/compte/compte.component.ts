import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  cookieValue = '';
  infoComp:any;
  etat=0

  Userdata= {
    fullName:'',
    last_name:'',
    hab:'init',
    email:'',
    password:''
   
    }

    constructor( public Api:CallApiService,public router: Router,private cookieService: CookieService) { }

    ngOnInit(){
  
      this.cookieValue = this.cookieService.get('email');
      this.compt(this.cookieValue); 
      console.warn(this.cookieValue);
      if(!this.cookieValue){
        this.router.navigateByUrl('/login')
      }

      //this.refresh(30)
  
    }
  
   
    compt(cookieValue) {
      this.Api.getCompt(this.cookieValue).subscribe(
        (data:any) => {
          console.warn(data)
          this.Userdata.email=data.user[0].email,
          this.Userdata.password=data.user[0].password,
          this.Userdata.fullName=data.user[0].fullName,
          this.Userdata.last_name=data.user[0].last_name,
          this.Userdata.hab=data.user[0].hab,
          this.infoComp=data,
          console.warn(this.Userdata.password)
        },
        err => {
          console.warn(err)
        }
      )
    }

    updateUser() {
      this.Api.updateUser(this.Userdata).subscribe(
        (data:any) => {
          console.warn(data)
        this.etat=1
        },
        err => {
         // console.error(err)
         this.etat=2
        }
      )
    }
 
   
  logout(){
    this.cookieService.delete('test');
    this.router.navigateByUrl('/login')
  
  }

  refresh(time)
  {
    setTimeout(function () { window.location.reload(); }, time*1000);
  }

}
