import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { CreatePostComponent } from './create-post/create-post.component';


export const routes: Routes = [
  {path: 'home-Screen', component: HomeScreenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'create-post', component: CreatePostComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

