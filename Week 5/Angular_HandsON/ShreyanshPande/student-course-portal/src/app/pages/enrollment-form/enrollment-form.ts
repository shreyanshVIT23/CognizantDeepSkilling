import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  enrollment = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: null,
    agreeToTerms: false,
  };
  onSubmit(form: NgForm) {
    console.log(form.valid);
    console.log(form.value);
    this.submitted = true;
  }
  submitted = false;
  resetForm(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }
}
