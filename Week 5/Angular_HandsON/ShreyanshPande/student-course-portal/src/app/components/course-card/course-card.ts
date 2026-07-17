import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course Changed', changes['course']);
  }
  isExpanded = false;
  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }
  // Getter keeps the template clean by moving UI logic into the component.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': (this.course.credits ?? 0) >= 4,
      expanded: this.isExpanded,
    };
  }
  get borderStyles() {
    return {
      'border-left': `6px solid ${this.borderColor}`,
    };
  }
  get borderColor() {
    switch (this.course.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }

  @Input()
  course!: Course;

  toggleEnrollment() {
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }

  get isEnrolled() {
    return this.enrollmentService.isEnrolled(this.course.id);
  }
}
