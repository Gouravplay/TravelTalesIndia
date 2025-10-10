import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // This import is necessary
import { Destination } from '../../interfaces/destination';
import { DestinationService } from '../../services/destination';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- FormsModule must be added here
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
    private destinationService: DestinationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.allDestinations = this.destinationService.getDestinations();
    const destinationId = this.route.snapshot.paramMap.get('id');
    if (destinationId) {
      this.bookingDetails.destinationId = +destinationId;
      this.onDestinationChange();
    }
  }

  onDestinationChange(): void {
    if (this.bookingDetails.destinationId) {
      const selectedId = Number(this.bookingDetails.destinationId);
      this.selectedDestination = this.destinationService.getDestinationById(selectedId);
      this.calculatePrice();
    } else {
      this.selectedDestination = undefined;
      this.totalPrice = 0;
    }
  }

  calculatePrice(): void {
    if (this.selectedDestination && this.bookingDetails.travelers > 0) {
      this.totalPrice = this.selectedDestination.price * this.bookingDetails.travelers;
    } else {
      this.totalPrice = 0;
    }
  }

  onSubmitBooking(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.control.markAllAsTouched();
      this.toastr.error('Please fill out all required fields.', 'Invalid Form');
      return;
    }

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

    this.toastr.success(`Your booking to ${this.selectedDestination?.name} is confirmed!`, 'Booking Successful');

    this.bookingForm.resetForm();
    this.selectedDestination = undefined;
    this.totalPrice = 0;
  }
}