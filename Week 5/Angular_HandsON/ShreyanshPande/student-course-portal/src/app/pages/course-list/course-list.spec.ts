import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { courseReducer } from '../../store/course/course.reducer';

import { CourseList } from './course-list';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideStore({ course: courseReducer })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
