import { enrollmentReducer, initialEnrollmentState } from './enrollment.reducer';
import { EnrollmentActions } from './enrollment.actions';

describe('Enrollment Reducer', () => {
  it('should return initial state when action is unknown', () => {
    const action = { type: 'UNKNOWN' };
    const state = enrollmentReducer(initialEnrollmentState, action as any);
    expect(state).toBe(initialEnrollmentState);
  });

  it('should add course ID on enrollInCourse', () => {
    const action = EnrollmentActions.enrollInCourse({ courseId: 5 });
    const state = enrollmentReducer(initialEnrollmentState, action);
    expect(state.enrolledCourseIds).toEqual([5]);
  });

  it('should not duplicate course ID if already enrolled', () => {
    const initialState = { ...initialEnrollmentState, enrolledCourseIds: [5] };
    const action = EnrollmentActions.enrollInCourse({ courseId: 5 });
    const state = enrollmentReducer(initialState, action);
    expect(state.enrolledCourseIds).toEqual([5]);
  });

  it('should remove course ID on unenrollFromCourse', () => {
    const initialState = { ...initialEnrollmentState, enrolledCourseIds: [5] };
    const action = EnrollmentActions.unenrollFromCourse({ courseId: 5 });
    const state = enrollmentReducer(initialState, action);
    expect(state.enrolledCourseIds).toEqual([]);
  });
});
