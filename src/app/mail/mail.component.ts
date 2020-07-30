import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  cookieValue = 'UNKNOWN';
    constructor(public Api:CallApiService,public router: Router,private cookieService: CookieService) { }

    ngOnInit(): void {
      console.warn(this.cookieValue);
      if(!this.cookieValue){
        this.router.navigateByUrl('/login')
    }
  }

    logout(){
      this.cookieService.delete('test');
      this.router.navigateByUrl('/login');

    }

}
