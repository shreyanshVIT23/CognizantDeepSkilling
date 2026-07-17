import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { of } from 'rxjs';

import { CourseDetail } from './course-detail';

describe('CourseDetail', () => {
  let component: CourseDetail;
  let fixture: ComponentFixture<CourseDetail>;
  let courseServiceSpy: any;
  let enrollmentServiceSpy: any;

  beforeEach(async () => {
    courseServiceSpy = {
      getCourseById: vi
        .fn()
        .mockReturnValue(
          of({
            id: 1,
            name: 'Test Course',
            code: 'TC101',
            credits: 3,
            gradeStatus: 'pending' as const,
            enrolled: false,
          }),
        ),
    };

    enrollmentServiceSpy = {
      getEnrollmentsByCourseId: vi.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [CourseDetail],
      providers: [
        provideRouter([]),
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: EnrollmentService, useValue: enrollmentServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
