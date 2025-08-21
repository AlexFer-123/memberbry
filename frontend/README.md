# 🎨 Memberbry Frontend

A modern, responsive Vue.js 3 frontend application for the Memberbry online course management platform, built with the Composition API and featuring a beautiful, accessible user interface.

## 🏗️ Architecture Overview

This frontend follows **Vue.js 3 best practices** with modern development patterns:

- **Composition API**: Modern reactive programming
- **Component-based architecture**: Reusable UI components
- **State management**: Centralized with Pinia
- **Routing**: SPA navigation with Vue Router
- **Styling**: Utility-first CSS with Tailwind
- **Accessibility**: WCAG compliant with Headless UI
- **File uploads**: Modern handling with Uppy.js

## 📁 Project Structure

```
frontend/
├── public/
│   ├── _redirects           # Netlify SPA redirects
│   ├── favicon.ico          # App favicon
│   └── index.html          # HTML template
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── global.css   # Global styles
│   │   └── logo.png        # App logo
│   ├── components/          # Reusable UI components
│   │   ├── microfrontend/   # Microfrontend components
│   │   │   ├── LoginMicrofrontend.vue # Reusable login component
│   │   │   ├── index.js     # Configuration utilities
│   │   │   └── README.md    # Microfrontend documentation
│   │   ├── ui/              # Shared UI components (shadcn-vue style)
│   │   │   ├── Alert.vue    # Alert component
│   │   │   ├── Button.vue   # Button component
│   │   │   ├── Card.vue     # Card components
│   │   │   ├── Input.vue    # Input component
│   │   │   └── index.js     # UI components export
│   │   ├── listLessons.vue  # Lesson list component
│   │   ├── NavBar.vue       # Navigation bar
│   │   ├── PopupNewVideo.vue # Video creation modal
│   │   ├── PopupUploadVideo.vue # Video upload modal
│   │   ├── SelectVideo.vue  # Video selection component
│   │   └── SideBar.vue     # Sidebar navigation
│   ├── examples/            # Usage examples
│   │   └── LoginMicrofrontendExample.vue # Microfrontend examples
│   ├── router/             # Routing configuration
│   │   ├── auth.js         # Authentication guards
│   │   ├── authenticationUser.js # User auth utilities
│   │   └── index.js        # Main router setup
│   ├── services/           # API communication
│   │   ├── http.js         # Axios HTTP client
│   │   └── pandaApi.js     # Panda Video API integration
│   ├── store/              # State management
│   │   ├── main.js         # Main Pinia store
│   │   └── user.js         # User state management
│   ├── views/              # Page components
│   │   ├── ConfigsPage.vue # Configuration page
│   │   ├── DashBoard.vue   # Admin dashboard
│   │   ├── HomePage.vue    # Landing page
│   │   ├── LessonEdit.vue  # Lesson editor
│   │   └── SignUp.vue      # User registration
│   ├── App.vue             # Root component
│   ├── global.css          # Additional global styles
│   └── main.js            # Application entry point
├── babel.config.js         # Babel configuration
├── jsconfig.json          # JavaScript project config
├── netlify.toml           # Netlify deployment config
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vue.config.js          # Vue CLI configuration
└── yarn.lock             # Yarn lockfile
```

## ✨ Key Features

### 🎨 **Modern UI/UX**
- **Tailwind CSS**: Utility-first styling framework
- **Headless UI**: Accessible, unstyled UI components
- **Heroicons**: Beautiful SVG icons
- **Responsive design**: Mobile-first approach
- **Dark/light mode ready**: Theme system prepared

### 🔐 **Authentication System**
- **JWT token management**: Secure authentication
- **Route guards**: Protected page access
- **Persistent sessions**: LocalStorage integration
- **Auto token refresh**: Seamless user experience
- **Login/logout flows**: Complete auth cycle

### 📚 **Course Management**
- **Lesson creation**: Rich lesson editor
- **Video integration**: Seamless video handling
- **Content organization**: Structured course layout
- **Progress tracking**: User progress monitoring
- **Interactive dashboard**: Admin panel

### 🎥 **Video Handling**
- **Uppy.js integration**: Modern file uploads
- **Multiple upload methods**: Drag & drop, file picker
- **Progress indicators**: Real-time upload feedback
- **Video preview**: Inline video player
- **External API integration**: Panda Video support

### 🧩 **Microfrontend Architecture**
- **Reusable login component**: Configurable and themeable
- **Multiple integration methods**: Direct import, NPM package, Module Federation
- **Multi-tenant support**: Different configurations per client
- **Event-driven communication**: Login success/error callbacks
- **Customizable validation**: Email and password rules
- **Theme system**: Default, minimal, and dark themes

### 🚀 **Performance & Optimization**
- **Vue 3 Composition API**: Better performance
- **Tree shaking**: Optimized bundle size
- **Lazy loading**: Route-based code splitting
- **Image optimization**: Efficient asset loading
- **PWA ready**: Service worker support

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start development server:**
```bash
npm run serve
# or
yarn serve
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🛠️ Technology Stack

### **Core Framework**
- **Vue.js 3**: Progressive JavaScript framework
- **Composition API**: Modern reactive programming
- **Single File Components**: Encapsulated component structure

### **State Management**
- **Pinia**: Next-generation Vue state management
- **Reactive stores**: Automatic reactivity
- **TypeScript support**: Type-safe state management

### **Routing**
- **Vue Router 4**: Official Vue.js router
- **Route guards**: Authentication protection
- **Nested routes**: Hierarchical navigation
- **Lazy loading**: Performance optimization

### **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Accessible UI components
- **Heroicons**: SVG icon library
- **PostCSS**: CSS processing
- **Responsive design**: Mobile-first approach

### **File Upload**
- **Uppy.js**: Modular file uploader
- **Dashboard UI**: Rich upload interface
- **Multiple sources**: Local files, URLs, cloud storage
- **Progress tracking**: Real-time upload feedback

### **HTTP Client**
- **Axios**: Promise-based HTTP client
- **Interceptors**: Request/response handling
- **Error handling**: Centralized error management
- **Token management**: Automatic JWT handling

## 🎯 Component Architecture

### **Reusable Components**
- **NavBar**: Application navigation with user menu
- **SideBar**: Collapsible sidebar navigation
- **PopupNewVideo**: Modal for creating new videos
- **PopupUploadVideo**: Modal for uploading videos
- **SelectVideo**: Video selection interface
- **listLessons**: Lesson listing with actions

### **Page Components (Views)**
- **HomePage**: Landing page with authentication
- **DashBoard**: Main admin dashboard
- **SignUp**: User registration form
- **ConfigsPage**: Application settings
- **LessonEdit**: Lesson creation/editing interface

### **Component Features**
- **Composition API**: Modern Vue 3 patterns
- **Props validation**: Type-safe component props
- **Emits declaration**: Clear component communication
- **Scoped styles**: Component-specific styling
- **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the frontend root:
```env
VUE_APP_API_URL=http://localhost:4567
VUE_APP_PANDA_CLIENT_ID=your_panda_client_id
```

### **Tailwind Configuration**
The `tailwind.config.js` includes:
- Custom color palette
- Extended spacing scale
- Custom font families
- Responsive breakpoints
- Plugin configurations

### **Vue Configuration**
The `vue.config.js` includes:
- Development server settings
- Build optimization
- Webpack customization
- Proxy configuration for API calls

## 🚦 Routing Structure

```
/                    # HomePage (public)
/register           # SignUp (public)
/dashboard          # DashBoard (protected)
/lessons/:id        # LessonEdit (protected)
/configs            # ConfigsPage (protected)
```

### **Route Guards**
- **Authentication required**: Protected routes check for valid JWT
- **Redirect logic**: Unauthenticated users redirected to login
- **Role-based access**: Future-ready for user roles

## 🎨 Styling System

### **Tailwind CSS Benefits**
- **Utility-first**: Rapid UI development
- **Consistent spacing**: Standardized design system
- **Responsive utilities**: Mobile-first responsive design
- **Dark mode support**: Built-in dark mode utilities
- **Customizable**: Extensive configuration options

### **Component Styling**
- **Scoped CSS**: Component-specific styles
- **CSS Modules**: Modular styling approach
- **Global styles**: Shared design tokens
- **Theme system**: Consistent color palette

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

### **Mobile-First Approach**
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized navigation for small screens

## 🔍 Code Quality

### **Best Practices Implemented**
- ✅ **Component composition**: Reusable component patterns
- ✅ **Reactive programming**: Vue 3 Composition API
- ✅ **Type safety**: JSDoc comments for better IDE support
- ✅ **Error boundaries**: Graceful error handling
- ✅ **Performance optimization**: Lazy loading and code splitting
- ✅ **Accessibility**: WCAG 2.1 compliance
- ✅ **SEO friendly**: Meta tags and structured data
- ✅ **Progressive enhancement**: Works without JavaScript

### **Development Tools**
- **ESLint**: Code linting and formatting
- **Vue DevTools**: Development debugging
- **Hot module replacement**: Fast development cycles
- **Source maps**: Easy debugging

## 🚀 Deployment

### **Netlify Configuration**
The project is configured for Netlify deployment:
- `netlify.toml`: Build and redirect configuration
- `_redirects`: SPA routing support
- Environment variables: Secure configuration management

### **Build Optimization**
- **Tree shaking**: Unused code elimination
- **Asset optimization**: Image and CSS optimization
- **Gzip compression**: Reduced bundle size
- **CDN integration**: Fast global delivery

### **Deployment Commands**
```bash
# Build for production
npm run build

# Deploy to Netlify (if CLI installed)
netlify deploy --prod --dir=dist
```

## 📈 Performance Metrics

### **Lighthouse Scores** (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+

### **Bundle Size Optimization**
- **Initial bundle**: < 250KB (gzipped)
- **Route-based splitting**: Lazy-loaded pages
- **Vendor chunks**: Separate library bundles
- **Asset optimization**: Compressed images and fonts

## 🧪 Testing Strategy

### **Recommended Testing Tools**
- **Vitest**: Unit testing framework
- **Vue Test Utils**: Vue component testing
- **Cypress**: End-to-end testing
- **Storybook**: Component documentation

### **Testing Patterns**
- Component unit tests
- Integration tests for complex workflows
- E2E tests for critical user journeys
- Visual regression testing

## 🧩 Microfrontend Usage

### **Login Microfrontend Component**

The project includes a fully reusable login microfrontend that can be integrated into other applications.

#### **Basic Usage**
```vue
<template>
  <LoginMicrofrontend
    api-base-url="https://your-api.com"
    title="Your Application"
    @login-success="handleLogin"
    @login-error="handleError"
  />
</template>

<script setup>
import LoginMicrofrontend from '@/components/microfrontend/LoginMicrofrontend.vue'

const handleLogin = (authData) => {
  console.log('User logged in:', authData)
  // Handle successful login
}

const handleError = (errorData) => {
  console.error('Login error:', errorData)
  // Handle login error
}
</script>
```

#### **Advanced Configuration**
```vue
<template>
  <LoginMicrofrontend v-bind="loginConfig" />
</template>

<script setup>
import { createLoginConfig } from '@/components/microfrontend/index.js'

const loginConfig = createLoginConfig({
  theme: 'minimal',
  apiConfig: {
    apiBaseUrl: 'https://api.company.com',
    authTokenKey: 'companyAuthToken'
  },
  texts: {
    title: 'Corporate Portal',
    subtitle: 'Employee Access Only'
  },
  features: {
    showRememberMe: true,
    showRegisterOption: false
  },
  validations: {
    email: (email) => ({
      isValid: email.endsWith('@company.com'),
      message: 'Use your corporate email'
    })
  }
})
</script>
```

#### **Available Themes**
- **default**: Modern gradient theme
- **minimal**: Clean, simple design
- **dark**: Dark mode theme

#### **Integration Methods**
1. **Direct Import**: Within the same Vue.js project
2. **NPM Package**: Publish and install as a library
3. **Module Federation**: Remote microfrontend consumption

For complete documentation, see: `src/components/microfrontend/README.md`

## 🔮 Future Enhancements

- [ ] **TypeScript migration**: Type-safe development
- [ ] **PWA features**: Offline support, push notifications
- [ ] **Internationalization**: Multi-language support
- [ ] **Advanced animations**: Framer Motion integration
- [ ] **Real-time features**: WebSocket integration
- [ ] **Advanced caching**: Service worker implementation
- [ ] **Component library**: Shared component system
- [ ] **Design system**: Comprehensive style guide
- [ ] **More microfrontends**: Dashboard, profile, settings components

## 🤝 Contributing

### **Development Guidelines**
1. Follow Vue.js 3 Composition API patterns
2. Use Tailwind CSS for styling
3. Ensure accessibility compliance
4. Write meaningful commit messages
5. Test components before submitting
6. Follow the established folder structure

### **Code Style**
- Use Composition API over Options API
- Prefer `<script setup>` syntax
- Use TypeScript-style prop definitions
- Follow Vue.js style guide conventions

---

Built with ❤️ using Vue.js 3, Tailwind CSS, and modern web technologies for an exceptional user experience.