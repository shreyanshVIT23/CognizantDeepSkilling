import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';
import { Store } from '@ngrx/store';
import { CourseActions } from './store/course/course.actions';
import { selectCourses } from './store/course/course.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('student-course-portal');

  constructor(protected loadingService: LoadingService, private store: Store) {
    console.log('[NgRx Diagnostic] App component constructor initialized.');

    // 1. Log selector updates
    this.store.select(selectCourses).subscribe({
      next: (courses) => {
        console.log('[NgRx Diagnostic] coursesSelector emitted:', courses);
      },
      error: (err) => {
        console.error('[NgRx Diagnostic] coursesSelector error:', err);
      }
    });

    // 2. Dispatch diagnostic test action
    console.log('[NgRx Diagnostic] Dispatching CourseActions.loadCourses()...');
    this.store.dispatch(CourseActions.loadCourses());
  }
}
