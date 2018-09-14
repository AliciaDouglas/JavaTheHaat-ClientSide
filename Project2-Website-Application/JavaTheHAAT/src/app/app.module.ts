import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CraftPageComponent } from './pages/Categories/craft-page/craft-page.component';
import { HomeImprovementComponent } from './pages/Categories/home-improvement/home-improvement.component';
import { ArtPageComponent } from './pages/Categories/art-page/art-page.component';
import { FoodPageComponent } from './pages/Categories/food-page/food-page.component';
import { OutdoorsPageComponent } from './pages/Categories/outdoors-page/outdoors-page.component';
import { ElectronicsComponent } from './pages/Categories/electronics/electronics.component';
import { Material } from '../app/material';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';
import { UploadFileService } from './services/upload-file.service';
import { SafePipe } from './pipes/safe.pipe';
import { ViewAllPostsComponent } from 'src/app/adminPages/view-all-posts/view-all-posts.component';
import { RegisterAdminComponent } from 'src/app/adminPages/register-admin/register-admin.component';
import { CreateNewCategoryComponent } from 'src/app/adminPages/create-new-category/create-new-category.component';
import { ViewAllUsersComponent } from 'src/app/adminPages/view-all-users/view-all-users.component';
import { AdminProfileComponent } from 'src/app/adminPages/admin-profile/admin-profile.component';
import { CognitoService } from './services/cognito.service';
import { UsersService } from './services/users.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    HomeScreenComponent,
    CreatePostComponent,
    CraftPageComponent,
    HomeImprovementComponent,
    ArtPageComponent,
    FoodPageComponent,
    OutdoorsPageComponent,
    ElectronicsComponent,
    AdminNavBarComponent,
    UserNavBarComponent,
    SafePipe,
    ViewAllPostsComponent,
    RegisterAdminComponent,
    CreateNewCategoryComponent,
    ViewAllUsersComponent,
    AdminProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    Material,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [UploadFileService, SafePipe, CognitoService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
