import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr'; // 1. Import ToastrService

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-page.html',
  styleUrls: ['./contact-page.css'],
  animations: [
    trigger('fieldErrorAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ContactPageComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  contactDetails = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // 2. Inject ToastrService in the constructor
  constructor(private toastr: ToastrService) {}

  // 3. Updated the submission logic completely
  onFormSubmit(): void {
    if (this.contactForm.invalid) {
      // Show an error toast if the form is invalid
      this.toastr.error('Please fill out all required fields correctly.', 'Invalid Form');
      this.contactForm.control.markAllAsTouched();
      return;
    }
    
    // Save the submission to local storage
    const newContactSubmission = {
      ...this.contactDetails,
      submittedAt: new Date().toISOString()
    };
    const existingSubmissions = JSON.parse(localStorage.getItem('contacts') || '[]');
    existingSubmissions.push(newContactSubmission);
    localStorage.setItem('contacts', JSON.stringify(existingSubmissions));

    // Show a success toast instead of the old alert
    this.toastr.success('Thank you for your message!', 'Sent Successfully');

    // Reset the form after successful submission
    this.contactForm.resetForm();
  }
}