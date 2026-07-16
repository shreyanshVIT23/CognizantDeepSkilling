import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = signal(true);
  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }
  courses = [
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
  selectedCourseId: number | null = null;

  onEnroll(courseId: number) {
    this.selectedCourseId = courseId;
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      course.enrolled = true;
    }
  }
}
