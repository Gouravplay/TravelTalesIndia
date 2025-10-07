import { Injectable } from '@angular/core';
import { Destination } from '../interfaces/destination';
import { ALL_DESTINATIONS } from '../data/destination-data';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private destinations: Destination[] = [];

  constructor() {
    // Check if destinations are already in local storage
    const storedDestinations = localStorage.getItem('destinations');

    if (storedDestinations) {
      // If yes, parse the string and load them
      this.destinations = JSON.parse(storedDestinations);
    } else {
      // If no, load them from the data file and save to local storage
      this.destinations = ALL_DESTINATIONS;
      localStorage.setItem('destinations', JSON.stringify(this.destinations));
    }
  }

  // Method to get all destinations
  getDestinations(): Destination[] {
    return this.destinations;
  }

  // Method to get a single destination by its ID
  getDestinationById(id: number): Destination | undefined {
    return this.destinations.find(dest => dest.id === id);
  }
}