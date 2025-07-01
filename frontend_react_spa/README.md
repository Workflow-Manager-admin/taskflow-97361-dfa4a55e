# TaskVerse Frontend - React SPA

A modern, responsive React Single Page Application for task management with intuitive Kanban board interface.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/register with JWT tokens
- **Kanban Board**: Drag-and-drop task management across columns (To Do, In Progress, Done)
- **Task Management**: Create, edit, delete, and move tasks between columns
- **Real-time Updates**: Seamless API integration with backend
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization

### Technical Features
- **Modern React**: Built with React 18+ and functional components
- **Context API**: Centralized authentication state management
- **Protected Routes**: Route-level authentication guards
- **Drag & Drop**: Smooth drag-and-drop using @dnd-kit library
- **HTTP Client**: Axios for API communication with interceptors
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: User-friendly loading indicators throughout

### Design & UX
- **TaskVerse Branding**: Consistent color scheme (#2563eb, #64748b, #22d3ee)
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized bundle size and lazy loading
- **PWA Ready**: Service worker and manifest for progressive web app capabilities

## 🛠 Technology Stack

- **React 18.2.0**: Modern React with hooks and context
- **React Router 6.8.0**: Client-side routing with protected routes
- **@dnd-kit**: Modern drag-and-drop library (replacing deprecated react-beautiful-dnd)
- **Axios 1.6.0**: HTTP client with request/response interceptors
- **CSS3**: Modern CSS with custom properties and responsive design
- **Create React App**: Development toolchain and build system

## 📱 Responsive Design

### Mobile (< 768px)
- Single column Kanban layout
- Touch-optimized drag and drop
- Simplified navigation
- Optimized form layouts

### Tablet (768px - 1024px)
- Two-column Kanban layout
- Touch and mouse support
- Balanced UI elements

### Desktop (> 1024px)
- Three-column Kanban layout
- Full feature set
- Hover states and animations
- Keyboard shortcuts support

## 🎨 Color Scheme

TaskVerse uses a carefully selected color palette:

- **Primary Blue**: `#2563eb` - Main brand color, primary buttons, active states
- **Secondary Gray**: `#64748b` - Text, borders, secondary elements
- **Accent Cyan**: `#22d3ee` - Success states, completed tasks, highlights
- **Background**: `#f8fafc` - Main background, clean and modern
- **Text**: `#1e293b` - Primary text color for excellent readability

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm 8+

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd taskflow-97361-dfa4a55e/frontend_react_spa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   - Copy `.env.example` to `.env` if needed
   - Update `REACT_APP_API_URL` to point to your backend API

4. **Start development server**:
   ```bash
   npm start
   ```
   
   The app will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header with user menu
│   ├── KanbanBoard.js  # Main Kanban board with drag-drop
│   ├── TaskCard.js     # Individual task display
│   ├── TaskModal.js    # Task creation/editing modal
│   ├── SortableTaskCard.js # Drag-enabled task wrapper
│   └── ProtectedRoute.js   # Route protection component
├── contexts/           # React context providers
│   └── AuthContext.js  # Authentication state management
├── pages/              # Page-level components
│   ├── Login.js        # User login page
│   ├── Register.js     # User registration page
│   ├── Dashboard.js    # Main dashboard with Kanban
│   ├── Auth.css        # Shared authentication styles
│   └── Dashboard.css   # Dashboard-specific styles
├── App.js              # Main app component with routing
├── App.css             # Global styles and theme variables
├── index.js            # React app entry point
└── index.css           # Global CSS reset and base styles
```

## 🔐 Authentication Flow

1. **Registration**: Users create account with name, email, password
2. **Login**: Email/password authentication returns JWT token
3. **Token Storage**: JWT stored in localStorage with automatic headers
4. **Route Protection**: Protected routes redirect to login if unauthenticated
5. **Auto-login**: Token validation on app startup for seamless experience
6. **Logout**: Clear token and redirect to login

## 📋 Task Management

### Task Properties
- **Title**: Required, up to 200 characters
- **Description**: Optional, up to 1000 characters
- **Priority**: Low, Medium, High with color coding
- **Due Date**: Optional deadline with overdue indicators
- **Status**: Tracked by column position (To Do, In Progress, Done)

### Drag & Drop Behavior
- **Smooth Animations**: Visual feedback during drag operations
- **Auto-scroll**: Automatic scrolling when dragging near edges
- **Visual Indicators**: Clear drop zones and hover states
- **Keyboard Support**: Arrow keys and Enter for accessibility
- **Mobile Touch**: Touch-friendly drag and drop on mobile devices

## 🎯 API Integration

### Endpoints Used
- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `GET /api/me` - Get current user profile
- `GET /api/tasks` - Fetch user tasks and columns
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update existing task
- `DELETE /api/tasks/:id` - Delete task
- `PUT /api/tasks/order` - Update task position/column

### Request/Response Handling
- **Axios Interceptors**: Automatic JWT token attachment
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Retry Logic**: Automatic retry for failed requests
- **Response Validation**: Type checking and data validation

## 🎨 Styling Architecture

### CSS Organization
- **CSS Custom Properties**: Consistent theming with CSS variables
- **Component Scoping**: Each component has dedicated CSS file
- **Mobile First**: Responsive design starting from mobile breakpoints
- **Utility Classes**: Common patterns abstracted into utility classes

### Design Principles
- **Consistency**: Uniform spacing, typography, and colors
- **Accessibility**: High contrast ratios and focus indicators
- **Performance**: Minimal CSS bundle size with efficient selectors
- **Maintainability**: Clear naming conventions and organized structure

## 🔧 Development Guidelines

### Code Standards
- **ESLint**: Configured with React and accessibility rules
- **Prettier**: Consistent code formatting
- **PropTypes**: Type checking for component props (when needed)
- **Comments**: JSDoc comments for public interfaces

### Performance Optimization
- **Code Splitting**: Dynamic imports for large components
- **Memoization**: React.memo for expensive renders
- **Bundle Analysis**: Regular analysis of bundle size
- **Image Optimization**: Responsive images with proper formats

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
1. **Static Hosting**: Deploy `build/` folder to any static host
2. **CDN**: Upload to CloudFront, Netlify, or Vercel
3. **Docker**: Container-based deployment
4. **CI/CD**: Automated deployment with GitHub Actions

### Environment Variables
```bash
REACT_APP_API_URL=https://api.taskverse.com
GENERATE_SOURCEMAP=false
```

## 🧪 Testing

### Test Structure
```bash
npm test                # Run all tests
npm test -- --coverage # Run with coverage report
npm test -- --watch    # Run in watch mode
```

### Testing Strategy
- **Unit Tests**: Individual component testing
- **Integration Tests**: API integration testing
- **E2E Tests**: Complete user workflow testing
- **Accessibility Tests**: WCAG compliance testing

## 📱 Progressive Web App

### PWA Features
- **Service Worker**: Offline capability and caching
- **App Manifest**: Install prompt and app-like experience
- **Responsive**: Works on all device sizes
- **Fast**: Optimized loading and performance

### Installation
Users can install TaskVerse as a PWA on their devices for native app-like experience.

## 🔍 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions  
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS Safari 12+, Chrome Mobile 80+

## 📈 Performance Metrics

### Bundle Size
- **JavaScript**: ~87kB gzipped
- **CSS**: ~4kB gzipped
- **Total**: <100kB for initial load

### Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3.5s
- **Cumulative Layout Shift**: <0.1

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Ensure build passes
5. Submit pull request

### Code Style
- Follow existing patterns
- Add comments for complex logic
- Include propTypes for components
- Update documentation as needed

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include browser/device information
- Provide steps to reproduce

---

**TaskVerse Frontend** - Built with ❤️ using React and modern web technologies.
