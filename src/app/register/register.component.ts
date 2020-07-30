import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';


@Component({

  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  info: any
  Userdata= {fullName:'', last_name:'', hab:'init', email:'', password:''}

  constructor( public Api:CallApiService,public router: Router ) {}

  addUser() {
    this.Api.register(this.Userdata).subscribe(
      (data:any) => {
        console.warn(data)
        if(data.message=="l\'utilisateur a été crée avec succes"){
          this.info=data.message;
          this.router.navigateByUrl('/compte')
          this.Userdata= {fullName:'', last_name:'', hab:'init', email:'', password:''}
          document.location.reload(true)
        }else {
         this.info=data.message;
          this.router.navigateByUrl('/compte')
        }

      },
      err => {
        console.warn(err)
      }
    )
  }
}
