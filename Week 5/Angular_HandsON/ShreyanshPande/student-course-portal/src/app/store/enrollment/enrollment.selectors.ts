import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectCourses } from '../course/course.selectors';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledCourseIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds,
);

export const selectEnrolledCourses = createSelector(
  selectCourses,
  selectEnrolledCourseIds,
  (courses, enrolledIds) => courses.filter((c) => enrolledIds.includes(c.id)),
);
