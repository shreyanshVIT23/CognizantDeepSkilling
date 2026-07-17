import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { CoursesLayout } from './layouts/courses-layout/courses-layout';
import { authGuard } from './guards/auth';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      {
        path: '',
        component: CourseList,
      },
      {
        path: ':id',
        component: CourseDetail,
      },
    ],
  },
  {
    path: 'profile',
    component: StudentProfile,
    canActivate: [authGuard],
  },
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment.routes').then(
        (m) => m.ENROLLMENT_ROUTES
      ),
  },
  {
    path: '**',
    component: NotFound,
  },
];
