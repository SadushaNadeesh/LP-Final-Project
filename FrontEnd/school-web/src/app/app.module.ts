import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardModeratorComponent } from './dashboard-moderator/dashboard-moderator.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { CoursesListComponent } from './course/courses-list/courses-list.component';
import { AddPostComponent } from './blog/add-post/add-post.component';
import { PostDetailsComponent } from './blog/post-details/post-details.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionDetailsComponent } from './question/question-details/question-details.component';
import { AddSubjectComponent } from './subject/add-subject/add-subject.component';
import { SubjectDetailsComponent } from './subject/subject-details/subject-details.component';
import { SubjectsListComponent } from './subject/subjects-list/subjects-list.component';
import { AddContentComponent } from './content/add-content/add-content.component';
import { ContentDetailsComponent } from './content/content-details/content-details.component';
import { ContentsListComponent } from './content/contents-list/contents-list.component';
import { QizzesComponent } from './quiz/qizzes/qizzes.component';
import { ResultComponent } from './quiz/result/result.component';
import { TestComponent } from './quiz/test/test.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './user/users/users.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

//import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardAdminComponent,
    DashboardModeratorComponent,
    DashboardUserComponent,
    AddCourseComponent,
    CourseDetailsComponent,
    CoursesListComponent,
    AddPostComponent,
    PostDetailsComponent,
    PostsListComponent,
    AddQuestionComponent,
    QuestionListComponent,
    QuestionDetailsComponent,
    AddSubjectComponent,
    SubjectDetailsComponent,
    SubjectsListComponent,
    AddContentComponent,
    ContentDetailsComponent,
    ContentsListComponent,
    QizzesComponent,
    ResultComponent,
    TestComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
