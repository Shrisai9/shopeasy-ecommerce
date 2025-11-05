# Supabase Setup Guide for ShopEasy E-commerce

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project name: "shopeasy-ecommerce"
6. Enter database password (save this!)
7. Choose region closest to you
8. Click "Create new project"

## 2. Get Project Credentials

1. Go to Project Settings → API
2. Copy your project URL and anon key
3. Update `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Create Database Tables

Go to SQL Editor in Supabase and run these commands:

### Create Profiles Table
```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### Create Orders Table
```sql
-- Create orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'shipped', 'delivered')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Create Function to Handle New Users
```sql
-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function when new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 4. Configure Authentication

1. Go to Authentication → Settings
2. Configure these settings:

### Site URL
```
http://localhost:3000
```

### Redirect URLs (for production)
```
https://your-domain.com/**
```

### Email Templates (Optional)
- Customize confirmation and reset password emails
- Add your branding and styling

## 5. Test Authentication

1. Start your Next.js app: `npm run dev`
2. Go to `/register` and create a new account
3. Check your email for confirmation (if email confirmation is enabled)
4. Try logging in at `/login`
5. Check the Supabase dashboard → Authentication → Users to see registered users

## 6. Optional: Enable Email Confirmation

1. Go to Authentication → Settings
2. Toggle "Enable email confirmations"
3. Users will need to confirm their email before logging in

## 7. Production Setup

When deploying to production:

1. Update `.env.local` with production URLs
2. Add production domain to Supabase redirect URLs
3. Consider enabling additional security features:
   - Email confirmation
   - Password requirements
   - Rate limiting

## 8. Database Schema Overview

### Profiles Table
- `id` (UUID) - Links to auth.users
- `email` (TEXT) - User email
- `full_name` (TEXT) - User's full name
- `avatar_url` (TEXT) - Profile picture URL
- `created_at` / `updated_at` - Timestamps

### Orders Table
- `id` (TEXT) - Order ID
- `user_id` (UUID) - Links to auth.users
- `items` (JSONB) - Order items array
- `total` (DECIMAL) - Order total amount
- `status` (TEXT) - Order status
- `created_at` / `updated_at` - Timestamps

## 9. Security Features

✅ **Row Level Security (RLS)** - Users can only access their own data
✅ **Authentication** - Secure login/register with JWT tokens
✅ **Email Verification** - Optional email confirmation
✅ **Password Reset** - Built-in password reset functionality
✅ **Session Management** - Automatic token refresh

## 10. Next Steps

After setup, you can:
- Add more user profile fields
- Create product reviews table
- Add shopping cart persistence
- Implement order tracking
- Add admin roles and permissions

## Troubleshooting

**Common Issues:**

1. **Environment variables not loading**
   - Restart your dev server after updating `.env.local`
   - Make sure variables start with `NEXT_PUBLIC_`

2. **Database connection errors**
   - Check your project URL and anon key
   - Ensure tables are created with correct permissions

3. **Authentication not working**
   - Verify site URL in Supabase settings
   - Check browser console for errors

4. **RLS blocking queries**
   - Ensure policies are created correctly
   - Check if user is authenticated when making queries

Need help? Check the [Supabase documentation](https://supabase.com/docs) or the project's GitHub issues.