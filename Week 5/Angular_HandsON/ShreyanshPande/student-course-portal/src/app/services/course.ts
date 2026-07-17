import { Injectable, Service } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Angular',
      code: 'CS301',
      credits: 4,
      gradeStatus: 'passed',
      enrolled: false,
    },
    {
      id: 2,
      name: 'Python',
      code: 'CS302',
      credits: 3,
      gradeStatus: 'failed',
      enrolled: false,
    },
    {
      id: 3,
      name: 'Machine Learning',
      code: 'CS401',
      credits: 5,
      gradeStatus: 'pending',
      enrolled: false,
    },
    {
      id: 4,
      name: 'Database Systems',
      code: 'CS205',
      credits: 1,
      gradeStatus: 'pending',
      enrolled: false,
    },
    {
      id: 5,
      name: 'Operating Systems',
      code: 'CS303',
      credits: null,
      gradeStatus: 'passed',
      enrolled: false,
    },
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
