import { ILocationData } from '../../Interfaces/Requests/ilocation-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetLocation {
  getLocation(): Promise<ILocationData | null> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData: ILocationData = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(locationData);
          },
          (error) => {
            console.error('Error getting location', error);
            reject(null);
          }
        );
      } else {
        alert('المتصفح لا يدعم تحديد الموقع الجغرافي');
        resolve(null);
      }
    });
  }
}
