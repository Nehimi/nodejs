# Modern Blog Frontend

A modern, responsive blog frontend built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX** with Tailwind CSS
- **Responsive Design** for all devices
- **Blog Management** with year-based organization
- **Search Functionality** for finding posts
- **User Authentication** (Login/Register)
- **Profile Management**
- **SEO Optimized** with proper meta tags
- **Fast Loading** with Vite build tool

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/            # UI components (buttons, inputs, etc.)
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   ├── blog/          # Blog-specific components
│   │   ├── auth/          # Authentication components
│   │   └── common/        # Common components
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── BlogPostPage.jsx
│   │   ├── BlogByYearPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── services/          # API services
│   ├── contexts/          # React contexts
│   ├── assets/            # Images, icons, etc.
│   └── styles/            # CSS and styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🌐 API Integration

The frontend is configured to work with the backend API at `http://localhost:3000`. The Vite proxy handles API requests automatically.

### API Endpoints Used

- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get specific blog post
- `GET /api/blog/by-year` - Get posts grouped by year
- `GET /api/search/posts` - Search blog posts
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

## 🎨 Customization

### Colors

Primary colors are defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Fonts

The project uses Inter font from Google Fonts. You can change this in `index.html`.

### Components

All components are modular and can be easily customized:

- **UI Components** in `src/components/ui/`
- **Layout Components** in `src/components/layout/`
- **Page Components** in `src/pages/`

## 📱 Responsive Design

The frontend is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` includes:

- Path aliases for cleaner imports
- Proxy configuration for API calls
- React plugin

### Tailwind Configuration

The `tailwind.config.js` includes:

- Custom color palette
- Custom animations
- Font configuration
- Responsive breakpoints

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` folder.

### Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect and build the project
3. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or issues, please:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🔄 Version History

- **v1.0.0** - Initial release with basic blog functionality
- **v1.1.0** - Added search functionality
- **v1.2.0** - Added year-based organization
- **v1.3.0** - Improved responsive design

## 🎯 Future Features

- [ ] Dark mode support
- [ ] Rich text editor
- [ ] Image upload
- [ ] Comment system
- [ ] Social sharing
- [ ] RSS feed
- [ ] Newsletter signup
- [ ] Analytics integration
