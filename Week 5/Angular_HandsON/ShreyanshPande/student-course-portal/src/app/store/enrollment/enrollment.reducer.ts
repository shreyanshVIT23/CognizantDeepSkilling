import { createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';

export interface EnrollmentState {
  enrolledCourseIds: number[];
  loading: boolean;
  error: string | null;
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: [],
  loading: false,
  error: null,
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,
  on(EnrollmentActions.loadEnrollments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { enrolledCourseIds }) => ({
    ...state,
    enrolledCourseIds,
    loading: false,
  })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EnrollmentActions.enrollInCourse, (state, { courseId }) => {
    if (state.enrolledCourseIds.includes(courseId)) {
      return state;
    }
    return {
      ...state,
      enrolledCourseIds: [...state.enrolledCourseIds, courseId],
    };
  }),
  on(EnrollmentActions.enrollInCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(EnrollmentActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId),
  })),
  on(EnrollmentActions.unenrollFromCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
