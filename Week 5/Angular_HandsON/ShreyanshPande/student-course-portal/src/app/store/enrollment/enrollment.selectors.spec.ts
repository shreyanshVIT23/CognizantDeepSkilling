import { selectEnrolledCourseIds, selectEnrolledCourses } from './enrollment.selectors';
import { EnrollmentState } from './enrollment.reducer';
import { CourseState } from '../course/course.reducer';

describe('Enrollment Selectors', () => {
  const mockCourses = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 3, gradeStatus: 'pending' as const, enrolled: false },
    { id: 2, name: 'Spring Boot', code: 'SPR101', credits: 4, gradeStatus: 'passed' as const, enrolled: true },
    { id: 3, name: 'React', code: 'RCT101', credits: 3, gradeStatus: 'pending' as const, enrolled: false }
  ];

  const mockState: { course: CourseState; enrollment: EnrollmentState } = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    },
    enrollment: {
      enrolledCourseIds: [2],
      loading: false,
      error: null
    }
  };

  it('should select enrolled course IDs', () => {
    const result = selectEnrolledCourseIds(mockState);
    expect(result).toEqual([2]);
  });

  it('should select cross-slice enrolled courses', () => {
    const result = selectEnrolledCourses(mockState);
    expect(result).toEqual([
      { id: 2, name: 'Spring Boot', code: 'SPR101', credits: 4, gradeStatus: 'passed', enrolled: true }
    ]);
  });
});
