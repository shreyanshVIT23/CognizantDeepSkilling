import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  enrollment = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: null,
    agreeToTerms: false,
  };
  submitted = false;

  constructor(private courseService: CourseService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const maxId = this.courseService.courses().reduce((max, existing) => {
      const idVal = Number(existing.id);
      return !isNaN(idVal) && idVal > max ? idVal : max;
    }, 0);
    const nextId = maxId + 1;

    const newCourse: Course = {
      id: nextId,
      name: `New Course ${nextId}`,
      code: this.enrollment.courseId ? `CS${this.enrollment.courseId}` : `CS${300 + nextId}`,
      credits: 3,
      gradeStatus: 'pending',
      enrolled: false,
    };

    this.courseService.createCourse(newCourse).subscribe({
      next: (course) => {
        console.log('Course created successfully via enrollment form submit handler:', course);
        this.submitted = true;
        this.resetForm(form);
      },
      error: (err) => {
        console.error('Failed to create course via enrollment form:', err);
      },
    });
  }

  resetForm(form: NgForm) {
    form.resetForm({
      studentName: '',
      studentEmail: '',
      courseId: null,
      preferredSemester: null,
      agreeToTerms: false,
    });
    this.submitted = false;
  }
}
