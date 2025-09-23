import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Destination {
  image: string;
  alt: string;
  title: string;
  description: string;
  routerLink: string;
}

interface Food {
  image: string;
  alt: string;
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  backgroundImage = 'beach.png'; // This is unused now that styles are in CSS

  // Array to hold popular destinations data
  popularDestinations: Destination[] = [
    {
      image: '/assets/images/taj_mahal.png', // <-- Corrected path
      alt: 'Taj Mahal',
      title: 'Agra - Taj Mahal',
      description: 'A symbol of love and one of the Seven Wonders of the World.',
      routerLink: '/booking'
    },
    {
      image: '/assets/images/jaipur.png', // <-- Corrected path
      alt: 'Jaipur',
      title: 'Jaipur - Pink City',
      description: 'Explore forts, palaces, and vibrant Rajasthani culture.',
      routerLink: '/booking'
    },
    {
      image: '/assets/images/kerala.png', // <-- Corrected path
      alt: 'Kerala',
      title: 'Kerala - God\'s Own Country',
      description: 'Relax in houseboats, backwaters, and lush green landscapes.',
      routerLink: '/booking'
    }
  ];

  // Array to hold famous foods data
  famousFoods: Food[] = [
    {
      image: './assets/images/biryani.png', // <-- Corrected path
      alt: 'Hyderabadi Biryani',
      title: 'Hyderabadi Biryani',
      description: 'A rich and aromatic rice dish from Hyderabad, full of spices and flavors.',
      link: '#'
    },
    {
      image: '/assets/images/dosa.png', // <-- Corrected path
      alt: 'Masala Dosa',
      title: 'Masala Dosa',
      description: 'A crispy South Indian crepe made of rice and lentils, filled with spicy potatoes.',
      link: '#'
    },
    {
      image: '/assets/images/chole_bhatura.png', // <-- Corrected path
      alt: 'Chole Bhature',
      title: 'Chole Bhature',
      description: 'A popular Punjabi dish of spicy chickpeas served with fluffy fried bread.',
      link: '#'
    }
  ];
}