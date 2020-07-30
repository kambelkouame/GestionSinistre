import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-rejete',
  templateUrl: './rejete.component.html',
  styleUrls: ['./rejete.component.css']
})
export class RejeteComponent implements OnInit {


  Sinistre: any;
findSinistre:any;
info:any
cookieValue = '';
Sin:any
corps:'Bonjour Monsieur/Madame/Mademoiselle'
 loader=0; 
 message:any;
 charge=0

  constructor(public Api:CallApiService,public router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {

    this.cookieValue = this.cookieService.get('email');
    if(!this.cookieValue){
       this.router.navigateByUrl('/login')
 
     }
 
     this.loadSinistre()

  }




loadSinistre() {
  this.Api.getRejet().subscribe(
    (data:any) => {
      this.Sinistre=data
      
      console.warn(this.Sinistre)
    },
    err => {
      console.error(err)
    }
  )
}

idSinistre(id) {
  this.Api.getSinistreRejet(id).subscribe(
    (data:any) => {
      this.findSinistre=data
    //  this.Userdata.sender=data
 //   this.Sin= JSON.parse(this.findSinistre.find.Sinistre)
    console.log(this.findSinistre.find.Sinistre)
    this.Sin= JSON.parse(this.findSinistre.find.Sinistre)
    },
    err => {
      console.error(err)
    }
  )
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

logout(){
  this.cookieService.delete('test');
  this.router.navigateByUrl('/login')

}
}

