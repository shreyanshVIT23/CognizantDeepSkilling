import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = signal(true);
  courses: Course[] = [];
  selectedCourseId: number | null = null;

  constructor(protected courseService: CourseService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
    this.courses = this.courseService.getCourses();
  }

  onEnroll(courseId: number) {
    this.selectedCourseId = courseId;
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      course.enrolled = true;
    }
  }
}
