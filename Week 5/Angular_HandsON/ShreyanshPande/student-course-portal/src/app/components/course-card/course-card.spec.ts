import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { courseReducer } from '../../store/course/course.reducer';
import { enrollmentReducer } from '../../store/enrollment/enrollment.reducer';

import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideHttpClient(),
        provideStore({
          course: courseReducer,
          enrollment: enrollmentReducer
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
