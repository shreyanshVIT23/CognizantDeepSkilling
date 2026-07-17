import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Failure': props<{ error: string }>(),
  },
});
