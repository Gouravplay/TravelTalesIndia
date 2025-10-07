import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as AOS from 'aos';

// --- INTERFACES (Updated Food interface) ---
interface Destination {
  id: number;
  image: string;
  alt: string;
  title: string;
  description: string;
}

interface Food {
  image: string;
  alt: string;
  title: string;
  description: string;
  longDescription: string;
  mapUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  // --- DATA ---
  popularDestinations: Destination[] = [
    { id: 3, image: '/assets/images/taj_mahal.png', alt: 'Taj Mahal', title: 'Agra - Taj Mahal', description: 'A symbol of love and one of the Seven Wonders of the World.' },
    { id: 4, image: '/assets/images/jaipur.png', alt: 'Jaipur', title: 'Jaipur - Pink City', description: 'Explore forts, palaces, and vibrant Rajasthani culture.' },
    { id: 5, image: '/assets/images/kerala.png', alt: 'Kerala', title: 'Kerala - God\'s Own Country', description: 'Relax in houseboats, backwaters, and lush green landscapes.' }
  ];

  famousFoods: Food[] = [
    { 
      image: '/assets/images/biryani.png', 
      alt: 'Hyderabadi Biryani', 
      title: 'Hyderabadi Biryani', 
      description: 'A rich and aromatic rice dish.', 
      longDescription: 'Hyderabadi Biryani is a world-renowned dish from Hyderabad, India. Made with basmati rice, meat (chicken or mutton), and a blend of rich spices, it is cooked using the "dum" method, which allows the ingredients to cook in their own steam, making the flavors intense and aromatic.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160938171!2d78.26795852787355!3d17.41249911571473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1621876543210' 
    },
    { 
      image: '/assets/images/dosa.png', 
      alt: 'Masala Dosa', 
      title: 'Masala Dosa', 
      description: 'A crispy South Indian crepe.', 
      longDescription: 'Masala Dosa is a staple of South Indian cuisine. It is a thin, crispy crepe made from a fermented batter of rice and lentils, filled with a savory mixture of spiced potatoes. It is typically served with sambar and a variety of chutneys.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.35010698188!2d77.5945628!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167010000001%3A0x3f5e3f4a3e3b3e3e!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1621876543210' 
    },
    { 
      image: '/assets/images/chole_bhatura.png', 
      alt: 'Chole Bhature', 
      title: 'Chole Bhature', 
      description: 'Spicy chickpeas with fried bread.', 
      longDescription: 'Originating from the Punjab region, Chole Bhature is a hearty and popular dish across North India. It consists of spicy chickpea curry (chole) served with a fluffy, deep-fried bread called bhatura. It\'s a delicious and filling meal often enjoyed for breakfast or lunch.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.1637424266!2d76.81306781987595!3d28.647279935476943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1621876543210' 
    },
    { 
      image: '/assets/images/vadapav.png', 
      alt: 'Vada Pav', 
      title: 'Vada Pav', 
      description: 'The quintessential Mumbai street food.', 
      longDescription: 'Vada Pav is the heartbeat of Mumbai\'s street food scene. It consists of a deep-fried potato dumpling (vada) placed inside a soft bread bun (pav), often accompanied by spicy chutneys. It\'s a quick, delicious, and affordable snack beloved by millions.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48223.7788481481!2d72.82229651987595!3d19.082522935476943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1621876543210' 
    },
    { 
      image: '/assets/images/panipuri.png', 
      alt: 'Pani Puri', 
      title: 'Pani Puri / Golgappa', 
      description: 'A burst of flavor in a bite.', 
      longDescription: 'Known by many names across India, Pani Puri is a popular street snack. It consists of a hollow, crispy puri filled with a mixture of flavored water (pani), tamarind chutney, chili, chaat masala, potato, onion, and chickpeas. Each bite is a delightful explosion of sweet, sour, and spicy flavors.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14407.60833939632!2d73.0479383!3d25.3236087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3942109999999999%3A0x1b2b3b4b5b6b7b8b!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1621876543210' 
    },
    // --- NEW FOOD ITEMS ---
    { 
      image: '/assets/images/roganjosh.png', 
      alt: 'Rogan Josh', 
      title: 'Rogan Josh', 
      description: 'Aromatic Kashmiri lamb curry.', 
      longDescription: 'Rogan Josh is a staple of Kashmiri cuisine. It is a slow-cooked, aromatic curry made with lamb or mutton, braised in a gravy flavored with spices like Kashmiri red chili, fennel, and ginger. Its deep red color comes from the chilies.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.009308119038!2d76.57424931518118!3d32.2590199811327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b5e5a25f4a7c7%3A0x8f7d9c6e3b2b1d3d!2sKashmir!5e0!3m2!1sen!2sin!4v1621876543210' 
    },
    { 
      image: '/assets/images/dhokla.png', 
      alt: 'Dhokla', 
      title: 'Dhokla', 
      description: 'Savory steamed cake from Gujarat.', 
      longDescription: 'Dhokla is a vegetarian culinary dish from the Indian state of Gujarat. It is made with a fermented batter derived from rice and split chickpeas. It is often eaten for breakfast, as a main course, a side dish, or a snack.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47223.7788481481!2d72.57136281987595!3d23.022505935476943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4f7f6d5f7f8d8e7c!2sAhmedabad%2C%2g' 
    },
    { 
      image: '/assets/images/butterchicken.png', 
      alt: 'Butter Chicken', 
      title: 'Butter Chicken', 
      description: 'Creamy and rich chicken curry.', 
      longDescription: 'Butter chicken, or murgh makhani, is a classic where grilled chicken is simmered in a spicy, buttery, and creamy tomato gravy. This popular curry was developed in Delhi and is now a favorite in Indian restaurants worldwide.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.1637424266!2d76.81306781987595!3d28.647279935476943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1621876543210' 
    },
    { 
      image: '/assets/images/macherjhol.png', 
      alt: 'Macher Jhol', 
      title: 'Macher Jhol', 
      description: 'Classic Bengali fish curry.', 
      longDescription: 'Macher Jhol is a traditional Bengali and Odia spicy fish stew. It is a staple in the region, prepared with fish, potatoes, tomatoes, and a light gravy seasoned with turmeric, ginger, and garlic. It is typically eaten with rice.', 
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47223.7788481481!2d88.36389501987595!3d22.572646035476943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1621876543210' 
    }
  ];

  // --- MODAL & SLIDER LOGIC ---
  selectedFood: Food | null = null;
  safeMapUrl: SafeResourceUrl | null = null;

  @ViewChild('sliderTrack') sliderTrack!: ElementRef<HTMLDivElement>;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    AOS.init({ duration: 1000, once: true });
  }

  // Opens the modal with the selected food
  openFoodModal(food: Food): void {
    this.selectedFood = food;
    // Sanitize the URL to prevent security errors
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(food.mapUrl);
    document.body.classList.add('modal-open'); // Blur background
  }

  // Closes the modal
  closeFoodModal(): void {
    this.selectedFood = null;
    this.safeMapUrl = null;
    document.body.classList.remove('modal-open'); // Remove blur
  }

  // Slider navigation
  scrollSlider(direction: number): void {
    const scrollAmount = this.sliderTrack.nativeElement.clientWidth * 0.8; // Scroll by 80% of visible width
    this.sliderTrack.nativeElement.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
  }
}