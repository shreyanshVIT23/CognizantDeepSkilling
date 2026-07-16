import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses = [
    {
      id: 1,
      name: 'Angular',
      code: 'CS301',
      credits: 4,
    },

    {
      id: 2,
      name: 'Python',
      code: 'CS302',
      credits: 3,
    },

    {
      id: 3,
      name: 'Machine Learning',
      code: 'CS401',
      credits: 5,
    },

    {
      id: 4,
      name: 'Database Systems',
      code: 'CS205',
      credits: 4,
    },

    {
      id: 5,
      name: 'Operating Systems',
      code: 'CS303',
      credits: 4,
    },
  ];
  selectedCourseId: number | null = null;

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);

    this.selectedCourseId = courseId;
  }
}
