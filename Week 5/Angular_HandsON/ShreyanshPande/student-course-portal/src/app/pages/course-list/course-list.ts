import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCard, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = signal(true);
  courses: Course[] = [];
  searchTerm = '';
  errorMessage = '';

  constructor(
    protected courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadCourses();
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
  }

  loadCourses() {
    this.isLoading.set(true);
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while loading courses.';
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  onCourseDeleted(id: number) {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.loadCourses();
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while deleting the course.';
      },
    });
  }

  viewCourse(id: number) {
    this.router.navigate(['courses', id]);
  }

  updateSearch() {
    this.router.navigate(['courses'], {
      queryParams: {
        search: this.searchTerm || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm.trim()) {
      return this.courses;
    }
    const term = this.searchTerm.toLowerCase();
    return this.courses.filter(
      (c) => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term),
    );
  }
}
