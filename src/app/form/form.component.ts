import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  title = 'fileUpload';
  images;
  multipleImages = [];
  response : any;
  cookieValue = '';
  block:any;
  requete:any;
  info:any;
  docName:any;
  etat:Boolean=false;
  UserInfo:any[];
  data:any;
  loader=0;
  numero:any;
  validate:Boolean=false;
  garanti:[];
  tab:[]
  tempArr: any = { "brands": [] };
  jQuery:any;
  upload=0
  vue=0;
  avisConstat='init'
  initialVue=0;
  token:any;
  section=0
  Userdata= {
    email:'',
    nomAssure:'',
    prenomAssure:'',
    nomConducteur:'',
    prenomConducteur:'',
    vehicule:'',
    immatriculation: '',
    assurance:'',
    description:'',
    commissariat:'',
    lieuSinistre: '',
    contactAssure:'',
    date_sinistre: '',
    status: 0,
    numeroSinistre:'',
    coordVehicule:'',
    document:'aucun',
    numeroCP:''
    }


    constructor( public Api:CallApiService,public router: Router,private cookieService: CookieService,private http: HttpClient,private route: ActivatedRoute) {

      this.route.queryParams.subscribe(params => {
        this.token = params['token'];  
    });
     }

    ngOnInit(){
      
    
  
    this.token = this.route.snapshot.paramMap.get('token');
    this.getInfo(this.token);
    console.log(this.token)
 
      }
    
      addSinistre() {
        
        this.Userdata.document= this.Userdata.email+Date.now()
        this.docName=this.Userdata.document
        this.Api.addSinistre(this.Userdata).subscribe(
          (data:any) => {
            console.log(this.Userdata)
           if(data.message=="succes"){
            console.log(data.message)
             this.info=data.message;
             this.etat=true
             this.section=1
             this.initialVue=3
             this.Userdata= {
              email:'',
              nomAssure:'',
              prenomAssure:'',
              nomConducteur:'',
              prenomConducteur:'',
              vehicule:'',
              immatriculation: '',
              assurance:'',
              lieuSinistre: '',
              contactAssure:'',
              description:'',
              date_sinistre: '',
              status: 0,
              numeroSinistre:'',
              commissariat:'',
              coordVehicule:'',
              document:'aucun',
              numeroCP:''
              }
             
              this.router.navigateByUrl('/form')
            }else {
           this.info=data.message;
           console.log(this.info)
              this.router.navigateByUrl('/form')
            }
    
          },
          err => {
            console.error(err)
          }
        )
      }
    
    
    logout(){
      this.cookieService.delete('test');
      this.router.navigateByUrl('/login')
    
    }
    
  
    selectImage(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.images = file;
      }
    }
    
    selectMultipleImage(event){
      if (event.target.files.length > 0) {
        this.multipleImages = event.target.files;
      }
    }
    
    onSubmit(){
      const formData = new FormData();
      formData.append('file', this.images);
    
      this.http.post<any>('http://localhost:3000/file', formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
    
    
    
    onMultipleSubmit(){
      const formData = new FormData();
      for(let img of this.multipleImages){
        formData.append('files', img);
        formData.append('info', this.docName);
        console.log(this.docName)
       
        //location.reload()
      }
    
      this.http.post<any>('http://localhost:3000/multipleFiles', formData).subscribe(
       (res) => {console.log(res)
         
          this.response ='le téléchargement à été éffectué';
          console.warn(this.response)
          this.loader=3
        this.upload=1
          
        
        },
        (err) =>{
          console.log(err)
          this.upload=2

        }
      );
    }


onChange(deviceValue) {

  this.UserInfo.forEach(element => {

    if(element.numeroCP==deviceValue){
      element.devis.forEach(e => {
        console.log(e.souscrit)
        this.vue=1

        if(e.souscrit==true){
          this.garanti=e.garanti
          console.log(this.garanti)
          let dateEchance={}
          let dateDebut=element.infoDevisAuto.dateDebutContrat
          dateEchance= moment(dateDebut,"DD-MM-YYYY").add(element.infoDevisAuto.duree, 'months')

          if(dateEchance>=moment()){
          console.log(element)

          this.Userdata= {
            email:element.email_client,
            nomAssure:element.infoDevisAuto.nom,
            prenomAssure:element.infoDevisAuto.prenom,
            nomConducteur:element.infoDevisAuto.nom,
            prenomConducteur:element.infoDevisAuto.prenom,
            vehicule:element.infoDevisAuto.marque,
            immatriculation:element.infoDevisAuto.immatriculation,
            assurance:e.assureur,
            description:'',
            date_sinistre: '',
            lieuSinistre: '',
            contactAssure:element.infoDevisAuto.numero,
            status: 0,
            numeroSinistre:'',
            commissariat:'',
            coordVehicule:'',
            document:'aucun',
            numeroCP:''
            }
       this.data=element.infoDevisAuto.couverture
       this.validate=true

      }
    }

    if(this.validate ==false){
      this.loader=2
    }
      });
      }

   
   });

}
changed(event){
  this.initialVue=1
}

chang(event){
  this.initialVue=2
}

getParametresRequete(requeteNavigateur)
{
 //On transforme les + en espaces
 requeteNavigateur = requeteNavigateur.split('+').join(' ');
 var parametres = {};
 var elements;
 var expressionReguliere = /[?&]?([^=]+)=([^&]*)/g;
 while (elements = expressionReguliere.exec(requeteNavigateur))
 {
 parametres[decodeURIComponent(elements[1])] = decodeURIComponent(elements[2]);
 }
 return parametres;
}


    getInfo(token) {
      console.log(token)
      this.Api.getinfo(token).subscribe(
        (data:any) => {
        console.log(data)

         if(data.message=='no autorization'){
           this.loader=10
         }else if(data.message=='decrytage error'){
          this.loader=20
         }else{
         this.UserInfo=data.Data.auto
         //this.data=data.Data.auto
         this.loader=1
         this.UserInfo.forEach(element => {
          if(element.numeroCP==this.Userdata.numeroCP){
            this.Userdata= {
              email:element.email_client,
              nomAssure:element.infoDevisAuto.nom,
              prenomAssure:element.infoDevisAuto.prenom,
              nomConducteur:element.infoDevisAuto.nom,
              prenomConducteur:element.infoDevisAuto.prenom,
              vehicule:element.infoDevisAuto.marque,
              immatriculation:element.infoDevisAuto.immatriculation,
              assurance:element.assureur,
              description:'',
              date_sinistre: '',
              lieuSinistre: '',
              contactAssure:element.infoDevisAuto.numero,
              status: 0,
              numeroSinistre:'',
              commissariat:'',
              coordVehicule:'',
              document:'aucun',
              numeroCP:''
              }

          }
         
         });

         }

         
        // 
         
       //  this.UserInfo1=data.Data.auto[1]
         // console.warn(this.UserInfo)
         
      /*  this.UserInfo.devis.forEach(element =>{
            
                if(element.souscrit==true){
               
                  let dateEchance={}
               let dateDebut=this.UserInfo.infoDevisAuto.dateDebutContrat
               
                console.warn(dateDebut.true)
                dateEchance= moment(dateDebut,"DD-MM-YYYY").add(this.UserInfo.infoDevisAuto.duree, 'months')
                   
                  if(dateEchance>=moment()){
                    this.loader=1 
                    console.warn(this.UserInfo)
                    this.Userdata= {
                      email:this.UserInfo.email_client,
                      nomAssure:this.UserInfo.infoDevisAuto.nom,
                      prenomAssure:this.UserInfo.infoDevisAuto.prenom,
                      nomConducteur:this.UserInfo.infoDevisAuto.nom,
                      prenomConducteur:this.UserInfo.infoDevisAuto.prenom,
                      vehicule:this.UserInfo.infoDevisAuto.marque,
                      immatriculation:this.UserInfo.infoDevisAuto.immatriculation,
                      assurance:element.assureur,
                      dommageApp: '',
                      TypeSinistre:'init',
                      CathSinistre:'init',
                      Sinistre:'init',
                      NbBlesse: 0,
                      NbMort: 0,
                      AvisTemoin: '',
                      NomTemoin:'',
                      ContactTemoin:'',
                      adversaire:'',
                      AssuranceAdv:'',
                      date_sinistre:'',
                      nomBlesse: '',
                      AvisRemp:'init',
                      status:0,
                      numeroSinistre:'',
                      reparation:'init',
                      document:'aucun',
                        }
                    
                  }else{
                    this.loader=2
                   
                  }
              
                   
                }else{
                
                }

          //  console.warn(element)
          } 
            )*/
         
        },
        err => {
          console.error(err)
        }
      )
    }
    
  

}
