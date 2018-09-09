import { CraftPageComponent } from './pages/Categories/craft-page/craft-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { HomeImprovementComponent} from './pages/Categories/home-improvement/home-improvement.component';
import { FoodPageComponent } from 'src/app/pages/Categories/food-page/food-page.component';
import { OutdoorsPageComponent } from 'src/app/pages/Categories/outdoors-page/outdoors-page.component';
import { ElectronicsComponent } from 'src/app/pages/Categories/electronics/electronics.component';
import { ArtPageComponent } from 'src/app/pages/Categories/art-page/art-page.component';
import { ProfileComponent } from './pages/profile/profile.component';



export const routes: Routes = [
  {path: 'home-screen', component: HomeScreenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'craft-page', component: CraftPageComponent},
  {path: 'home-improvement', component: HomeImprovementComponent},
  {path: 'food-page', component: FoodPageComponent},
  {path: 'outdoors-page', component: OutdoorsPageComponent},
  {path: 'electronics', component: ElectronicsComponent},
  {path: 'art-page', component: ArtPageComponent},
  {path: 'profile', component: ProfileComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

