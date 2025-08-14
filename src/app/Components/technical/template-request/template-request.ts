import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core';
import { ItechRequect } from '../../../Interfaces/Technichan/itech-requect';
import Swal from 'sweetalert2';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { IcheckRequect } from '../../../Interfaces/Requests/icheck-requect';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IRequestApply } from '../../../Interfaces/Requests/irequest-apply';
import { UserStorageService } from '../../../Services/UserStorageService/user-storage-service';
import { Ickeekapply } from '../../../Interfaces/ickeekapply';
import { Ihistorytech } from '../../../Interfaces/Technichan/ihistorytech';
import { RequestWatchDogHub } from '../../../Services/SignalRServices/RequestWatchDogHub/request-watch-dog-hub';

import { Itechiciandetails } from '../../../Interfaces/Technichan/itechiciandetails';
import { Technincalservice } from '../../../Services/Technincalservice/technincalservice';
import { ReverseGeocodingService, CityInfo } from '../../../Services/LocationService/reverse-geocoding.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-template-request',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './template-request.html',
  styleUrls: ['./template-request.css'],
})
export class TemplateRequest implements OnInit, OnDestroy, OnChanges {
  @Input() request!: ItechRequect[];
  @Input() showBookingButton: boolean = false;
  @Input() applyrequest: Ickeekapply[] = [];
  @Input() Acecctrequest: Ihistorytech[] = [];

  requestWatchDog = inject(RequestWatchDogHub);
  reverseGeocodingService = inject(ReverseGeocodingService);

  // Filter properties
  selectedCity: string = '';
  availableCities: string[] = [];
  filteredRequests: ItechRequect[] = [];
  isLoadingCities: boolean = false;

  constructor(
    private techRequestService: TechrequestService,
    private router: Router,
    private userStorage: UserStorageService,
    private techServieces: Technincalservice
  ) {}
  requestcomplete: Ihistorytech[] = [];
    tech: Itechiciandetails | null = null;

  //  isLoading: boolean = true;
  ngOnInit(): void {
    this.requestWatchDog.startConnection();
    this.requestWatchDog.printConnectionState();

    this.techRequestService.gethistory().subscribe({
      next: (b) => {
        this.requestcomplete = b;
        console.log(this.requestcomplete);
        // this.isLoading = false;
      }});


    this.techServieces.gettechnician().subscribe({
      next: (b) => {
        this.tech = b;
        console.log('Technician details:', this.tech);
      },
    });


    this.initializeFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['request'] && changes['request'].currentValue) {
      // Reset filter state when requests change
      this.selectedCity = '';
      this.filteredRequests = [...this.request];
      
      // Only initialize filter if we have valid requests
      if (this.request && this.request.length > 0) {
        this.initializeFilter();
      } else {
        this.availableCities = [];
        this.isLoadingCities = false;
      }
    }

  }

  ngOnDestroy(): void {
    this.requestWatchDog.stopConnection();
  }

  
  private async initializeFilter() {
    if (this.request && this.request.length > 0) {
      this.isLoadingCities = true;
      
      try {
        // Get unique coordinates to avoid duplicate API calls
        const uniqueCoordinates = this.getUniqueCoordinates();
        
        if (uniqueCoordinates.length === 0) {
          this.setDefaultCities();
          return;
        }
        
        // Validate coordinates before making API calls
        const validCoordinates = uniqueCoordinates.filter(coord => 
          this.isValidCoordinate(coord.latitude, coord.longitude)
        );
        
        if (validCoordinates.length === 0) {
          console.warn('No valid coordinates found in requests');
          this.setDefaultCities();
          return;
        }
        
        // Get city information for all coordinates
        this.reverseGeocodingService.getCitiesFromCoordinates(validCoordinates)
          .subscribe({
            next: (cities: CityInfo[]) => {
              // Update requests with city information
              this.updateRequestsWithCities(cities);
              
              // Extract available cities for filter
              this.extractAvailableCities();
              
              // Initialize filtered requests
              this.filteredRequests = [...this.request];
              
              this.isLoadingCities = false;
            },
            error: (error) => {
              console.error('Error getting cities:', error);
              this.setDefaultCities();
              this.isLoadingCities = false;
            }
          });
      } catch (error) {
        console.error('Error initializing filter:', error);
        this.setDefaultCities();
        this.isLoadingCities = false;
      }
    } else {
      this.filteredRequests = [...this.request];
    }
  }

  
  private getUniqueCoordinates(): {latitude: number, longitude: number}[] {
    const coordinates = this.request.map(req => ({
      latitude: req.latitude,
      longitude: req.longitude
    }));
    
  
    return coordinates.filter((coord, index, self) => 
      index === self.findIndex(c => 
        c.latitude === coord.latitude && c.longitude === coord.longitude
      )
    );
  }

  /**
   * Update requests with city information
   */
  private updateRequestsWithCities(cities: CityInfo[]) {
    const coordinateToCity = new Map<string, string>();
    
    // Create a map of coordinates to cities
    cities.forEach((cityInfo, index) => {
      const uniqueCoordinates = this.getUniqueCoordinates();
      if (index < uniqueCoordinates.length) {
        const coord = uniqueCoordinates[index];
        const key = `${coord.latitude},${coord.longitude}`;
        coordinateToCity.set(key, cityInfo.city);
      }
    });
    
    // Update each request with city information
    this.request.forEach(req => {
      const key = `${req.latitude},${req.longitude}`;
      req.city = coordinateToCity.get(key) || 'Unknown City';
    });
  }

  /**
   * Extract available cities for the filter dropdown
   */
  private extractAvailableCities() {
    const cities = this.request
      .map(req => req.city)
      .filter((city, index, self) => city && self.indexOf(city) === index)
      .filter((city): city is string => city !== undefined)
      .sort();
    
    this.availableCities = cities;
    
    // If no cities are available, set a default message
    if (this.availableCities.length === 0) {
      console.warn('No cities available for filtering');
      this.availableCities = ['لا توجد مدن متاحة'];
    }
  }

  
  private setDefaultCities() {
    const defaultCities = [
      'القاهرة', 'الإسكندرية', 'الجيزة', 'شبرا الخيمة', 'بورسعيد', 
      'السويس', 'الأقصر', 'أسوان', 'أسيوط', 'بني سويف',
      'المنيا', 'سوهاج', 'قنا', 'الأقصر', 'أسوان'
    ];
    
  
    this.request.forEach((req, index) => {
      req.city = defaultCities[index % defaultCities.length];
    });
    
    this.extractAvailableCities();
    this.filteredRequests = [...this.request];
  }

 
  onCityFilterChange() {
    if (this.selectedCity && this.selectedCity !== '' && this.selectedCity !== 'لا توجد مدن متاحة') {
      this.filteredRequests = this.request.filter(req =>
        req.city === this.selectedCity
      );
      
  
      console.log(`Filtered requests by city: ${this.selectedCity}, Found: ${this.filteredRequests.length}`);
    } else {
      this.filteredRequests = [...this.request];
      console.log('Showing all requests (no city filter applied)');
    }
  }


  clearCityFilter() {
    this.selectedCity = '';
    this.filteredRequests = [...this.request];
  }

  hasAlreadyApplied(requestId: number): boolean {
    return (
      Array.isArray(this.applyrequest) &&
      this.applyrequest.some((app) => app.carOwnerRequestId === requestId)
    );
  }

  navigateToDetails(item: ItechRequect) {
    if (this.showBookingButton) {
      this.router.navigate(['/technician/requestdetailsalltech'], {
        state: { data: item },
      });
    } else {
      this.router.navigate(['/technician/requestdetails'], {
        state: { data: item },
      });
    }
  }

  confirmApprovalWithPassword(item: ItechRequect) {
    if (this.Acecctrequest.length >= 2) {
      Swal.fire({
        icon: 'warning',
        title: 'لا يمكن الموافقة',
        text: 'لقد قمت بالفعل بالموافقة على طلبين، لا يمكنك الموافقة على طلبات إضافية.',
        confirmButtonText: 'حسناً',
      });
      return;
    }

    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'من فضلك أدخل رمز PIN',
      input: 'password',
      inputLabel: 'كلمة المرور',
      inputPlaceholder: 'اكتب كلمة المرور هنا',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage('كلمة المرور مطلوبة');
        } else {
          return password;
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const password = result.value;

        const dto: IcheckRequect = {
          technicianId: item.technicianId,
          requestId: item.requestId,
          requestState: 1,
          pin: password,
        };

        this.techRequestService.putcheck(dto).subscribe({
          next: (res) => {
            if (res.success) {
              this.requestWatchDog.acceptrequest(1);
              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
              }).then(() => {
                this.router.navigate(['/technician/accepted-requests']);
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: res.message,
              });
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'حدث خطأ',
              text: 'كلمة المرور غير صحيحة',
            });
          },
        });
      }
    });
  }

  confirmApprovalWithPasswordApply(item: ItechRequect) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'من فضلك أدخل رمز PIN',
      input: 'password',
      inputLabel: 'كلمة المرور',
      inputPlaceholder: 'اكتب كلمة المرور هنا',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage('كلمة المرور مطلوبة');
        } else {
          return password;
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const password = result.value;

        // const userId = this.userStorage.getUserId();

        const userId = localStorage.getItem('techid');


        const dto: IRequestApply = {
          requestId: item.requestId,
          userId: userId !== null ? Number(userId) : 0,
          timeStamp: new Date().toISOString(),
          pin: Number(password),
        };

        this.techRequestService.putapply(dto).subscribe({
          next: (res) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'تمت الموافقة',
              }).then(() => {
                // this.router.navigate(['/technician/techservieces']);
                                window.location.reload();

              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: res.message,
              });
            }
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'حدث خطأ',
              text: 'كلمة المرور غير صحيحة',
            });
          },
        });
      }
    });
  }

  /**
   * Validate if coordinates are within reasonable bounds
   */
  private isValidCoordinate(latitude: number, longitude: number): boolean {
    return !isNaN(latitude) && !isNaN(longitude) &&
           latitude >= -90 && latitude <= 90 &&
           longitude >= -180 && longitude <= 180 &&
           latitude !== 0 && longitude !== 0; // Avoid 0,0 coordinates which are often invalid
  }
}
