import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course } from '../models/course.model';
import { provideStore } from '@ngrx/store';
import { courseReducer } from '../store/course/course.reducer';
import { firstValueFrom } from 'rxjs';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideStore({ course: courseReducer })
      ],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should normalize alphanumeric course IDs to sequential numeric IDs', async () => {
    const mockRawCourses = [
      { id: '1', name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'pending', enrolled: false },
      { id: 'some-string-id', name: 'React Basics', code: 'RCT101', credits: 4, gradeStatus: 'passed', enrolled: true },
      { id: '3', name: 'Node.js', code: 'NOD201', credits: 5, gradeStatus: 'failed', enrolled: false }
    ];

    const coursesPromise = firstValueFrom(service.getCourses());

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockRawCourses);

    const courses = await coursesPromise;
    expect(courses[0].id).toBe(1);
    expect(courses[1].id).toBe(2); // 'some-string-id' mapped to next available sequential ID (2, as 1 and 3 are taken)
    expect(courses[2].id).toBe(3);
  });

  it('should preserve and map client-generated numeric IDs on course creation', async () => {
    const mockRawCourses = [
      { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 3, gradeStatus: 'pending', enrolled: false }
    ];

    // Load initial courses first
    const loadPromise = firstValueFrom(service.getCourses());
    const loadReq = httpMock.expectOne('http://localhost:3000/courses');
    loadReq.flush(mockRawCourses);
    await loadPromise;

    const testCourse: Omit<Course, 'id'> = {
      name: 'New Course',
      code: 'CS302',
      credits: 3,
      gradeStatus: 'pending',
      enrolled: false
    };

    const createPromise = firstValueFrom(service.createCourse(testCourse));

    const createReq = httpMock.expectOne('http://localhost:3000/courses');
    expect(createReq.request.method).toBe('POST');
    expect(createReq.request.body.id).toBe(2);
    
    // Simulate server returning a string-generated ID
    createReq.flush({
      id: 'server-string-id',
      name: 'New Course',
      code: 'CS302',
      credits: 3,
      gradeStatus: 'pending',
      enrolled: false
    });

    const created = await createPromise;
    expect(created.id).toBe(2); // maxId was 1, so generated sequential ID is 2
    expect(created.name).toBe('New Course');
  });
});
