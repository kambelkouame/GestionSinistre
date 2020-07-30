import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-declarer',
  templateUrl: './declarer.component.html',
  styleUrls: ['./declarer.component.css']
})
export class DeclarerComponent  {
  title = 'fileUpload';
  images;
  multipleImages = [];
  response : any;
  cookieValue = '';
  data:any;
  block:any;
  info:any;
  vue=0
  loader=0;
  etat:Boolean=false;
  garanti:[];
  message:any;
  spinner=0;
  session=0;
  upload=0;
  initialVue=0;
  avisConstat='init';
  section=0;
  part=0
  tempArr: any = { "brands": [] };
  numeroCP={
    numeroCP:''
  }
  Userdata= {
    email:'',
    nomAssure:'',
    prenomAssure:'',
    nomConducteur:'',
    prenomConducteur:'',
    vehicule:'',
    immatriculation: '',
    lieuSinistre: '',
   contactAssure:'',
    assurance:'',
    description:'',
    date_sinistre: '',
    status: 0,
    numeroSinistre:'',
    commissariat:'',
    coordVehicule:'',
    document:'aucun',
    numeroCP:''
    }


  constructor( public Api:CallApiService,public router: Router,private cookieService: CookieService,private http: HttpClient) { }

  ngOnInit(){

    this.cookieValue = this.cookieService.get('email');
   
    if(!this.cookieValue){
      this.router.navigateByUrl('/login')
    }

  }

  addSinistre() {
    this.Userdata.email=this.Userdata.email 
    this.Userdata.document= this.Userdata.email+Date.now()
    this.info=this.Userdata.document
    console.log(this.Userdata)
    this.Api.addSinistre(this.Userdata).subscribe(
      (data:any) => {
        console.warn(data)
       if(data.message=="succes"){
          this.message=data.message;
         this.etat=true
         
        this.vue=2
        this.session=1
         this.Userdata= {
          email:'',
          nomAssure:'',
          prenomAssure:'',
          nomConducteur:'',
          prenomConducteur:'',
          vehicule:'',
          immatriculation: '',
          lieuSinistre: '',
          contactAssure:'',
          assurance:'',
          description:'',
          date_sinistre: '',
          status: 0,
          numeroSinistre:'',
          commissariat:'',
          coordVehicule:'',
          document:'aucun',
          numeroCP:''
      
          }


          this.router.navigateByUrl('/declarer')
        }else {
        this.message=data.message;
          this.router.navigateByUrl('/declarer')
        }

      },
      err => {
        console.error(err)
      }
    )
  }





  Devis() {
    this.spinner=1
    console.log(this.numeroCP)
    this.Api.Devis(this.numeroCP).subscribe(
      
      (data:any) => {
        this.vue=1
        if(data.Data.length >0 && data.Data.length !=='undefined'){
          
        data.Data.forEach(element => {
          element.devis.forEach(e => {
            if(e.souscrit==true){

              this.garanti=e.garanti
              
              let dateEchance={}
              let dateDebut=element.infoDevisAuto.dateDebutContrat
              dateEchance= moment(dateDebut,"DD-MM-YYYY").add(element.infoDevisAuto.duree, 'months')
    
              if(dateEchance>=moment()){
                this.spinner=0
                this.part=5
        this.Userdata= {
          email:element.email_client,
          nomAssure:element.infoDevisAuto.nom,
          prenomAssure:element.infoDevisAuto.prenom,
          nomConducteur:element.infoDevisAuto.nom,
          prenomConducteur:element.infoDevisAuto.prenom,
          vehicule:element.infoDevisAuto.marque,
          immatriculation:element.infoDevisAuto.immatriculation,
          assurance: e.assureur,
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
          }
        })
        })
      }else{
        this.message='no data'
        this.spinner=0
        console.log(this.message)
        location.reload()
      }
      },
      err => {
        console.error(err)
      }
    )
  }


  changed(event){
    this.initialVue=1
  }
  
  chang(event){
    this.initialVue=2
  }
logout(){
  this.cookieService.delete('email');
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
    formData.append('info', this.info);
    console.log(formData)
    //location.reload()
  }

  this.http.post<any>('http://localhost:3000/multipleFiles', formData).subscribe(
   (res) => {console.log(res)
      console.log(res.sttus)
      this.response ='le téléchargement à été éffectué';
      console.warn(this.response)
      this.message='fin'
      this.upload=1

    },
    (err) =>{
      console.log(err)
      this.upload=2
    } 
  );
}


}
