import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptedRequestsComponent } from './accepted-requests';
import { TechrequestService } from '../../../Services/techRequestService/techrequest-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AcceptedRequestsComponent', () => {
  let component: AcceptedRequestsComponent;
  let fixture: ComponentFixture<AcceptedRequestsComponent>;
  let mockTechRequestService: jasmine.SpyObj<TechrequestService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const techRequestServiceSpy = jasmine.createSpyObj('TechrequestService', ['getacceptrequest']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AcceptedRequestsComponent],
      providers: [
        { provide: TechrequestService, useValue: techRequestServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    mockTechRequestService = TestBed.inject(TechrequestService) as jasmine.SpyObj<TechrequestService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedRequestsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load accepted requests on init', () => {
    const mockRequests = [
      {
        isCompleted: false,
        technicianId: 1,
        requestId: 1,
        carOwnerId: 1,
        description: 'Test request',
        carOwnerName: 'Test Owner',
        faceImageUrl: 'test.jpg',
        requestState: 1,
        timeStamp: '2024-01-01T00:00:00Z',
        endTimeStamp: '',
        category: 'Test Category'
      }
    ];

    mockTechRequestService.getacceptrequest.and.returnValue(of(mockRequests));

    fixture.detectChanges();

    expect(mockTechRequestService.getacceptrequest).toHaveBeenCalled();
    expect(component.acceptedRequests).toEqual(mockRequests);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading requests fails', () => {
    mockTechRequestService.getacceptrequest.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(component.acceptedRequests).toEqual([]);
  });

  it('should format timestamp correctly', () => {
    const timestamp = '2024-01-01T12:00:00Z';
    const formatted = component.formatTimestamp(timestamp);
    expect(formatted).toBeDefined();
  });

  it('should get correct status text', () => {
    expect(component.getRequestStatusText(1)).toBe('مقبول');
    expect(component.getRequestStatusText(2)).toBe('قيد التنفيذ');
    expect(component.getRequestStatusText(3)).toBe('مكتمل');
    expect(component.getRequestStatusText(null)).toBe('غير محدد');
  });

  it('should get correct status class', () => {
    expect(component.getStatusClass(1)).toBe('status-accepted');
    expect(component.getStatusClass(2)).toBe('status-in-progress');
    expect(component.getStatusClass(3)).toBe('status-completed');
    expect(component.getStatusClass(null)).toBe('status-unknown');
  });

  it('should navigate to request details', () => {
    const mockRequest = {
      isCompleted: false,
      technicianId: 1,
      requestId: 1,
      carOwnerId: 1,
      description: 'Test request',
      carOwnerName: 'Test Owner',
      faceImageUrl: 'test.jpg',
      requestState: 1,
      timeStamp: '2024-01-01T00:00:00Z',
      endTimeStamp: '',
      category: 'Test Category'
    };

    component.navigateToRequestDetails(mockRequest);

    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/technician/requestdetails'],
      { state: { data: mockRequest } }
    );
  });
}); 