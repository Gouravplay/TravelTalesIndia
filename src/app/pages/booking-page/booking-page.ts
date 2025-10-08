import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Destination } from '../../interfaces/destination';
import { DestinationService } from '../../services/destination';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-page.html',
  styleUrls: ['./booking-page.css'],
  animations: [
    trigger('fieldErrorAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class BookingPageComponent implements OnInit {
  @ViewChild('bookingForm') bookingForm!: NgForm;

  allDestinations: Destination[] = [];
  selectedDestination: Destination | undefined;
  totalPrice: number = 0;

  // This object holds all the data from the form
  bookingDetails = {
    destinationId: null as number | null,
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    travelers: 1,
    requests: ''
  };

  constructor(
    public route: ActivatedRoute,
    private destinationService: DestinationService
  ) { }

  ngOnInit(): void {
    // Get all possible destinations to populate the dropdown
    this.allDestinations = this.destinationService.getDestinations();

    // Check if an ID was passed in the URL (e.g., from the destinations page)
    const destinationId = this.route.snapshot.paramMap.get('id');
    if (destinationId) {
      // If an ID exists, pre-select it in the form
      this.bookingDetails.destinationId = +destinationId;
      this.onDestinationChange(); // Trigger calculation and summary update
    }
  }

  // This runs whenever the user changes the destination in the dropdown
  onDestinationChange(): void {
    if (this.bookingDetails.destinationId) {
      const selectedId = Number(this.bookingDetails.destinationId);
      this.selectedDestination = this.destinationService.getDestinationById(selectedId);
      this.calculatePrice(); // Update the price when the destination changes
    } else {
      this.selectedDestination = undefined;
      this.totalPrice = 0;
    }
  }

  // This runs whenever the user changes the number of travelers
  calculatePrice(): void {
    if (this.selectedDestination && this.bookingDetails.travelers > 0) {
      this.totalPrice = this.selectedDestination.price * this.bookingDetails.travelers;
    } else {
      this.totalPrice = 0;
    }
  }

  // This runs when the user clicks the "Confirm Booking" button
  onSubmitBooking(): void {
    // Check if any of the required fields are invalid
    if (this.bookingForm.invalid) {
      // If invalid, mark all fields as 'touched' to display their error messages
      this.bookingForm.control.markAllAsTouched();
      console.log('Form is invalid');
      return; // Stop the function here
    }

    // If the form is valid, proceed with the booking logic
    console.log('Booking Submitted!', {
      destination: this.selectedDestination?.name,
      details: this.bookingDetails,
      totalPrice: this.totalPrice
    });

    // Save the booking to local storage
    const newBooking = {
      destination: this.selectedDestination?.name,
      destinationId: this.selectedDestination?.id,
      details: this.bookingDetails,
      totalPrice: this.totalPrice,
      bookingDate: new Date().toISOString()
    };
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    alert(`Thank you for your booking to ${this.selectedDestination?.name}!`);
    
    // Optionally, reset the form after a successful submission
    this.bookingForm.resetForm();
    this.selectedDestination = undefined;
    this.totalPrice = 0;
  }
}