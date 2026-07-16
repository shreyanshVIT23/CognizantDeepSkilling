import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      "Course Changed",
      changes['course'],
    );
  }
  @Input()
  course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: string;
  };
  @Output()
  enrollRequested = new EventEmitter<number>();
}
