import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectCourses = createSelector(
  selectCourseState,
  (state) => state.courses
);

export const selectCourseLoading = createSelector(
  selectCourseState,
  (state) => state.loading
);

export const selectCourseError = createSelector(
  selectCourseState,
  (state) => state.error
);
