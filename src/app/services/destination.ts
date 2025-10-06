import { Injectable } from '@angular/core';
import { Destination } from '../interfaces/destination';
import { ALL_DESTINATIONS } from '../data/destination-data';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private destinations: Destination[] = ALL_DESTINATIONS;

  constructor() { }

  // Method to get all destinations
  getDestinations(): Destination[] {
    return this.destinations;
  }

  // Method to get a single destination by its ID
  getDestinationById(id: number): Destination | undefined {
    return this.destinations.find(dest => dest.id === id);
  }
}