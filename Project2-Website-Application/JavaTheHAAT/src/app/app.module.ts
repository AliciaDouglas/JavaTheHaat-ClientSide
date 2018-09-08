import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PostTemplateComponent } from './pages/post-template/post-template.component';
import { PostSummaryComponent } from './pages/post-template/post-summary/post-summary.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CraftPageComponent } from './pages/Categories/craft-page/craft-page.component';
import { HomeImprovementComponent } from './pages/Categories/home-improvement/home-improvement.component';
import { ArtPageComponent } from './pages/Categories/art-page/art-page.component';
import { FoodPageComponent } from './pages/Categories/food-page/food-page.component';
import { OutdoorsPageComponent } from './pages/Categories/outdoors-page/outdoors-page.component';
import { ElectronicsComponent } from './pages/Categories/electronics/electronics.component';
import { Material } from '../app/material';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AuthorizationService } from "./service/authorization.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistrationComponent,
    PostTemplateComponent,
    PostSummaryComponent,
    AdminComponent,
    ProfileComponent,
    HomeScreenComponent,
    CreatePostComponent,
    CraftPageComponent,
    HomeImprovementComponent,
    ArtPageComponent,
    FoodPageComponent,
    OutdoorsPageComponent,
    ElectronicsComponent,
    AdminNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    Material
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
