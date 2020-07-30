import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { GererComponent } from './gerer/gerer.component';
import { DeclarerComponent } from './declarer/declarer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MailComponent } from './mail/mail.component';
import { CompteComponent } from './compte/compte.component';
import { FormComponent } from './form/form.component';
import { RejeteComponent } from './rejete/rejete.component';


const routes: Routes = [
  { path: 'home', component: IndexComponent },
  { path: 'gerer', component: GererComponent },
  { path: 'declarer', component: DeclarerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mail', component: MailComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'form/:token', component: FormComponent },
  { path: 'rejete', component: RejeteComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
