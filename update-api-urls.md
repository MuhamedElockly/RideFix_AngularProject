# API URL Centralization Guide

## What has been implemented:

1. **Environment Configuration Files**:
   - `src/environments/environment.ts` - Development environment
   - `src/environments/environment.prod.ts` - Production environment

2. **Centralized API Configuration Service**:
   - `src/app/Services/api-config.service.ts` - Provides base URL and helper methods

3. **Updated Services**:
   - ✅ AuthService
   - ✅ CarService  
   - ✅ RequestService
   - ✅ ChatService
   - ✅ NotificationServices

## How to update remaining services:

### Step 1: Import the ApiConfigService
```typescript
import { ApiConfigService } from '../api-config.service';
```

### Step 2: Inject the service
```typescript
constructor(
  private http: HttpClient,
  private apiConfig: ApiConfigService
) {}
```

### Step 3: Replace hardcoded URLs
**Before:**
```typescript
return this.http.get('http://localhost:5038/api/endpoint');
```

**After:**
```typescript
return this.http.get(this.apiConfig.getApiUrl('endpoint'));
```

## Available methods:

- `this.apiConfig.baseUrl` - Gets the base URL (e.g., "http://localhost:5038/api")
- `this.apiConfig.getApiUrl('endpoint')` - Gets full URL for an endpoint
- `this.apiConfig.getApiUrlWithSubEndpoint('main', 'sub')` - Gets URL with sub-endpoint

## Services that still need updating:

Check these services for hardcoded URLs:
- AdminService
- AnimationService
- CategoryService
- Ecomerceservice
- LocationService
- MaintainanceService
- MTypesService
- PDFExportService
- ReviewService
- TechnicianService
- Technincalservice
- techRequestService
- TokenService
- UserStorageService
- SignalRServices (and sub-services)

## To change the API domain:

Simply update the `apiBaseUrl` in the environment files:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

Example:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'https://your-new-domain.com/api'  // Change this line
};
```

## Benefits:

1. **Single Point of Change**: Update API domain in one place
2. **Consistency**: All services use the same base URL
3. **Environment Management**: Different URLs for dev/prod
4. **Maintainability**: Easier to manage and update
5. **Type Safety**: Better error handling and validation

