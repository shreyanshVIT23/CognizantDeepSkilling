import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ enrolledCourseIds: number[] }>(),
    'Load Enrollments Failure': props<{ error: string }>(),
    'Enroll In Course': props<{ courseId: number }>(),
    'Enroll In Course Success': props<{ courseId: number }>(),
    'Enroll In Course Failure': props<{ error: string }>(),
    'Unenroll From Course': props<{ courseId: number }>(),
    'Unenroll From Course Success': props<{ courseId: number }>(),
    'Unenroll From Course Failure': props<{ error: string }>(),
  },
});
