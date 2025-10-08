import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

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

  // CHANGED: Defined the properties for the form
  contactDetails = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onFormSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.control.markAllAsTouched();
      return;
    }
    
    console.log('Contact Form Submitted!', this.contactDetails);
    alert('Thank you for contacting us! We will get back to you shortly.');
    this.contactForm.reset();
  }
}