import { Component } from '@angular/core';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget {
  constructor(protected courseService: CourseService) {}

  get courses(): Course[] {
    return this.courseService.getCourses();
  }
  
  addQuickCourse(): void {
    const nextId = this.courses.length + 1;
    const newCourse: Course = {
      id: nextId,
      name: `New Course ${nextId}`,
      code: `CS${300 + nextId}`,
      credits: Math.floor(Math.random() * 5) + 1,
      gradeStatus: 'pending',
      enrolled: false,
    };
    this.courseService.addCourse(newCourse);
    console.log('Added course via widget:', newCourse);
  }
}
