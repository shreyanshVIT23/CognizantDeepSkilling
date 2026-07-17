import { Routes } from '@angular/router';

import { EnrollmentForm } from '../../pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from '../../pages/reactive-enrollment-form/reactive-enrollment-form';
import { unsavedChangesGuard } from '../../guards/unsaved-changes';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    component: EnrollmentForm,
  },
  {
    path: 'reactive',
    component: ReactiveEnrollmentForm,
    canDeactivate: [unsavedChangesGuard],
  },
];
