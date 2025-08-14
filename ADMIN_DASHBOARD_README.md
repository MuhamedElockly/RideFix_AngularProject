# Admin Dashboard Module - RideFix Angular Project

## Overview
This module provides a comprehensive admin dashboard for managing technicians and car owners in the RideFix system. It includes role-based access control, user management, and detailed user information display.

## Features

### 🔐 Role-Based Access Control
- **Admin Guard**: Protects admin routes from unauthorized access
- **User Role Detection**: Automatically detects user role from JWT token
- **Conditional Navigation**: Shows admin navigation only for admin users

### 📊 Dashboard Overview
- **Statistics Cards**: Display total technicians, car owners, requests, and active requests
- **Quick Actions**: Direct access to user management sections
- **Recent Activities**: Shows latest system activities
- **Responsive Design**: Works on all device sizes

### 👥 User Management
- **Technicians Management**: View and manage all registered technicians
- **Car Owners Management**: View and manage all registered car owners
- **Enhanced Tables**: Search, filter, and pagination for large datasets
- **User Details Modal**: Comprehensive user information display

### 🎨 Modern UI/UX
- **Professional Design**: Clean, modern interface with gradient backgrounds
- **Arabic RTL Support**: Full right-to-left language support
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects, animations, and smooth transitions

## File Structure

```
src/app/Components/AdminModule/
├── admin-module.ts                 # Main admin module container
├── admin-module.html              # Admin module template
├── admin-module.css               # Admin module styles
├── admin-nav-bar/                 # Admin navigation bar
│   ├── admin-nav-bar.ts
│   ├── admin-nav-bar.html
│   └── admin-nav-bar.css
├── admin-dashboard/               # Dashboard overview
│   ├── admin-dashboard.ts
│   ├── admin-dashboard.html
│   └── admin-dashboard.css
├── technicians-management/         # Technicians management
│   ├── technicians-management.ts
│   ├── technicians-management.html
│   └── technicians-management.css
├── car-owners-management/         # Car owners management
│   ├── car-owners-management.ts
│   ├── car-owners-management.html
│   └── car-owners-management.css
└── admin-statistics/              # Statistics and reports
    ├── admin-statistics.ts
    ├── admin-statistics.html
    └── admin-statistics.css
```

## Installation & Setup

### 1. Route Configuration
The admin routes are automatically added to `app.routes.ts`:

```typescript
{
  path: 'admin',
  component: AdminModule,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'technicians', component: TechniciansManagementComponent },
    { path: 'car-owners', component: CarOwnersManagementComponent },
    { path: 'statistics', component: AdminStatisticsComponent },
  ],
  canActivate: [adminGuard],
}
```

### 2. Navigation Integration
Admin navigation is automatically added to the main navbar when user has admin role:

```html
@if(userRole == 'Admin' || userRole == 'مدير'){
  <!-- Admin navigation items -->
}
```

### 3. API Integration
The admin service connects to the backend API endpoint:
- **Base URL**: `http://localhost:5038/api/Admin`
- **Users Endpoint**: `/users` - Get all users (technicians and car owners)
- **Dashboard Stats**: `/dashboard-stats` - Get dashboard statistics

## Usage

### Accessing the Admin Dashboard
1. **Login**: User must have admin role in their JWT token
2. **Navigation**: Admin links appear in the main navbar
3. **Direct Access**: Navigate to `/admin/dashboard`

### Managing Users
1. **View Users**: Navigate to technicians or car owners management
2. **Search & Filter**: Use search bar and status filters
3. **View Details**: Click "عرض" button to see detailed user information
4. **Pagination**: Navigate through large datasets with pagination controls

### User Details Modal
- **Profile Information**: Name, email, phone, role, status
- **Registration Details**: Registration date, last login
- **Additional Info**: Location, rating, completed requests, car count

## API Response Format

### Users Endpoint Response
```typescript
interface IApiResponse<IAdminUser[]> {
  data: IAdminUser[];
  success: boolean;
  message: string;
}

interface IAdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  profileImage?: string;
  registrationDate: Date;
  lastLoginDate?: Date;
  location?: string;
  rating?: number;
  completedRequests?: number;
  carCount?: number;
  requestCount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Styling & Theming

### Color Scheme
- **Primary**: #e74c3c (Red)
- **Secondary**: #2c3e50 (Dark Blue)
- **Accent**: #3498db (Blue)
- **Success**: #27ae60 (Green)
- **Warning**: #f39c12 (Orange)

### Design Features
- **Gradient Backgrounds**: Modern gradient overlays
- **Card-based Layout**: Clean, organized information display
- **Responsive Grid**: Bootstrap-based responsive system
- **Custom Components**: Tailored styling for admin interface

## Security Features

### Admin Guard
```typescript
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const userRole = authService.getRole();
    
    if (userRole && (userRole.toLowerCase().includes('admin') || userRole.toLowerCase().includes('مدير'))) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
```

### Role Validation
- Checks JWT token for admin role
- Redirects unauthorized users to appropriate pages
- Supports both English and Arabic role names

## Responsive Design

### Breakpoints
- **Desktop**: Full layout with side-by-side elements
- **Tablet**: Adjusted spacing and grid layouts
- **Mobile**: Stacked layout with optimized touch targets

### Mobile Features
- **Touch-friendly**: Large buttons and touch targets
- **Optimized Tables**: Horizontal scrolling for data tables
- **Responsive Modals**: Full-screen modals on small devices

## Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **CSS Features**: Uses modern CSS with fallbacks
- **JavaScript**: ES6+ features with TypeScript compilation

## Future Enhancements
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: Charts and graphs for data visualization
- **Bulk Operations**: Mass user management capabilities
- **Export Features**: CSV/PDF export of user data
- **Audit Logs**: Track admin actions and changes

## Troubleshooting

### Common Issues
1. **Admin Access Denied**: Check JWT token for admin role
2. **API Errors**: Verify backend endpoint availability
3. **Styling Issues**: Ensure CSS files are properly loaded
4. **Navigation Problems**: Check route configuration

### Debug Mode
Enable console logging for debugging:
```typescript
// In admin service
console.log('API Response:', response);
```

## Contributing
When adding new admin features:
1. Follow the existing component structure
2. Use consistent naming conventions
3. Implement proper error handling
4. Add responsive design considerations
5. Update this documentation

## License
This module is part of the RideFix Angular Project and follows the same licensing terms.
