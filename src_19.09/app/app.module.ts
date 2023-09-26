import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { LoginComponent } from './components/pages/login/login.component';

import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { DashboardComponent } from './components/pages/user/dashboard/dashboard.component';
import { ApiServiceService } from './services/api-service.service';

import { CarouselModule } from 'ngx-owl-carousel-o';
// Needs to import the BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from "ngx-ui-loader";
import { DashboardHeaderComponent } from './components/layouts/dashboard-header/dashboard-header.component';
import { CourseListComponent } from './components/pages/user/course-list/course-list.component';
import { CourseDetailsComponent } from './components/pages/user/course-details/course-details.component';
import { EventsResourceComponent } from './components/pages/user/events-resource/events-resource.component';
import { SingleTopicComponent } from './components/pages/user/single-topic/single-topic.component';
import { QuizStartComponent } from './components/pages/user/quiz-start/quiz-start.component';
import { QuizSlideComponent } from './components/pages/user/quiz-slide/quiz-slide.component';
import { MyCoursesComponent } from './components/pages/user/my-courses/my-courses.component';
import { ResultComponent } from './components/pages/user/result/result.component';
import { HelpFeedbackComponent } from './components/pages/user/help-feedback/help-feedback.component';
import { BecomeExecutiveComponent } from './components/pages/user/help-feedback/become-executive/become-executive.component';
import { BecomeInstructorComponent } from './components/pages/user/help-feedback/become-instructor/become-instructor.component';
import { ResourseListComponent } from './components/pages/user/resourse-list/resourse-list.component';
import { ResourseDetailsComponent } from './components/pages/user/resourse-details/resourse-details.component';
import { ForumListComponent } from './components/pages/user/forum-list/forum-list.component';
import { EditProfileComponent } from './components/pages/user/edit-profile/edit-profile.component';
import { NotificationComponent } from './components/pages/user/notification/notification.component';
import { ReferEarnComponent } from './components/pages/user/refer-earn/refer-earn.component';
import { AssigmentComponent } from './components/pages/user/assigment/assigment.component';
import { PricingComponent } from './components/pages/user/pricing/pricing.component';
import { SearchComponent } from './components/pages/user/search/search.component';
import { AboutComponent } from './components/pages/user/help-feedback/about/about.component';
import { TermsComponent } from './components/pages/user/help-feedback/terms/terms.component';
import { PrivacyPolicyComponent } from './components/pages/user/help-feedback/privacy-policy/privacy-policy.component';
import { SocialMediaComponent } from './components/pages/user/help-feedback/social-media/social-media.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/pages/change-password/change-password.component';
import { CertificateComponent } from './components/pages/user/certificate/certificate.component';
import { FeedbackComponent } from './components/pages/user/help-feedback/feedback/feedback.component'
import { MenuShowServiceService } from './services/menu-show-service.service';
import { RecomendedCourseComponent } from './components/pages/user/recomended-course/recomended-course.component';
import { PaymentTypeComponent } from './components/pages/user/payment-type/payment-type.component';
import { CountryComponent } from './components/pages/user/country/country.component';
import { TestPrepdetailsComponent } from './components/pages/user/testprep/test-prepdetails/test-prepdetails.component';
import { DetailsComponent } from './components/pages/user/university/details/details.component';
import { UniversityListComponent } from './components/pages/user/university/university-list/university-list.component';
import { CountrylistComponent } from './components/pages/user/countrylist/countrylist.component';
import { CategoryComponent } from './components/pages/user/category/category.component';
import { TestprepsubjectComponent } from './components/pages/user/testprepsubject/testprepsubject.component';
import { TestpreppaperComponent } from './components/pages/user/testpreppaper/testpreppaper.component';
import { DocumentsComponent } from './components/pages/user/documents/documents.component';
import { EducationComponent } from './components/pages/user/documents/education/education.component';
import { TestprepExamsComponent } from './components/pages/user/testprep/testprep-exams/testprep-exams.component';
import { ViewResultComponent } from './components/pages/user/view-result/view-result.component';
import { WorkExperimetComponent } from './components/pages/user/documents/work-experimet/work-experimet.component';
import { DocModalComponent } from './components/pages/user/documents/doc-modal/doc-modal.component';
// import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ExtracurriculamComponent } from './components/pages/user/documents/extracurriculam/extracurriculam.component';
import { MathRenderComponent } from '../math/math-render.component';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { GlbalServiceService } from './services/glbal-service.service';
import { MenuComponent } from './components/pages/user/menu/menu.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { FilterComponent } from './components/pages/user/filter/filter.component';
import { DetailscourseComponent } from './components/pages/user/detailscourse/detailscourse.component'

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#0a8485",
  "fgsPosition": "center-center",
  "fgsSize": 70,
  "fgsType": "square-loader",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40,40,40,0.69)",
  "pbColor": "#0a8485",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 200
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    CourseListComponent,
    CourseDetailsComponent,
    EventsResourceComponent,
    SingleTopicComponent,
    QuizStartComponent,
    QuizSlideComponent,
    MyCoursesComponent,
    ResultComponent,
    HelpFeedbackComponent,
    BecomeExecutiveComponent,
    BecomeInstructorComponent,
    ResourseListComponent,
    ResourseDetailsComponent,
    ForumListComponent,
    EditProfileComponent,
    NotificationComponent,
    ReferEarnComponent,
    AssigmentComponent,
    PricingComponent,
    SearchComponent,
    AboutComponent,
    TermsComponent,
    PrivacyPolicyComponent,
    SocialMediaComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    CertificateComponent,
    FeedbackComponent,
    RecomendedCourseComponent,
    PaymentTypeComponent,
    CountryComponent,
    TestPrepdetailsComponent,
    DetailsComponent,
    UniversityListComponent,
    CountrylistComponent,
    CategoryComponent,
    TestprepsubjectComponent,
    TestpreppaperComponent,
    DocumentsComponent,
    EducationComponent,
    TestprepExamsComponent,
    ViewResultComponent,
    WorkExperimetComponent,
    DocModalComponent,
    ExtracurriculamComponent,
    MathRenderComponent,
    MathjaxComponent,
    MenuComponent,
    WelcomeComponent,
    FilterComponent,
    DetailscourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FormsModule, HttpClientModule, ReactiveFormsModule,
    CarouselModule, BrowserAnimationsModule
  ],
  providers: [ApiServiceService, MenuShowServiceService, DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }, GlbalServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//{ provide: LocationStrategy, useClass: HashLocationStrategy }
