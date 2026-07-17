import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseActions } from '../../store/course/course.actions';
import { selectCourses, selectCourseLoading, selectCourseError } from '../../store/course/course.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard, FormsModule, CommonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  filteredCourses$: Observable<Course[]>;
  searchTerm = '';
  private searchSubject = new BehaviorSubject<string>('');

  constructor(
    private store: Store,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectCourseLoading);
    this.errorMessage$ = this.store.select(selectCourseError);

    this.filteredCourses$ = combineLatest([this.courses$, this.searchSubject]).pipe(
      map(([courses, term]) => {
        if (!term.trim()) {
          return courses;
        }
        const lowerTerm = term.toLowerCase();
        return courses.filter(
          (c) => c.name.toLowerCase().includes(lowerTerm) || c.code.toLowerCase().includes(lowerTerm),
        );
      })
    );
  }

  ngOnInit() {
    this.loadCourses();

    this.route.queryParams.subscribe((params) => {
      const term = params['search'] ?? '';
      this.searchTerm = term;
      this.searchSubject.next(term);
    });
  }

  loadCourses() {
    this.store.dispatch(CourseActions.loadCourses());
  }

  onCourseDeleted(id: number) {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.loadCourses();
      },
      error: (err) => {
        this.store.dispatch(
          CourseActions.loadCoursesFailure({
            error: err.message || 'An error occurred while deleting the course.',
          })
        );
      },
    });
  }

  viewCourse(id: number) {
    this.router.navigate(['courses', id]);
  }

  updateSearch() {
    this.router.navigate(['courses'], {
      queryParams: {
        search: this.searchTerm || null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
