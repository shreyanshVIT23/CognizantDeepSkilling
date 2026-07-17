import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { CourseService } from '../../services/course';
import { of } from 'rxjs';

import { CourseList } from './course-list';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;
  let courseServiceSpy: any;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    courseServiceSpy = {
      getCourses: vi.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            course: {
              courses: [],
              loading: false,
              error: null,
            },
            enrollment: {
              enrolledCourseIds: [],
            },
          },
        }),
        { provide: CourseService, useValue: courseServiceSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render courses from MockStore', async () => {
    const mockCourses = [
      {
        id: 1,
        name: 'Angular Fundamentals',
        code: 'ANG101',
        credits: 3,
        gradeStatus: 'pending' as const,
        enrolled: false,
      },
      {
        id: 2,
        name: 'React Basics',
        code: 'RCT101',
        credits: 4,
        gradeStatus: 'passed' as const,
        enrolled: true,
      },
    ];

    store.setState({
      course: {
        courses: mockCourses,
        loading: false,
        error: null,
      },
      enrollment: {
        enrolledCourseIds: [2],
      },
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  it('should show loading indicator', async () => {
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null,
      },
      enrollment: {
        enrolledCourseIds: [],
      },
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(loadingEl.textContent).toContain('Loading Courses');
  });

  it('should hide loading indicator when loading is false', async () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: null,
      },
      enrollment: {
        enrolledCourseIds: [],
      },
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const loadingEl = paragraphs.find((p) =>
      p.nativeElement.textContent.includes('Loading Courses'),
    );
    expect(loadingEl).toBeUndefined();
  });

  it('should render empty state when courses list is empty', async () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: null,
      },
      enrollment: {
        enrolledCourseIds: [],
      },
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const emptyEl = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(emptyEl.textContent).toContain('No courses match your search criteria');
  });

  it('should render error state', async () => {
    store.setState({
      course: {
        courses: [],
        loading: false,
        error: 'Failed to load courses.',
      },
      enrollment: {
        enrolledCourseIds: [],
      },
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.error-banner')).nativeElement;
    expect(errorEl.textContent).toContain('Failed to load courses.');
  });
});
