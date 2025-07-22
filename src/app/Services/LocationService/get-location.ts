import { ILocationData } from './../../Interfaces/ilocation-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetLocation {
  ngOnInit() {
    this.getLocation();
  }

  getLocation(): ILocationData | null {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: ILocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log('Latitude:', locationData.latitude);
          console.log('Longitude:', locationData.longitude);
          return locationData;
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      alert('المتصفح لا يدعم تحديد الموقع الجغرافي');
    }
    return null;
  }
}
