import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from './course';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollments';
  enrolledCourseIds = signal<number[]>([]);
  private enrollmentMap = new Map<number, string | number>();

  constructor(
    private http: HttpClient,
    private courseService: CourseService,
  ) {
    this.loadEnrollments();
    // Pre-populate courses cache
    this.courseService.getCourses().subscribe({
      error: (err) => console.error('Failed to load courses in EnrollmentService:', err),
    });
  }

  loadEnrollments(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (enrollments) => {
        enrollments.forEach(e => {
          const cid = Number(e.courseId);
          this.enrollmentMap.set(cid, e.id);
        });
        this.enrolledCourseIds.set(enrollments.map((e) => Number(e.courseId)));
      },
      error: (err) => console.error('Failed to load enrollments:', err),
    });
  }

  enroll(courseId: number): Observable<any> {
    if (!this.enrolledCourseIds().includes(courseId)) {
      this.enrolledCourseIds.update((ids) => [...ids, courseId]);
    }
    const originalId = this.courseService.getOriginalId(courseId);
    const patchCourse$ = this.http.patch(`http://localhost:3000/courses/${originalId}`, { enrolled: true });

    return forkJoin({
      enrollment: this.http.post<any>(this.apiUrl, { courseId }),
      course: patchCourse$
    }).pipe(
      tap(({ enrollment }) => {
        this.enrollmentMap.set(courseId, enrollment.id);
        this.courseService.courses.update(list =>
          list.map(c => c.id === courseId ? { ...c, enrolled: true } : c)
        );
      }),
      catchError((err) => {
        // Rollback local cache on error
        this.enrolledCourseIds.update((ids) => ids.filter((id) => id !== courseId));
        throw err;
      }),
    );
  }

  unenroll(courseId: number): Observable<any> {
    this.enrolledCourseIds.update((ids) => ids.filter((id) => id !== courseId));
    const enrollmentId = this.enrollmentMap.get(courseId) ?? courseId;
    const originalId = this.courseService.getOriginalId(courseId);
    const patchCourse$ = this.http.patch(`http://localhost:3000/courses/${originalId}`, { enrolled: false });

    return forkJoin({
      enrollment: this.http.delete(`${this.apiUrl}/${enrollmentId}`),
      course: patchCourse$
    }).pipe(
      tap(() => {
        this.enrollmentMap.delete(courseId);
        this.courseService.courses.update(list =>
          list.map(c => c.id === courseId ? { ...c, enrolled: false } : c)
        );
      }),
      catchError((err) => {
        // Rollback local cache on error
        this.enrolledCourseIds.update((ids) => [...ids, courseId]);
        throw err;
      }),
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds().includes(courseId);
  }

  getEnrollmentsByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?courseId=${courseId}`);
  }

  getEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEnrolledCourses(): Course[] {
    const ids = this.enrolledCourseIds();
    return this.courseService.courses().filter((c) => ids.includes(c.id));
  }
}
