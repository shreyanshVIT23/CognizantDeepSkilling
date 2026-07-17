import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CourseEffects } from './course.effects';
import { CourseService } from '../../services/course';
import { CourseActions } from './course.actions';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CourseEffects', () => {
  let actions$: Observable<any>;
  let effects: CourseEffects;
  let courseServiceSpy: any;

  beforeEach(() => {
    courseServiceSpy = {
      getCourses: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        { provide: CourseService, useValue: courseServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(CourseEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should call CourseService getCourses and dispatch loadCoursesSuccess on success', async () => {
    const mockCourses = [
      {
        id: 1,
        name: 'Angular',
        code: 'ANG101',
        credits: 3,
        gradeStatus: 'pending' as const,
        enrolled: false,
      },
    ];
    courseServiceSpy.getCourses.mockReturnValue(of(mockCourses));

    actions$ = of(CourseActions.loadCourses());

    const result = await new Promise((resolve) => {
      effects.loadCourses$.subscribe((action) => {
        resolve(action);
      });
    });

    expect(courseServiceSpy.getCourses).toHaveBeenCalledTimes(1);
    expect(result).toEqual(CourseActions.loadCoursesSuccess({ courses: mockCourses }));
  });

  it('should dispatch loadCoursesFailure on service failure', async () => {
    const error = new Error('Server error');
    courseServiceSpy.getCourses.mockReturnValue(throwError(() => error));

    actions$ = of(CourseActions.loadCourses());

    const result = await new Promise((resolve) => {
      effects.loadCourses$.subscribe((action) => {
        resolve(action);
      });
    });

    expect(courseServiceSpy.getCourses).toHaveBeenCalledTimes(1);
    expect(result).toEqual(CourseActions.loadCoursesFailure({ error: 'Server error' }));
  });
});
