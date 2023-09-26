import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnyARecord } from 'dns';

var addUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private header;
  constructor(private _http: HttpClient, private _router: Router) {
    this.header = new HttpHeaders()
    // .set("Authorization", 'Bearer ')
    //.set("Accept","application/json");
    this.header.append('Access-Control-Allow-Origin', '*');
    this.header.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  }



  // Checking the Authentication for User
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }


  /*     *************** Higher education list ************** */
  // higherEducationList(){
  //   return this._http.get<any>(addUrl + 'higher-education');
  // }

  // get college name
  getCollageName() {
    return this._http.get<any>(addUrl + 'fetchCollegesData');
  }

  getcountry() {
    return this._http.get<any>(addUrl + 'fetchCountries');
  }


  /*      *************** Register Sec Start ************** */
  registerUser(formData: any) {
    return this._http.post<any>(addUrl + 'userRegistration', formData);
  }

  /*      *************** Login Sec Start ************** */
  logInUser(formData: any) {
    return this._http.post<any>(addUrl + 'userLogin', formData);
  }

  /*      *************** forget password Sec Start ************** */
  forgetPassword(formData: any) {
    return this._http.post<any>(addUrl + 'UserForgotPassword  ', formData);
  }

  /*      *************** change password Sec Start ************** */
  changePassword(formData: any) {
    return this._http.post<any>(addUrl + 'UserChangePassword  ', formData);
  }

  /*      *************** login using google ************** */
  socialLogin(socialData: any) {
    return this._http.post<any>(addUrl + 'socialLogin', socialData);
  }
  /*      *************** get team list ************** */
  viewTeam(user_id: any) {
    return this._http.get<any>(addUrl + 'userMembers/' + user_id, { headers: this.header });
  }

  /*      *************** add team  ************** */
  createTeam(teamData: any) {
    return this._http.post<any>(addUrl + 'addUserMember', teamData, { headers: this.header });
  }

  /*     *************** get Home page data ************** */
  gethomePageData() {
    return this._http.get<any>(addUrl + 'fetchHomePageData');
  }

  /*     *************** Profile Details ************** */
  prfileUser(userId: any) {
    return this._http.get<any>(addUrl + 'userDetails/' + userId);
  }

  /*     *************** Profile Update ************** */
  prfileUpdate(formData: any) {
    return this._http.post<any>(addUrl + 'updateUserProfile', formData);
  }

  profileImage(formData: any) {
    return this._http.post<any>('https://backend.proueducation.com/admin/api/uploadProfileImage', formData);
  }

  /*     *************** Course with Category ************** */
  categoryWithCourseList() {
    return this._http.get<any>(addUrl + 'fetchHomePageData');
  }

  /*     *************** Course List ************** */
  courseList() {
    return this._http.get<any>(addUrl + 'fetchCoursePageData');
  }

  /*     *************** Course details ************** */
  courseDetailsList(id: number, userId: number) {
    return this._http.get<any>(addUrl + 'fetchCourseDetails/' + id + '/' + userId);
  }

  // getModelList(){
  //   return this._http.get<any>(addUrl + 'pro-course/module')
  // }

  /*     *************** Event List ************** */
  geteventList() {
    return this._http.get<any>(addUrl + 'fetchEvents');
  }
  /*     *************** Sign Up event ************** */
  signUpEvent(formData: any) {
    return this._http.post<any>(addUrl + 'eventSignup', formData);
  }

  /*     *************** Resources List ************** */
  getResourcesList() {
    return this._http.get<any>(addUrl + 'allResources');
  }

  /*     *************** Save Assignments ************** */
  saveAssignment(formData: any) {
    return this._http.post<any>(addUrl + 'saveAssignments', formData);
  }

  /*     *************** Quiz List ************** */
  getQuizTopicWise(topicId: number) {
    return this._http.get<any>(addUrl + 'fetchTopicQuestions/' + topicId);
  }

  /*     *************** Submit answers ************** */
  submitQuestionAns(quesData: any) {
    return this._http.post<any>(addUrl + 'submitAnswers', quesData);
  }

  /*     *************** Submit Topics ************** */
  submitTopics(topicsData: any) {
    return this._http.post<any>(addUrl + 'addUserCourseTopic', topicsData);
  }

  /*     *************** Submit Course ************** */
  submitCourse(courseData: any) {
    return this._http.post<any>(addUrl + 'addUserCourse', courseData);
  }

  /*     *************** get course by user ************** */
  getUserCourse(user_id: number) {
    return this._http.get<any>(addUrl + 'userCourses/' + user_id);
  }



  // Forum
  /*     *************** Add Forum ************** */
  addForum(forumData: any) {
    return this._http.post<any>(addUrl + 'createForumQuestion', forumData);
  }
  /*     *************** get Forum data of an user ************** */
  getForumDataByUser(user_id: number) {
    return this._http.get<any>(addUrl + 'userForumQuestions/' + user_id);
  }
  /*     *************** edit forum by user ************** */
  editForum(forumData: any) {
    return this._http.post<any>(addUrl + 'updateForumQuestion', forumData);
  }
  /*     *************** delete forum by user ************** */
  deleteForum(forum_id: number) {
    return this._http.get<any>(addUrl + 'deleteForumQuestion/' + forum_id);
  }

  // Topic Answer
  /*     *************** Add Topic answer ************** */
  addTopicAnswer(topicData: object) {
    return this._http.post<any>(addUrl + 'createTopicAnswer', topicData);
  }
  editTopicAns(edittopicData: object) {
    return this._http.post<any>(addUrl + 'updateTopicAnswer', edittopicData);
  }
  /*     *************** Delete Topic answer ************** */
  deleteTopicAnswer(answerId: number) {
    return this._http.get<any>(addUrl + 'deleteTopicAnswer/' + answerId);
  }


  // Help & FeedBack 

  /*     *************** Submit for become a instructor ************** */
  submitInstructorData(instructorData: any) {
    return this._http.post<any>(addUrl + 'requestToBecomeInstructor', instructorData);
  }

  /*     *************** Submit for become a executive ************** */
  submitExecutiveForm(executiveData: any) {
    return this._http.post<any>(addUrl + 'requestToBecomeExecutive', executiveData);
  }

  /*     *************** get notifications ************** */
  notificationList(userId: number) {
    return this._http.get<any>(addUrl + 'getUserNotifications/' + userId);
  }

  /*     *************** get package ************** */
  getPackageList() {
    return this._http.get<any>(addUrl + 'getPackages');
  }

  /*     *************** add package after payment ************** */
  addPackage(paymentData: object) {
    return this._http.post<any>(addUrl + 'subscribePackage', paymentData);
  }

  /*     *************** search course/events ************** */
  searchData(searchData: any) {
    return this._http.post<any>(addUrl + 'searchData', searchData);
  }

  /*     *************** Get points ************** */
  getPoints(userId: number) {
    return this._http.get<any>(addUrl + 'getUserPoints/' + userId);
  }

  /*     *************** Certificate ************** */
  certificateList(userId: string) {
    return this._http.get<any>(addUrl + 'fetchUserCertificates/' + userId);
  }

  /*     *************** Feedback ************** */
  submitFeedbackForm(formData: any) {
    return this._http.post<any>(addUrl + 'userFeedback', formData);
  }
  /*     *************** Pricing ************** */
  budPayIntegration(budPayData: any) {
    return this._http.post<any>(addUrl + 'initiateBudpayWeb', budPayData);
  }

  // Logging Out the Current User
  logoutUser(): void {
    localStorage.clear();
    // window.location.href = environment.projectPath;
    this._router.navigate(['/welcome']);
    // location.reload();
  }




  // ********************************* version 2 api ***********************************//
  //get Country list
  getCountryList() {
    return this._http.get<any>(addUrl + 'countryList');
  }

  //get Country details
  countryDetails(country_id: any) {
    return this._http.get<any>(addUrl + `countryDetails/${country_id}`);
  }

  //get university list
  getuniversityList() {
    return this._http.get<any>(addUrl + 'universityList');
  }

  //get university details
  universityDetails(university_id: any) {
    return this._http.get<any>(addUrl + `universityDetails/${university_id}`);
  }

  //get course details
  universityCourseDetails(course_id: any) {
    return this._http.get<any>(addUrl + `universityCourseDetails/${course_id}`);
  }


  ////////////////// Test Prep ////////////////////
  //get Test prep Subject
  getTestExamList() {
    return this._http.get<any>(addUrl + `examList`);
  }
  //get Test question
  getTestQuestion(data: any) {
    return this._http.post<any>(addUrl + `subjectWiseQuestions`, data);
  }

  submitTestPrepQuestionAns(data: any) {
    return this._http.post<any>(addUrl + `submitTestPrepAnswers`, data);
  }

  testPrepList(userId: any) {
    return this._http.get<any>(addUrl + `userTestPreps/` + userId);
  }

  gettestPrepDetails(testId: any) {
    return this._http.get<any>(addUrl + `userTestPrepDetails/` + testId);
  }
  //////////////////////////////////////////  Documnet Upload ///////////////////////////////////////////
  //upload documnet

  uploadDocument(formData: any) {
    return this._http.post<any>(addUrl + `uploadDocumentFile`, formData);
  }

  /* ***************** Education ***************** */
  // Save documnet
  saveDocument(data: any) {
    return this._http.post<any>(addUrl + `addEducationalExperience`, data);
  }

  //Update documnet
  updateDocument(data: any) {
    return this._http.post<any>(addUrl + `updateEducationalExperience`, data);
  }

  //fetch documnet
  fetchEducationalList(userId: any) {
    return this._http.get<any>(addUrl + `fetchEducationalExperiences/` + userId);
  }

  /* ***************** Work Experience ***************** */
  //
  saveWorkDocument(workdata: any) {
    return this._http.post<any>(addUrl + `addWorkExperience`, workdata);
  }

  //Update documnet
  updateWorkDocument(data: any) {
    return this._http.post<any>(addUrl + `updateWorkExperience`, data);
  }

  //fetch documnet
  fetchWorkList(userId: any) {
    return this._http.get<any>(addUrl + `fetchWorkExperiences/` + userId);
  }


  /* ***************** ExtraCurriculam ***************** */
  //add document
  uploadExtraDoc(curriculaData: any) {
    return this._http.post<any>(addUrl + `addExtraCurricular`, curriculaData);
  }
  //update document
  updateCurriculamDocument(curriculaData: any) {
    return this._http.post<any>(addUrl + `updateExtraCurricular`, curriculaData);
  }
  //fetchDocument
  fetchExtraCurriculamList(userId: any) {
    return this._http.get<any>(addUrl + `fetchExtraCurriculars/` + userId);
  }


  /* ***************** Travel ***************** */
  //upload visa
  uploadVisaDoc(visaData: any) {
    return this._http.post<any>(addUrl + `updateVisa`, visaData);
  }
  //upload visa
  uploadPassportDoc(passportData: any) {
    return this._http.post<any>(addUrl + `updatePassport`, passportData);
  }

  /* ***************** Finance ***************** */
  uploadFinaceDoc(financeData: any) {
    return this._http.post<any>(addUrl + `updateFinanceDocument`, financeData);
  }

  /* ***************** health ***************** */
  uploadHealthDoc(healthData: any) {
    return this._http.post<any>(addUrl + `updateHealthDocument`, healthData);
  }
  /* ***************** Other ***************** */
  uploadOtherDoc(otherData: any) {
    return this._http.post<any>(addUrl + `updateOtherDocument`, otherData);
  }

  //////////////////////////////////////////  Search & Filter ///////////////////////////////////////////
  getsearchData() {
    return this._http.get<any>(addUrl + `setupSearchData`);
  }

  setFilterData() {
    return this._http.get<any>(addUrl + `setFilterData`);
  }

  resultFilter(formData: any) {
    return this._http.post<any>(addUrl + `filterCourse`, formData);
  }

  //////////////////////////////////////////  Apply ///////////////////////////////////////////
  // get status for application
  getApplyCourseStatus(userId: any, courseId: any) {
    return this._http.get<any>(addUrl + `checkThirdPartyCourseApply/${userId}/${courseId}`);
  }
  applyThirdParty(applyData: any) {
    return this._http.post<any>(addUrl + `thirdPartyCourseApply`, applyData);
  }

  //upload document
  applyEduDocument(formData: any) {
    return this._http.post<any>(addUrl + `updateCourseApplicationEducationDocument`, formData);
  }

  //upload document
  applyCourseDocument(formData: any) {
    return this._http.post<any>(addUrl + `updateCourseApplicationFileSigned`, formData);
  }

  //upload deposit Amount
  applyDepositAmountDocument(amountData: any) {
    return this._http.post<any>(addUrl + `updateCourseApplicationDepositDocument`, amountData);
  }

  //upload deposit Amount
  applyVisaDocument(visaData: any) {
    return this._http.post<any>(addUrl + `updateCourseApplicationVisaDocument`, visaData);
  }

  //upload deposit Amount
  applyEnrollDocument(enrollData: any) {
    return this._http.post<any>(addUrl + `enrollCourse`, enrollData);
  }

}

