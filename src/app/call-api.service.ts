import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as Rx from "rxjs/Rx";
import { Sinistre } from './sinistre';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Acteur } from './acteur';
import { Mail } from './mail';
import { NumeroCP } from './numero-cp';



@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  private apiURL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }


  public GetDeclaration(){
    return this.httpClient.get(this.apiURL);
  }


  public register(acteur : Acteur){
    return this.httpClient.post(`${this.apiURL}/register/`,acteur).
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return throwError( 'Erreur!' );
           })
        )
}



public login(acteur : Acteur){
  return this.httpClient.post(`${this.apiURL}/login/`,acteur).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}


public addSinistre(sinistre : Sinistre){
  return this.httpClient.post(`${this.apiURL}/home/auto`,sinistre).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}


public email(mail : Mail){
  return this.httpClient.post(`${this.apiURL}/sendmail`,mail).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public email1(mail : Mail){
  return this.httpClient.post(`${this.apiURL}/sendmail1`,mail).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}


public Devis(numeroCP : NumeroCP){
  return this.httpClient.post(`${this.apiURL}/findDevis`,numeroCP).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public updateUser(acteur : Acteur){
  return this.httpClient.post(`${this.apiURL}/update`,acteur).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public getinfo(token){
  console.log(token)
  return this.httpClient.get(`${this.apiURL}/sync/`+token).
      pipe(
         map((data: any) => {
           return data;
              
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}






public getSinistre(){
  return this.httpClient.get(`${this.apiURL}/auto/list`).
      pipe(
         map((data: any) => {
           return data;
            
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public getRejet(){
  return this.httpClient.get(`${this.apiURL}/auto/listRejet`).
      pipe(
         map((data: any) => {
           return data;
            
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}


public getSinistreValide(){
  return this.httpClient.get(`${this.apiURL}/auto/listValid`).
      pipe(
         map((data: any) => {
           return data;
            
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public getSinistreValid(id){
  return this.httpClient.get(`${this.apiURL}/auto/valid/`+ id).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public updateStatut(id){
  return this.httpClient.get(`${this.apiURL}/updateStatut/`+ id).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public getSinistreRejet(id){
  return this.httpClient.get(`${this.apiURL}/auto/rejet/`+ id).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}
public getUser(){
  return this.httpClient.get(`${this.apiURL}/register/list`).
      pipe(
         map((data: any) => {
           return data;

         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public getSinistreDetails(id){
  return this.httpClient.get(`${this.apiURL}/auto/list/`+ id).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public DeleteUser(id){
  return this.httpClient.get(`${this.apiURL}/deleteUser/`+ id).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}

public getCompt(email){
  return this.httpClient.get(`${this.apiURL}/findCompt/`+ email).
      pipe(
         map((data: any) => {
           return data;
         }), catchError( error => {
           return throwError( 'Erreur!' );
         })
      )
}



public downloadFile(file:String){
  var body = {filename:file};

  return this.httpClient.post(`${this.apiURL}/download`,body,{
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
  });
}

}
