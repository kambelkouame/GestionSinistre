import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  Userdata= {
    sender:'',
    receiver:'',
    objet:'',
    message:'',
    password:'08074105'

    
    }

  constructor(public Api:CallApiService,public router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  

  mail() {
    this.Api.email(this.Userdata).subscribe(
      (data:any) => {
        console.warn(data)
       if(data.message=="succes"){
        //  this.info=data.message;
          this.router.navigateByUrl('/gerer')
        }else {
       //  this.info=data.message;
          this.router.navigateByUrl('/declarer')
        }

      },
      err => {
        console.error(err)
      }
    )
  }

}
