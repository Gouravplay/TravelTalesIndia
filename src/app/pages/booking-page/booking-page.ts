import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Destination } from '../../interfaces/destination';
import { DestinationService } from '../../services/destination';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-page.html',
  styleUrls: ['./booking-page.css']
})
export class BookingPageComponent implements OnInit {

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
    private destinationService: DestinationService
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
      // THE FIX IS HERE: Convert the string ID from the form to a number
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
    console.log('Booking Submitted!', {
      destination: this.selectedDestination?.name,
      details: this.bookingDetails,
      totalPrice: this.totalPrice
    });
    alert(`Thank you for your booking to ${this.selectedDestination?.name}! Total cost: ${this.totalPrice}`);
  }
}