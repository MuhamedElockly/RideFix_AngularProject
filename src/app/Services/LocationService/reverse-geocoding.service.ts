import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay, retry } from 'rxjs/operators';

export interface CityInfo {
  city: string;
  country: string;
  state?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReverseGeocodingService {
  constructor(private http: HttpClient) {}

  
  getCityFromCoordinates(latitude: number, longitude: number): Observable<CityInfo> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
    
    return this.http.get<any>(url).pipe(
      delay(100),
      retry(2), 
      map(response => {
        if (!response || !response.address) {
          throw new Error('Invalid response from geocoding service');
        }
        
        const address = response.address;
        return {
          city: address.city || address.town || address.village || address.county || 'Unknown City',
          country: address.country || 'Unknown Country',
          state: address.state || address.province
        };
      }),
      catchError(error => {
        console.error('Error getting city from coordinates:', error);
        return of({
          city: 'Unknown City',
          country: 'Unknown Country'
        });
      })
    );
  }

 
  getCitiesFromCoordinates(coordinates: {latitude: number, longitude: number}[]): Observable<CityInfo[]> {
    if (coordinates.length === 0) {
      return of([]);
    }

    // Process coordinates in batches to avoid overwhelming the API
    const batchSize = 3; // Process 3 at a time with delays
    const results: CityInfo[] = [];
    
    return new Observable(observer => {
      let processed = 0;
      
      const processBatch = async () => {
        for (let i = 0; i < coordinates.length; i += batchSize) {
          const batch = coordinates.slice(i, i + batchSize);
          
          try {
            const batchPromises = batch.map(coord => 
              this.getCityFromCoordinates(coord.latitude, coord.longitude).toPromise()
            );
            
            const batchResults = await Promise.all(batchPromises);
            const validResults = batchResults.filter((result): result is CityInfo => result !== undefined);
            results.push(...validResults);
            processed += batch.length;
        
            if (i + batchSize < coordinates.length) {
              await new Promise(resolve => setTimeout(resolve, 200));
            }
          } catch (error) {
            console.error('Error processing batch:', error);
      
            const defaultCities = batch.map(() => ({
              city: 'Unknown City',
              country: 'Unknown Country'
            }));
            results.push(...defaultCities);
            processed += batch.length;
          }
        }
        
        observer.next(results);
        observer.complete();
      };
      
      processBatch().catch(error => {
        observer.error(error);
      });
    });
  }
}
