import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
  course: any;
}
