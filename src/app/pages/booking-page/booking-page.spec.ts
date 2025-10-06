import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// CHANGED: Use the correct component name
import { BookingPageComponent } from './booking-page';
import { DestinationService } from '../../services/destination';

// A mock ActivatedRoute to simulate a URL with an ID
const activatedRouteStub = {
  snapshot: {
    paramMap: {
      get: (key: string) => '1', // Simulate getting an ID of '1'
    },
  },
};

describe('BookingPageComponent', () => {
  // CHANGED: Use the correct component name
  let component: BookingPageComponent;
  let fixture: ComponentFixture<BookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // CHANGED: Use the correct component name
      imports: [BookingPageComponent],
      // Provide mock services for the component's dependencies
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: DestinationService, useClass: DestinationService }
      ]
    })
    .compileComponents();

    // CHANGED: Use the correct component name
    fixture = TestBed.createComponent(BookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});