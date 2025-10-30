# RideFix – Angular 20 Application

RideFix is a multi-role platform connecting car owners with technicians, including real-time chat, role-based admin dashboard, and an e‑commerce marketplace for automotive products. Built with Angular 20, RxJS, Bootstrap 5, and SignalR.

## Tech Stack
- Angular 20, Standalone Components and Angular Templates syntax
- RxJS 7
- Bootstrap 5, Font Awesome
- SignalR (`@microsoft/signalr`) for real-time chat and notifications
- JWT auth (client) with route guards and HTTP interceptor

## Project Structure (high level)
```
src/app/
  Components/
    AdminModule/                # Admin dashboard, stats, management
    Car_Owner_Components/
      CarEmergencyModule/       # Emergency request flow
      CarMaintainanceModule/    # Car profile, maintenance, history
    ChatModule/                 # Chat list, details, current chat
    e-Commerce_Components/      # Market, products, cart, details
    General/                    # Shared/landing/nav/unauthorized
    technical/                  # Technician flows & profile
  Gaurds/                       # admin, tech, car owner guards
  Services/                     # API, Auth, Chat, SignalR, etc.
  Interfaces/                   # Typed API models
  routes/auth.routes.ts         # Auth-related routes
app.routes.ts                   # Main routing configuration
```

## Features

### Authentication and Access Control
- Login flow with JWT decoding on client
- Route guards: `adminGuard`, `techGuard`, `carOwnerGuard`
- Unauthorized route and handling (`/unauthorized`)

### Real-Time Chat and Notifications
- One-to-one chat between car owners and technicians
- Components: `ChatComponent`, `ChatDetailsComponent`, `CurrentChat`
- Services: `ChatService` (history, send), `LiveChatService` (SignalR)
- Real-time incoming messages and auto-scroll in current chat view
- Notification service via SignalR hooks

### Admin Dashboard
- Role-gated admin area at `/admin`
- Dashboard with statistics (users, requests, activities)
- Management sections: technicians, car owners, reports, categories
- Admin statistics visualizations and recent activity feed
- Dedicated README with details: see `ADMIN_DASHBOARD_README.md`

### Car Owner Experience
- Home and navigation tailored for car owners
- Emergency request flow: request, waiting, technician selection
- Maintenance management: add car, add maintenance, history, profile
- Market integration (see e‑commerce below)

### Technician Experience
- Requests board: new, accepted, and details
- Technician profile and history
- Integrated chat with car owner
- Access to marketplace

### E‑Commerce Marketplace
- Market home (`ECommerceHomeComponent`)
- Product listing and filtering (`AllProductsComponents`)
- Product details (`ProductDetailsComponent`)
- Shopping cart (`CartPageComponent`)

### General UX
- Responsive layout with Bootstrap 5
- Modern UI patterns and RTL-friendly components
- Global navigation, footer, and landing page

## Routing Overview
Key route groups from `app.routes.ts`:
- `/CarOwner/...` guarded by `carOwnerGuard` (Home, Emergency, Tech Select, Waiting, Tech Details, Requests History, Car, Add Car/Maintenance, Maintenance History, Market, Products, Cart, Product Details)
- `/technician/...` guarded by `techGuard` (Requests, Accepted, Request Details, Profile, History, Services, Tech Chat, Market, Products, Cart, Product Details)
- `/admin/...` guarded by `adminGuard` (Dashboard, Technicians, Car Owners, Reports, Categories, Statistics)
- `/unauthorized` for blocked access
- `/` landing page for anonymous users

## Environment and API
- Environments: `src/environments/environment.ts`, `environment.prod.ts`
- API base URLs are centralized; see `update-api-urls.md` for changing endpoints
- Some local data/dev support via `db.json` (optional mock data)

## Development

### Prerequisites
- Node.js 18+
- Angular CLI 20+ (`npm i -g @angular/cli`)

### Install
```bash
npm install
```

### Start Dev Server
```bash
npm start
# or
ng serve
```
Open `http://localhost:4200/`.

### Build
```bash
npm run build           # production build
npm run build:dev       # development build
```
Outputs to `dist/`.

### Test
```bash
npm test
```

## NPM Scripts (from package.json)
- `start`: run dev server
- `build`: production build
- `build:dev`: development build
- `watch`: watch build (development)
- `test`: unit tests

## Notable Services and Modules
- Auth: token handling, user id extraction, interceptor for auth headers
- SignalR: real-time chat (`LiveChatService`) and notifications
- Admin: `AdminService` for stats and management endpoints
- E‑commerce: product listing, details, ratings, and cart models under `Interfaces`

## Additional Readmes
- `ADMIN_DASHBOARD_README.md`: Admin area details
- `LANDING_PAGE_README.md`: Landing-specific notes

## Contributing
1. Create a feature branch
2. Commit with conventional messages
3. Open a PR to `main`

## License
Proprietary – for educational and graduation project use.
