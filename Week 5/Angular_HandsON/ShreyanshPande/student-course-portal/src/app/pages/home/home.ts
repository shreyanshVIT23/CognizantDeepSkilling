import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { NotificationComponent } from '../../components/notification/notification';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectCourses } from '../../store/course/course.selectors';
import { selectEnrolledCourseIds } from '../../store/enrollment/enrollment.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CourseSummaryWidget, NotificationComponent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  coursesCount$: Observable<number>;
  enrolledCount$: Observable<number>;

  constructor(private store: Store) {
    this.coursesCount$ = this.store.select(selectCourses).pipe(map((courses) => courses.length));
    this.enrolledCount$ = this.store.select(selectEnrolledCourseIds).pipe(map((ids) => ids.length));
  }

  ngOnDestroy(): void {
    console.log('Home component destroyed');
  }
  ngOnInit(): void {
    console.log('Home component initialized');
  }

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
