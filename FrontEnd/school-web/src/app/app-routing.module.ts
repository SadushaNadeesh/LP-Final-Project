import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './blog/add-post/add-post.component';
import { PostDetailsComponent } from './blog/post-details/post-details.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { AddContentComponent } from './content/add-content/add-content.component';
import { ContentDetailsComponent } from './content/content-details/content-details.component';
import { ContentsListComponent } from './content/contents-list/contents-list.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { CoursesListComponent } from './course/courses-list/courses-list.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardModeratorComponent } from './dashboard-moderator/dashboard-moderator.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { QuestionDetailsComponent } from './question/question-details/question-details.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QizzesComponent } from './quiz/qizzes/qizzes.component';
import { ResultComponent } from './quiz/result/result.component';
import { TestComponent } from './quiz/test/test.component';
import { RegisterComponent } from './register/register.component';
import { AddSubjectComponent } from './subject/add-subject/add-subject.component';
import { SubjectDetailsComponent } from './subject/subject-details/subject-details.component';
import { SubjectsListComponent } from './subject/subjects-list/subjects-list.component';
// import { UserDetailComponent } from './user/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: DashboardAdminComponent },
  { path: 'mod', component: DashboardModeratorComponent },
  { path: 'user', component: DashboardUserComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'contents', component: ContentsListComponent },
  { path: 'content/:id', component: ContentDetailsComponent },
  { path: 'add-content', component: AddContentComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: 'course/:id', component: CourseDetailsComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'questions', component: QuestionListComponent },
  { path: 'question/:id', component: QuestionDetailsComponent },
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'subjects', component: SubjectsListComponent },
  { path: 'subject/:id', component: SubjectDetailsComponent },
  { path: 'add-subject', component: AddSubjectComponent },
  { path: 'quizzes', component: QizzesComponent },
  { path: 'result/:id', component: ResultComponent },
  { path: 'test/:id', component: TestComponent }
  // { path: 'user/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
