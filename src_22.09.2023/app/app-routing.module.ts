import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCheckService } from './services/auth-check.service'
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/user/help-feedback/about/about.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { DashboardComponent } from './components/pages/user/dashboard/dashboard.component';
import { CourseListComponent } from './components/pages/user/course-list/course-list.component';
import { CourseDetailsComponent } from './components/pages/user/course-details/course-details.component';
import { SingleTopicComponent } from './components/pages/user/single-topic/single-topic.component';
import { QuizStartComponent } from './components/pages/user/quiz-start/quiz-start.component';
import { QuizSlideComponent } from './components/pages/user/quiz-slide/quiz-slide.component';
import { EventsResourceComponent } from './components/pages/user/events-resource/events-resource.component';
import { ResourseListComponent } from './components/pages/user/resourse-list/resourse-list.component';
import { ResourseDetailsComponent } from './components/pages/user/resourse-details/resourse-details.component';
import { MyCoursesComponent } from './components/pages/user/my-courses/my-courses.component';
import { ResultComponent } from './components/pages/user/result/result.component';
import { HelpFeedbackComponent } from './components/pages/user/help-feedback/help-feedback.component';
import { FaqComponent } from './components/pages/user/help-feedback/faq/faq.component';
import { BecomeExecutiveComponent } from './components/pages/user/help-feedback/become-executive/become-executive.component';
import { BecomeInstructorComponent } from './components/pages/user/help-feedback/become-instructor/become-instructor.component';
import { ForumListComponent } from './components/pages/user/forum-list/forum-list.component';
import { EditProfileComponent } from './components/pages/user/edit-profile/edit-profile.component';
import { NotificationComponent } from './components/pages/user/notification/notification.component';
import { ReferEarnComponent } from './components/pages/user/refer-earn/refer-earn.component';
import { AssigmentComponent } from './components/pages/user/assigment/assigment.component';
import { PricingComponent } from './components/pages/user/pricing/pricing.component';
import { SearchComponent } from './components/pages/user/search/search.component';
import { TermsComponent } from './components/pages/user/help-feedback/terms/terms.component';
import { PrivacyPolicyComponent } from './components/pages/user/help-feedback/privacy-policy/privacy-policy.component';
import { SocialMediaComponent } from './components/pages/user/help-feedback/social-media/social-media.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/pages/change-password/change-password.component';
import { CertificateComponent } from './components/pages/user/certificate/certificate.component';
import { FeedbackComponent } from './components/pages/user/help-feedback/feedback/feedback.component';
import { RecomendedCourseComponent } from './components/pages/user/recomended-course/recomended-course.component';
import { PaymentTypeComponent } from './components/pages/user/payment-type/payment-type.component';

// v2 page
import { TestPrepdetailsComponent } from './components/pages/user/testprep/test-prepdetails/test-prepdetails.component';
import { CountryComponent } from './components/pages/user/country/country.component';
import { DetailsComponent } from './components/pages/user/university/details/details.component';
import { UniversityListComponent } from './components/pages/user/university/university-list/university-list.component';
import { CountrylistComponent } from './components/pages/user/countrylist/countrylist.component';

import { CategoryComponent } from './components/pages/user/category/category.component';
import { TestprepsubjectComponent } from './components/pages/user/testprepsubject/testprepsubject.component';
import { TestpreppaperComponent } from './components/pages/user/testpreppaper/testpreppaper.component';
import { DocumentsComponent } from './components/pages/user/documents/documents.component';

import { TestprepExamsComponent } from './components/pages/user/testprep/testprep-exams/testprep-exams.component';
import { ViewResultComponent } from './components/pages/user/view-result/view-result.component';
import { EducationComponent } from './components/pages/user/documents/education/education.component';
import { WorkExperimetComponent } from './components/pages/user/documents/work-experimet/work-experimet.component';
import { DocModalComponent } from './components/pages/user/documents/doc-modal/doc-modal.component';
import { ExtracurriculamComponent } from './components/pages/user/documents/extracurriculam/extracurriculam.component';

import { MenuComponent } from './components/pages/user/menu/menu.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { FilterComponent } from './components/pages/user/filter/filter.component';
import { DetailscourseComponent } from './components/pages/user/detailscourse/detailscourse.component';
import { FilterDataComponent } from './components/pages/user/filter-data/filter-data.component';
import { ApplyComponent } from './components/pages/user/apply/apply.component';
const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthCheckService] },
  // { path: 'home', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsComponent },
  {
    path: 'user', canActivate: [AuthCheckService], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'edit_profile', component: EditProfileComponent },
      { path: 'internships', component: CourseListComponent },
      { path: 'coursedetails/:courseId', component: CourseDetailsComponent },
      { path: 'topicslide', component: SingleTopicComponent },
      { path: 'quiz/:topicId', component: QuizStartComponent },
      { path: 'quizslide/:topicId', component: QuizSlideComponent },
      { path: 'events', component: EventsResourceComponent },
      { path: 'events/resources_list', component: ResourseListComponent },
      { path: 'events/resources_details/:resourseId', component: ResourseDetailsComponent },
      { path: 'events', component: EventsResourceComponent },
      { path: 'my_course', component: MyCoursesComponent },
      { path: 'result', component: ResultComponent },
      { path: 'forum-list', component: ForumListComponent },
      { path: 'help_feedback', component: HelpFeedbackComponent },
      { path: 'help_feedback/faq', component: FaqComponent },
      { path: 'help_feedback/become_executive', component: BecomeExecutiveComponent },
      { path: 'help_feedback/become_instructor', component: BecomeInstructorComponent },
      { path: 'help_feedback/about', component: AboutComponent },
      { path: 'help_feedback/terms & conditions', component: TermsComponent },
      { path: 'help_feedback/privacy policy', component: PrivacyPolicyComponent },
      { path: 'help_feedback/social media', component: SocialMediaComponent },
      { path: 'help_feedback/feedback', component: FeedbackComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'earn_points', component: ReferEarnComponent },
      { path: 'course_assignments', component: AssigmentComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'pricing/type', component: PaymentTypeComponent },

      { path: 'search', component: SearchComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'certificate', component: CertificateComponent },
      { path: 'recomended_course', component: RecomendedCourseComponent },

      // *************************************** v2 ********************************//
      { path: 'country/:id', component: CountryComponent },
      { path: 'viewResult', component: ViewResultComponent },
      { path: 'universities', component: UniversityListComponent },
      { path: 'university/:id', component: DetailsComponent },
      { path: 'testPrep', component: TestPrepdetailsComponent },
      { path: 'testprep-exam', component: TestprepExamsComponent },
      { path: 'countrylist', component: CountrylistComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'testprepsubject', component: TestprepsubjectComponent },
      { path: 'testpreppaper', component: TestpreppaperComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'education', component: EducationComponent },
      { path: 'work', component: WorkExperimetComponent },
      { path: 'docUpload', component: DocModalComponent },
      { path: 'extraCurriculam', component: ExtracurriculamComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'detailCourse', component: DetailscourseComponent },
      { path: 'filter', component: FilterComponent },
      { path: 'filterData', component: FilterDataComponent },
      { path: 'apply', component: ApplyComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
