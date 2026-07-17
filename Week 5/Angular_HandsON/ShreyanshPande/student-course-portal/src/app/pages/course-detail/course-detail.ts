import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course?: Course;
  enrolledStudentsCount = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Task 87: Use switchMap to chain dependent requests.
    // switchMap is used to listen to the route paramMap Observable.
    // When the parameter (id) changes, switchMap cancels any previous/ongoing
    // requests for course details or student lists, and switches to the new requests.
    // Comment: Why doesn't switchMap let previous requests finish?
    // In scenarios like autocomplete search, live selection, or quickly clicking
    // different items, older requests could complete later than newer ones due to network latency,
    // thereby overwriting newer and correct results with outdated data (race conditions).
    // switchMap prevents this by unsubscribing from the previous inner Observable whenever a new outer value emits.
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) =>
          forkJoin({
            course: this.courseService.getCourseById(id),
            enrollments: this.enrollmentService.getEnrollmentsByCourseId(id),
          }),
        ),
      )
      .subscribe({
        next: ({ course, enrollments }) => {
          this.course = course;
          this.enrolledStudentsCount = enrollments.length;
          console.log('Course details loaded:', course);
          console.log('Enrollments loaded:', enrollments);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching course and enrollments in CourseDetail:', err);
        },
      });
  }
}
