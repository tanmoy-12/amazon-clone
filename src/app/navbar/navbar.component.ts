import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  currentLocation = { latitude: 22.5726, longitude: 88.3639 }; // Default to Kolkata

  ngOnInit(): void {
    this.getCurrentLocation()
      .then((location) => {
        this.currentLocation = location;
        console.log('User Location:', this.currentLocation);
      })
      .catch((error) => {
        console.error(error.message);
        console.log('Using default location:', this.currentLocation);
      });
  }
  getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("User denied the request for Geolocation."));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Location information is unavailable."));
              break;
            case error.TIMEOUT:
              reject(new Error("The request to get user location timed out."));
              break;
            default:
              reject(new Error("An unknown error occurred."));
          }
        }
      );
    });
  }


}
