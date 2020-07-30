import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
//import component

import { CallApiService } from './call-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { GererComponent } from './gerer/gerer.component';
import { DeclarerComponent } from './declarer/declarer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './form/form.component';
import { UploadComponent } from './upload/upload.component';
import { MailComponent } from './mail/mail.component';
import { CompteComponent } from './compte/compte.component';
import { TableComponent } from './table/table.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { LoaderComponent } from './loader/loader.component';
import { RejeteComponent } from './rejete/rejete.component';





@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    GererComponent,
    DeclarerComponent,
    LoginComponent,
    RegisterComponent,
    FormComponent,
    UploadComponent,
    MailComponent,
    CompteComponent,
    TableComponent,
    SendMailComponent,
    LoaderComponent,
    RejeteComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [CallApiService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
