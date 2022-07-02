import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingComponent } from './pages/building/building.component';
import { ClassComponent } from './pages/class/class.component';
import { CourseComponent } from './pages/course/course.component';
import { MaintainanceComponent } from './pages/maintainance/maintainance.component';
import { MajorsComponent } from './pages/majors/majors.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { ModuleclassComponent } from './pages/moduleclass/moduleclass.component';
import { OlogyComponent } from './pages/ology/ology.component';
import { PracticallaboratoryComponent } from './pages/practicallaboratory/practicallaboratory.component';
import { SchoolyearComponent } from './pages/schoolyear/schoolyear.component';
import { StudentComponent } from './pages/student/student.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { TechnicalstaffComponent } from './pages/technicalstaff/technicalstaff.component';
import { UserComponent } from './pages/user/user.component';
import { SemesterComponent } from './pages/semester/semester.component';
import { PracticegroupComponent } from './pages/practicegroup/practicegroup.component';
import { PracticescheduleComponent } from './pages/practiceschedule/practiceschedule.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LoginComponent } from './login/login.component';
import { DetailmoduleclassComponent } from './pages/detailmoduleclass/detailmoduleclass.component';
import { DividepracticegroupsComponent } from './pages/dividepracticegroups/dividepracticegroups.component';
import { DetailpracticegroupComponent } from './pages/detailpracticegroup/detailpracticegroup.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';
import { AuthGuardService } from './auth.service';
import { LogoutComponent } from './login/logout.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'building',
    component: BuildingComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher', 'technicalStaff', 'Student'] },
  },
  { path: 'class',
   component: ClassComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher', 'technicalStaff', 'Student'] }
   },
  {
    path: 'course',
    component: CourseComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher', 'technicalStaff', 'Student'] },
  },
  {
    path: 'maintainance',
    component: MaintainanceComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'majors',
    component: MajorsComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'module',
    component: ModulesComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'moduleclass',
    component: ModuleclassComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'ology',
    component: OlogyComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'practicallaboratory',
    component: PracticallaboratoryComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'practicegroup',
    component: PracticegroupComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'schoolyear',
    component: SchoolyearComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'semester',
    component: SemesterComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'subject',
    component: SubjectComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'technicalstaff',
    component: TechnicalstaffComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'practiceschedule',
    component: PracticescheduleComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'attendance/:id',
    component: AttendanceComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'detailmoduleclass/:id',
    component: DetailmoduleclassComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'dividepracticegroups/:id',
    component: DividepracticegroupsComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'detailpracticegroup/:id',
    component: DetailpracticegroupComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'equipment/:id',
    component: EquipmentComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
    canActivate: [AuthGuardService],
    data: {
      roles: ['admin', 'teacher', 'technicalStaff', 'Student'],
      runGuardsAndResolvers: 'always',
    },
  },
  { path: 'login', component: LoginComponent, data: { showLayout: false } },
  { path: 'logout', component: LogoutComponent, data: { showLayout: false } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
