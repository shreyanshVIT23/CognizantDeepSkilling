import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log("Home component destroyed");
  }
  ngOnInit(): void {
    this.courseAvailable = 12;
    console.log('Home component initialized');
  }
  courseAvailable = 0;
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
