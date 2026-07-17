import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CourseSummaryWidget],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  constructor(private courseService: CourseService) {}

  ngOnDestroy(): void {
    console.log("Home component destroyed");
  }
  ngOnInit(): void {
    console.log('Home component initialized');
  }
  get courseAvailable(): number {
    return this.courseService.getCourses().length;
  }
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
