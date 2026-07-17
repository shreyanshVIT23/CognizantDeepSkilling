import { selectCourses, selectCourseLoading, selectCourseError } from './course.selectors';
import { CourseState } from './course.reducer';

describe('Course Selectors', () => {
  const mockState: { course: CourseState } = {
    course: {
      courses: [
        {
          id: 1,
          name: 'Angular',
          code: 'ANG101',
          credits: 3,
          gradeStatus: 'pending',
          enrolled: false,
        },
      ],
      loading: true,
      error: 'Some error',
    },
  };

  it('should select courses list', () => {
    const result = selectCourses.projector(mockState.course);
    expect(result).toEqual(mockState.course.courses);
  });

  it('should select course loading flag', () => {
    const result = selectCourseLoading.projector(mockState.course);
    expect(result).toBe(true);
  });

  it('should select course error', () => {
    const result = selectCourseError.projector(mockState.course);
    expect(result).toBe('Some error');
  });
});
