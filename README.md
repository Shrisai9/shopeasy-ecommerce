# ShopEasy - Modern E-commerce Platform

A full-featured e-commerce platform built with Next.js 14, Supabase, and TypeScript.

## 🚀 Features

### 🛍️ **E-commerce Core**
- Product catalog with search and filtering
- Shopping cart with real-time updates
- Secure checkout process
- Order history and tracking
- Wishlist functionality

### 🔐 **Authentication & Security**
- Supabase authentication
- User registration and login
- Protected routes
- Row Level Security (RLS)
- JWT token management

### 📱 **User Experience**
- Responsive design for all devices
- Modern, clean UI/UX
- Loading states and error handling
- Real-time cart updates
- Wishlist with heart animations

### 👨‍💼 **Admin Features**
- Admin dashboard
- User management
- Order tracking
- System statistics
- Data export functionality

### 🎨 **Design & Performance**
- Next.js 14 with App Router
- TypeScript for type safety
- Optimized images with Next.js Image
- CSS Grid and Flexbox layouts
- Mobile-first responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, CSS3
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Styling**: Custom CSS with modern features
- **State Management**: React Context API

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopeasy-ecommerce.git
   cd shopeasy-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Follow the detailed guide in `SUPABASE_SETUP.md`
   - Create your Supabase project
   - Run the SQL commands to create tables
   - Get your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel

1. **Follow the deployment guide** in `VERCEL_DEPLOYMENT.md`
2. **Push to GitHub**
3. **Connect to Vercel**
4. **Add environment variables**
5. **Deploy!**

**Quick Deploy Button:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/shopeasy-ecommerce)

## 📖 Documentation

- **[Supabase Setup Guide](SUPABASE_SETUP.md)** - Complete database setup
- **[Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)** - Production deployment
- **[API Documentation](docs/API.md)** - API endpoints and usage
- **[Component Documentation](docs/COMPONENTS.md)** - React components guide

## 🎯 Usage

### For Customers
1. **Browse Products** - View product catalog with search and filters
2. **Add to Cart** - Add items to shopping cart
3. **Wishlist** - Save items for later
4. **Register/Login** - Create account for checkout
5. **Checkout** - Complete purchase with order tracking
6. **Profile** - View order history and account details

### For Admins
1. **Admin Dashboard** - Access at `/admin`
2. **User Management** - View all registered users
3. **Order Tracking** - Monitor all orders and statuses
4. **Data Export** - Download user and order data
5. **System Stats** - View platform analytics

## 🔧 Development

### Project Structure
```
shopeasy-ecommerce/
├── app/                    # Next.js 14 App Router
│   ├── components/         # Reusable components
│   ├── context/           # React Context providers
│   ├── (pages)/           # Route pages
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
│   └── supabase.ts       # Supabase client
├── public/               # Static assets
└── docs/                 # Documentation
```

### Key Components
- **AuthContext** - Authentication state management
- **CartContext** - Shopping cart functionality
- **WishlistContext** - Wishlist management
- **ProductCard** - Product display component
- **SearchFilter** - Product search and filtering

### Database Schema
- **profiles** - User profile information
- **orders** - Order history and details
- **auth.users** - Authentication (managed by Supabase)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Supabase** - Backend as a Service
- **Vercel** - Deployment platform
- **Unsplash** - Product images
- **React** - UI library

## 📞 Support

- **Documentation**: Check the guides in `/docs`
- **Issues**: [GitHub Issues](https://github.com/yourusername/shopeasy-ecommerce/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/shopeasy-ecommerce/discussions)

## 🎉 Demo

**Live Demo**: [https://shopeasy-ecommerce.vercel.app](https://shopeasy-ecommerce.vercel.app)

**Test Credentials**:
- Email: demo@shopeasy.com
- Password: demo123

---

**Built with ❤️ using Next.js and Supabase**