import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  cookieValue = '';

  Sinistre: any;
  Sinistrefalse:any;
  length=0;
  findSinistre:any;

info:any
Sin:any
corps:'Bonjour Monsieur/Madame/Mademoiselle'
 loader=0; 
 message:any;
 charge=0


  constructor(public Api:CallApiService,public router: Router,private cookieService: CookieService ) { }

   ngOnInit() {

    this.cookieValue = this.cookieService.get('email');
    if(!this.cookieValue){
      this.router.navigateByUrl('/login')
    }

    this.loadSinistreValide()
    this.loadSinistre() 
    this.refresh(40)
}




loadSinistreValide() {
  this.Api.getSinistreValide().subscribe(
    (data:any) => {
      this.Sinistre=data

    },
    err => {
      console.error(err)
    }
  )
}


loadSinistre() {
  this.Api.getSinistre().subscribe(
    (data:any) => {
      this.Sinistrefalse=data
     
     // console.warn(this.Sinistre)
    },
    err => {
      console.error(err)
    }
  )
}

idSinistre(id) {
  this.Api.getSinistreDetails(id).subscribe(
    (data:any) => {
      this.findSinistre=data
     // this.Userdata.sender=data
 //   this.Sin= JSON.parse(this.findSinistre.find.Sinistre)
    console.log(this.findSinistre.find.Sinistre)
 //   this.Sin= JSON.parse(this.findSinistre.find.Sinistre)
    },
    err => {
      console.error(err)
    }
  )
}

logout(){
  this.cookieService.delete('email');
  this.router.navigateByUrl('/login')

}


download(){
  this.charge=1
  var filename = this.findSinistre.find.document;
  if(filename){
    this.charge=0
    this.Api.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error =>{
          if(error){
            alert('aucun ocument n\'a été importé pour ce sinistre')
          }
        }
       
    );
  }else{
    alert('aucun ocument n\'a été importé pour ce sinistre')
  }
 
}


refresh(time)
{
  setTimeout(function () { window.location.reload(); }, time*1000);
}

}
