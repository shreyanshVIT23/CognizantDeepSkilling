import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course';
import { CourseActions } from './course.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(
              CourseActions.loadCoursesFailure({
                error: error.message || 'Failed to load courses.',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
