import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnrollmentActions } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledCourseIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, HighlightDirective, CreditLabelPipe, CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  enrolledCourseIds$: Observable<number[]>;
  isExpanded = false;

  @Input() course!: Course;
  @Output() courseDeleted = new EventEmitter<number>();

  constructor(private store: Store) {
    this.enrolledCourseIds$ = this.store.select(selectEnrolledCourseIds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course Changed', changes['course']);
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  get borderStyles() {
    return {
      'border-left': `6px solid ${this.borderColor}`,
    };
  }

  get borderColor() {
    if (!this.course) return 'grey';
    switch (this.course.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }

  toggleEnrollment(enrolledIds: number[] | null) {
    if (!this.course || !enrolledIds) return;
    const isEnrolled = enrolledIds.includes(this.course.id);
    if (isEnrolled) {
      this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
    }
  }

  deleteCourse() {
    if (!this.course) return;
    if (confirm(`Are you sure you want to delete "${this.course.name}"?`)) {
      this.courseDeleted.emit(this.course.id);
    }
  }
}
