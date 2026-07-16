import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
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
      'card--enrolled': this.course.enrolled,
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
  course!: {
    id: number;
    name: string;
    code: string;
    credits: number | null;
    gradeStatus: string;
    enrolled: boolean;
  };
  @Output()
  enrollRequested = new EventEmitter<number>();
}
