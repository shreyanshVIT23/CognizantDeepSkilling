import { courseReducer, initialCourseState } from './course.reducer';
import { CourseActions } from './course.actions';

describe('Course Reducer', () => {
  it('should return initial state when action is unknown', () => {
    const action = { type: 'UNKNOWN' };
    const state = courseReducer(initialCourseState, action as any);
    expect(state).toBe(initialCourseState);
  });

  it('should set loading true on loadCourses', () => {
    const action = CourseActions.loadCourses();
    const state = courseReducer(initialCourseState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should populate courses on loadCoursesSuccess', () => {
    const mockCourses = [
      { id: 1, name: 'Test Course', code: 'TC101', credits: 3, gradeStatus: 'pending' as const, enrolled: false }
    ];
    const action = CourseActions.loadCoursesSuccess({ courses: mockCourses });
    const state = courseReducer({ ...initialCourseState, loading: true }, action);
    expect(state.courses).toEqual(mockCourses);
    expect(state.loading).toBe(false);
  });

  it('should set error on loadCoursesFailure', () => {
    const errorMsg = 'Failed to load courses';
    const action = CourseActions.loadCoursesFailure({ error: errorMsg });
    const state = courseReducer({ ...initialCourseState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMsg);
  });
});
