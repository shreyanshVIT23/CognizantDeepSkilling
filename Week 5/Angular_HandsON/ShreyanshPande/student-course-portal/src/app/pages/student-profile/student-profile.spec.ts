import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { courseReducer } from '../../store/course/course.reducer';
import { enrollmentReducer } from '../../store/enrollment/enrollment.reducer';

import { StudentProfile } from './student-profile';

describe('StudentProfile', () => {
  let component: StudentProfile;
  let fixture: ComponentFixture<StudentProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfile],
      providers: [
        provideStore({
          course: courseReducer,
          enrollment: enrollmentReducer,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
