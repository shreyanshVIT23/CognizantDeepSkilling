import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [this.simulateEmailCheck.bind(this)],
      ],
      courseId: ['', [Validators.required, this.noCourseCode.bind(this)]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }
  onSubmit() {
    console.log('value:', this.enrollForm.value);
    console.log('raw value:', this.enrollForm.getRawValue());
  }
  noCourseCode(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.toString().startsWith('XX')) {
      return { noCourseCode: true };
    }
    return null;
  }
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const email = control.value;
        if (email && email.includes('test@')) {
          resolve({
            emailTaken: true,
          });
        } else {
          resolve(null);
        }
      }, 800);
    });
  }
  get additionalCourses(): FormArray<FormControl<string | null>> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string | null>>;
  }
  addCourse() {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }
  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }
}
