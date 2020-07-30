import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-gerer',
  templateUrl: './gerer.component.html',
  styleUrls: ['./gerer.component.css']
})
export class GererComponent  {

Sinistre: any;
findSinistre:any;
info:any
cookieValue = '';
Sin:any
corps:'Bonjour Monsieur/Madame/Mademoiselle'
 loader=0; 
 message:any;
 charge=0;
 vue=0
Userdata1= {
  sender:'',
  receiver:'',
  objet:'',
  message: {findSinistre:this.findSinistre,message:this.corps},
  password:''
  }

Userdata= {
  sender:'',
  receiver:'',
  objet:'Déclaration de sinistre Automobile',
  message: {findSinistre:this.findSinistre,message:this.corps},
  password:'Bonjour/Bonsoir  Monsieur/Madame/Mademoiselle Vous Trouverez ci-joint les éléments relative à la déclaration de sinistre  de l\' un de vos client',
  
  }



  constructor(public Api:CallApiService,public router: Router,private cookieService: CookieService ) { }

  ngOnInit() {

    this.cookieValue = this.cookieService.get('email');
   if(!this.cookieValue){
      this.router.navigateByUrl('/login')

    }

    this.loadSinistre()
  }

  loadSinistre() {
    this.Api.getSinistre().subscribe(
      (data:any) => {
        this.Sinistre=data
        
       // console.warn(this.Sinistre)
      },
      err => {
        console.error(err)
      }
    )
  }


  change(event){

    this.vue=1
  }

  updateStatut(id) {
    this.Api.updateStatut(id).subscribe(
      (data:any) => {
    
      this.router.navigateByUrl('/gerer')
      location.reload()
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
        this.Userdata.sender=data
        this.Userdata1.receiver=this.findSinistre.find.email
   //   this.Sin= JSON.parse(this.findSinistre.find.Sinistre)
      console.log(this.findSinistre.find.Sinistre)
      this.Sin= JSON.parse(this.findSinistre.find.Sinistre)
      },
      err => {
        console.error(err)
      }
    )
  }

  mail() {
    this.loader=1
    this.Api.email(this.Userdata).subscribe(
      (data:any) => {
        console.log(data)
       if(data.message=="succes"){
         this.loader=0

        this.Userdata= {
          sender:'',
          receiver:'',
          objet:'Declaration de sinitre Automobile',
          message: {findSinistre:this.findSinistre,message:this.corps},
          password:'Bonjour/Bonsoir  Monsieur/Madame/Mademoiselle Vous Trouverez ci-joint la déclaration de sinistre  de l\' un de vos client',
          
          }
          this.message=data.message
          location.reload()
        }
      },
      err => {
        this.message='error'
        console.log('error')
      }
    )
  }


  mail1() {
    this.loader=1
    this.Api.email1(this.Userdata1).subscribe(
      (data:any) => {
       if(data.message=="succes"){
        this.loader=0

        this.Userdata1= {
          sender:'',
          receiver:'',
          objet:'Declaration de sinitre Automobile',
          message: {findSinistre:this.findSinistre,message:this.corps},
          password:'',
          
          }
       
        this.message=data.message
        location.reload()
        }
      },
      err => {
        console.error(err)
        this.message='error'  
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
      alert('aucun document n\'a été importé pour ce sinistre')
    }
   
}

}
