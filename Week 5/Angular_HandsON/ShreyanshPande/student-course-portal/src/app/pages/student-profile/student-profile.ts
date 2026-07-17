import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  enrolledCourses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }
}
