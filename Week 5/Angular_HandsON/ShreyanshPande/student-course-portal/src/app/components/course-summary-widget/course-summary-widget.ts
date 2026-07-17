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
    return this.courseService.courses();
  }

  addQuickCourse(): void {
    const maxId = this.courses.reduce((max, c) => {
      const cid = Number(c.id);
      return !isNaN(cid) && cid > max ? cid : max;
    }, 0);
    const nextId = maxId + 1;
    const nextCodeNum = 300 + nextId;
    const newCourse: Course = {
      id: nextId,
      name: `New Course ${nextId}`,
      code: `CS${nextCodeNum}`,
      credits: Math.floor(Math.random() * 5) + 1,
      gradeStatus: 'pending',
      enrolled: false,
    };
    this.courseService.createCourse(newCourse).subscribe({
      next: (course) => {
        console.log('Added course via widget:', course);
      },
      error: (err) => console.error('Failed to add quick course:', err),
    });
  }
}
