import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  cookieValue = '';
  User:any
  findUser:any
  habilitation=0
 
  infoComp:any
  Userdata= {
    fullName:'',
    last_name:'',
    hab:'init',
    email:'',
    password:''
   
    }
    etat=0
    constructor(public Api:CallApiService,public router: Router,private cookieService: CookieService) { }
 
  ngOnInit(){

    this.cookieValue = this.cookieService.get('email');
    if(!this.cookieValue){
      this.router.navigateByUrl('/login')
    }



 this.loadUser()
  }

  loadUser() {
    this.Api.getUser().subscribe(
      (data:any) => {
        this.User=data
        console.warn(data)
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
        location.reload()
      },
      err => {
       // console.error(err)
       this.etat=2
      }
    )
  }

  compt(email) {
    this.Api.getCompt(email).subscribe(
      (data:any) => {
        console.warn(data)
        this.Userdata.email=data.user[0].email,
        this.Userdata.password=data.user[0].password,
        this.Userdata.fullName=data.user[0].fullName,
        this.Userdata.last_name=data.user[0].last_name,
        this.infoComp=data,
        console.warn(this.infoComp)

      },
      err => {
        console.warn(err)
      }
    )
  }
  deleteUser(id) {
    this.Api.DeleteUser(id).subscribe(
      (data:any) => {
      
        //console.warn(data.message)
        this.etat==3
        location.reload()
        
      },
      err => {
      //  console.error(err)
      this.etat==4
      location.reload()
      }
    )
  }



}
