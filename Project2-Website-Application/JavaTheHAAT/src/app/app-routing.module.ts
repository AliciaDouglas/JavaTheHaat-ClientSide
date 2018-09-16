import { VideoInfoComponent } from './pages/video-info/video-info.component';
import { ViewAllUsersComponent } from './adminPages/view-all-users/view-all-users.component';
import { ViewAllPostsComponent } from './adminPages/view-all-posts/view-all-posts.component';
import { AdminProfileComponent } from './adminPages/admin-profile/admin-profile.component';
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
import { CreateNewCategoryComponent } from './adminPages/create-new-category/create-new-category.component';
import { RegisterAdminComponent } from './adminPages/register-admin/register-admin.component';
import { AdminViewUserProfileComponent } from './pages/admin-view-user-profile/admin-view-user-profile.component';



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
  {path: 'profile', component: ProfileComponent},
  {path: 'admin-view-profile', component: AdminViewUserProfileComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'create-new-category', component: CreateNewCategoryComponent},
  {path: 'register-admin', component: RegisterAdminComponent},
  {path: 'view-all-posts', component: ViewAllPostsComponent},
  {path: 'view-all-users', component: ViewAllUsersComponent},
  {path: 'video-info/:id', component: VideoInfoComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

