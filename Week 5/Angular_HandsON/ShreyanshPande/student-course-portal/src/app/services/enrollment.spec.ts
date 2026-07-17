import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EnrollmentService } from './enrollment';
import { CourseService } from './course';
import { signal } from '@angular/core';
import { of } from 'rxjs';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let httpMock: HttpTestingController;
  let courseServiceSpy: any;

  beforeEach(() => {
    courseServiceSpy = {
      courses: signal([]),
      getCourses: vi.fn().mockReturnValue(of([])),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CourseService, useValue: courseServiceSpy },
      ],
    });
    service = TestBed.inject(EnrollmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    // Flush the initial call to loadEnrollments triggered on construction
    const req = httpMock.expectOne('http://localhost:3000/enrollments');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    expect(service).toBeTruthy();
  });
});
