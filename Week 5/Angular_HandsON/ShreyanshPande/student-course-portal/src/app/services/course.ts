import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, retry, catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';

function parseIdToNumber(id: any): number {
  if (id === null || id === undefined) return 0;
  const num = Number(id);
  if (!isNaN(num)) return num;
  // Stable hash for alphanumeric string IDs
  let hash = 5381;
  const s = String(id);
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 33) ^ s.charCodeAt(i);
  }
  return Math.abs(hash) % 1000000;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  courses = signal<Course[]>([]);
  private idMap = new Map<number, string | number>();

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Task 86: Retry happens BEFORE error handling.
      retry(2),

      // Task 85: tap is used for executing side effects without mutating the underlying data stream.
      tap((rawCourses) => {
        console.log('[RxJS tap (watch)] Fetched raw courses from API:', rawCourses);
      }),

      // Task 83: map is used for transforming/modifying the data stream.
      // We normalize all IDs in the frontend to clean sequential numbers (1, 2, 3, 4, 5...)
      // even if the backend returned string IDs.
      map((courses) => {
        let nextSequentialId = 1;
        this.idMap.clear();

        const filtered = courses.filter((c) => c.credits !== null && c.credits > 0);
        const existingNumericIds = filtered.map((x) => Number(x.id)).filter((x) => !isNaN(x));

        return filtered.map((c) => {
          let numId = Number(c.id);
          if (isNaN(numId)) {
            while (existingNumericIds.includes(nextSequentialId)) {
              nextSequentialId++;
            }
            numId = nextSequentialId;
            nextSequentialId++;
          }
          this.idMap.set(numId, c.id);
          return { ...c, id: numId };
        });
      }),

      tap((filteredCourses) => {
        this.courses.set(filteredCourses);
      }),

      // Task 84: catchError catches failures in the pipeline
      catchError((error) => {
        console.error('[RxJS catchError] Error fetched:', error);
        const friendlyError = new Error(
          'The courses server is currently offline. Please try again later.',
        );
        return throwError(() => friendlyError);
      }),
    );
  }

  getCourseById(id: number): Observable<Course> {
    const originalId = this.idMap.get(id) ?? id;
    return this.http
      .get<Course>(`${this.apiUrl}/${originalId}`)
      .pipe(map((c) => ({ ...c, id: id })));
  }

  createCourse(course: Course | Omit<Course, 'id'>): Observable<Course> {
    let courseToPost = { ...course };
    let clientGeneratedId: number;

    const hasId =
      'id' in courseToPost && courseToPost.id !== null && !isNaN(Number(courseToPost.id));
    if (!hasId) {
      const maxId = this.courses().reduce((max, existing) => {
        const idVal = Number(existing.id);
        return !isNaN(idVal) && idVal > max ? idVal : max;
      }, 0);
      clientGeneratedId = maxId + 1;
      courseToPost = { ...courseToPost, id: clientGeneratedId } as Course;
    } else {
      clientGeneratedId = Number((courseToPost as Course).id);
    }

    return this.http.post<Course>(this.apiUrl, courseToPost).pipe(
      map((responseCourse) => {
        // Save the mapping between client-side numeric ID and the server-side ID
        this.idMap.set(clientGeneratedId, responseCourse.id);
        return { ...responseCourse, id: clientGeneratedId };
      }),
      tap((newCourse) => {
        this.courses.update((list) => [...list, newCourse]);
      }),
    );
  }

  updateCourse(course: Course): Observable<Course> {
    const originalId = this.idMap.get(course.id) ?? course.id;
    const courseToPut = { ...course, id: originalId };
    return this.http.put<Course>(`${this.apiUrl}/${originalId}`, courseToPut).pipe(
      map((c) => ({ ...c, id: course.id })),
      tap((updatedCourse) => {
        this.courses.update((list) =>
          list.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
        );
      }),
    );
  }

  deleteCourse(id: number): Observable<any> {
    const originalId = this.idMap.get(id) ?? id;
    return this.http.delete<any>(`${this.apiUrl}/${originalId}`).pipe(
      tap(() => {
        this.courses.update((list) => list.filter((c) => c.id !== id));
        this.idMap.delete(id);
      }),
    );
  }

  getOriginalId(id: number): string | number {
    return this.idMap.get(id) ?? id;
  }
}
