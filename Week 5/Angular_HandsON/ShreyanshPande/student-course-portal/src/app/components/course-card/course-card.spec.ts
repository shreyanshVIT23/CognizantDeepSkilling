import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { selectEnrolledCourseIds } from '../../store/enrollment/enrollment.selectors';

import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideHttpClient(),
        provideMockStore({
          selectors: [{ selector: selectEnrolledCourseIds, value: [] }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course name', async () => {
    const mockCourse = {
      id: 1,
      name: 'Angular Fundamentals',
      code: 'ANG101',
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false,
    };
    fixture.componentRef.setInput('course', mockCourse);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    console.log('--- Render Course Name HTML Output ---');
    console.log(fixture.nativeElement.innerHTML);

    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Angular Fundamentals');
  });

  it('should emit courseDeleted when delete button is clicked', async () => {
    const mockCourse = {
      id: 1,
      name: 'Angular Fundamentals',
      code: 'ANG101',
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false,
    };
    fixture.componentRef.setInput('course', mockCourse);
    component.isExpanded = true; // Delete button is inside @if(isExpanded)

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    console.log('--- Delete Button Click HTML Output ---');
    console.log(fixture.nativeElement.innerHTML);

    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(component.courseDeleted, 'emit');

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const deleteButton = buttons.find((btn) => btn.nativeElement.textContent.trim() === 'Delete');
    expect(deleteButton).toBeTruthy();
    deleteButton?.nativeElement.click();

    expect(component.courseDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should react to ngOnChanges', () => {
    const spy = vi.spyOn(console, 'log');
    const mockCourse = {
      id: 1,
      name: 'Angular',
      code: 'ANG101',
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false,
    };

    const changesObj = {
      course: new SimpleChange(undefined, mockCourse, true),
    };
    fixture.componentRef.setInput('course', mockCourse);
    component.ngOnChanges(changesObj);

    expect(spy).toHaveBeenCalledWith('Course Changed', changesObj.course);
    spy.mockRestore();
  });

  it('should update template after input changes', async () => {
    const mockCourse1 = {
      id: 1,
      name: 'Angular Fundamentals',
      code: 'ANG101',
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false,
    };
    fixture.componentRef.setInput('course', mockCourse1);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    let titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Angular Fundamentals');

    const mockCourse2 = {
      id: 1,
      name: 'React Basics',
      code: 'RCT101',
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false,
    };
    fixture.componentRef.setInput('course', mockCourse2);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('React Basics');
  });
});
