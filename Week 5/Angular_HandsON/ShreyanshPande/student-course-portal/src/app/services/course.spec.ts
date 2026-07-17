import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course.model';

describe('CourseService Integration', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new courses with sequential numeric IDs', async () => {
    // 1. Get initial courses list
    const initialCourses = await firstValueFrom(service.getCourses());
    const maxId = initialCourses.reduce((max, c) => {
      const cid = Number(c.id);
      return !isNaN(cid) && cid > max ? cid : max;
    }, 0);

    const nextId = maxId + 1;
    const testCourse: Omit<Course, 'id'> = {
      name: `New Course ${nextId}`,
      code: `CS${300 + nextId}`,
      credits: 3,
      gradeStatus: 'pending',
      enrolled: false
    };

    // 2. Create the course
    const created = await firstValueFrom(service.createCourse(testCourse));

    // 3. Verify the ID is exactly nextId and is a valid number
    expect(created.id).toBe(nextId);
    expect(typeof created.id).toBe('number');
    expect(isNaN(created.id)).toBe(false);
    expect(created.name).toBe(`New Course ${nextId}`);

    // 4. Clean up by deleting the test course
    await firstValueFrom(service.deleteCourse(created.id));
  });
});
