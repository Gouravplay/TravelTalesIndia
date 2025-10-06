export interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  type: 'Beach' | 'Mountain' | 'Historic' | 'City' | 'Spiritual';
  popularity: 'High' | 'Medium' | 'Low';
  price: number;
}