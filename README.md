# 🚗 Car Parts Bulgaria - Резервни части България

A modern e-commerce platform for car parts in Bulgaria, built with Next.js 14 and inspired by mobile.de design.

## 🎯 Project Overview

This is a specialized marketplace for car parts targeting the Bulgarian market, featuring:
- **Bilingual Support**: Bulgarian (primary) and English
- **Euro Currency**: All prices in EUR (€)
- **Mobile.de Inspired Design**: Clean, professional automotive marketplace design
- **Firebase Integration**: Shared authentication with main project
- **Mobile-First**: Responsive design optimized for all devices

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore (shared)
- **Authentication**: Firebase Auth (shared)
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🏗️ Project Structure

```
car-parts-bulgaria/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized pages
│   │   │   ├── page.tsx       # Home page
│   │   │   └── layout.tsx     # Layout wrapper
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   └── Header.tsx     # Mobile.de inspired header
│   │   └── ui/                # UI components
│   │       └── SearchBox.tsx  # Advanced search component
│   ├── lib/
│   │   ├── firebase.ts        # Firebase configuration
│   │   └── utils.ts           # Utility functions
│   ├── locales/               # Translation files
│   │   ├── bg.json           # Bulgarian translations
│   │   └── en.json           # English translations
│   ├── types/
│   │   └── index.ts          # TypeScript definitions
│   ├── i18n.ts               # Internationalization config
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static files
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- Firebase project (shared with main project)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd car-parts-bulgaria
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🎨 Design System

### Colors (Mobile.de Inspired)
- **Primary Blue**: `#0ea5e9` - Main brand color
- **Orange**: `#f97316` - Call-to-action buttons
- **Gray Scale**: Various shades for text and backgrounds
- **Success**: `#10b981` - Success states
- **Error**: `#ef4444` - Error states

### Typography
- **Font**: Inter (with Cyrillic support)
- **Sizes**: Responsive scale from 12px to 72px
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Cards**: Clean white cards with subtle shadows
- **Buttons**: Three variants (primary, secondary, orange)
- **Inputs**: Consistent form styling with focus states
- **Grid**: Responsive grid system for product listings

## 🌍 Localization

### Supported Languages
- **Bulgarian (bg)**: Primary language, Cyrillic script
- **English (en)**: Secondary language

### Translation Files
- `src/locales/bg.json` - Bulgarian translations
- `src/locales/en.json` - English translations

### URL Structure
- Bulgarian: `/bg/...`
- English: `/en/...`
- Default: Redirects to `/bg/`

## 🔧 Development Guidelines

### Code Standards
- **File Size Limit**: Maximum 300 lines per file
- **TypeScript**: Strict typing required
- **ESLint**: Code linting enabled
- **Prettier**: Code formatting

### Component Guidelines
- Use functional components with hooks
- Keep components focused and reusable
- Follow mobile.de design patterns
- Include proper TypeScript types

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: Use Tailwind utility classes
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔥 Firebase Integration

### Shared Collections
- `users` - User accounts (shared with main project)
- `vendors` - Vendor information (shared)
- `car_parts` - Car parts specific to this project
- `parts_orders` - Orders for car parts
- `parts_reviews` - Reviews and ratings

### Authentication
Uses Firebase Auth with shared session management across projects.

## 📱 Mobile.de Design Inspiration

### Key Design Elements
- **Clean Header**: Logo, search, user menu
- **Advanced Search**: Expandable filters
- **Card Grid**: Product listings in responsive grid
- **Professional Colors**: Blue, orange, gray palette
- **Typography**: Clear hierarchy and readability
- **Mobile First**: Touch-friendly interface

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🤝 Integration with Main Project

### Shared Resources
- Firebase project and authentication
- User/vendor accounts
- GitHub repository (linked)
- Design system consistency

### Port Configuration
- **Main Project**: Port 3000
- **Car Parts**: Port 3001 (this project)

## 📊 Performance

### Optimization Features
- Next.js App Router for optimal performance
- Image optimization with next/image
- Lazy loading of components
- Tailwind CSS purging for smaller bundle size
- TypeScript for better development experience

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflict**
   - Ensure main project uses port 3000
   - This project uses port 3001

2. **Firebase Connection**
   - Check environment variables
   - Verify Firebase project configuration

3. **Translation Issues**
   - Check JSON syntax in locale files
   - Verify middleware configuration

## 📝 Contributing

1. Follow the project structure and conventions
2. Keep files under 300 lines
3. Add TypeScript types for new features
4. Test on both desktop and mobile
5. Ensure Bulgarian/English translations

## 📄 License

This project is proprietary and confidential.

---

## 🎯 Next Steps

1. **Setup Firebase**: Configure shared Firebase project
2. **Add Content**: Populate with real car parts data
3. **Testing**: Add unit and integration tests
4. **SEO**: Implement meta tags and structured data
5. **Analytics**: Add Google Analytics or similar
6. **Performance**: Optimize images and loading

---

**Built with ❤️ for the Bulgarian automotive market**