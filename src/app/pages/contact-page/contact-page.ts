import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule for the form

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Add FormsModule
  templateUrl: './contact-page.html',
  styleUrls: ['./contact-page.css']
})
export class ContactPageComponent {

  // Object to hold the form's data
  contactDetails = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // This method is called when the form is submitted
  onFormSubmit(): void {
    console.log('Contact Form Submitted!', this.contactDetails);
    // In a real application, you would send this data to a backend API.
    alert('Thank you for contacting us! We will get back to you shortly.');
    
    // Optional: Reset the form after submission
    this.contactDetails = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}