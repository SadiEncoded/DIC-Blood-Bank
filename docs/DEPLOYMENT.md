# Deployment Checklist

## Pre-Deployment Verification

### ✅ Backend Architecture
- [x] All services implemented and tested
- [x] Error handling standardized
- [x] Logging system in place
- [x] Validation schemas complete
- [x] Base service pattern established

### ✅ Code Quality
- [x] No TypeScript errors
- [x] Consistent code patterns
- [x] Proper error handling
- [x] Type-safe operations

### 🔄 Environment Setup

#### Required Environment Variables

Create a `.env.local` file with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

#### Vercel Deployment Variables

Add these in Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 🗄️ Database Verification

#### 1. Check RLS Policies

```sql
-- Verify RLS is enabled on all tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

All tables should have `rowsecurity = true`.

#### 2. Verify Functions

```sql
-- Check trigger function exists
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name = 'handle_new_user';
```

#### 3. Test Database Connection

```bash
# From your local machine
npm run dev
# Navigate to http://localhost:3000
# Try signing up a test user
```

### 🔐 Security Checklist

- [x] RLS policies active on all tables
- [x] Admin routes protected by middleware
- [x] Server actions validate authentication
- [x] Input validation on all forms
- [x] Rate limiting on contact form
- [ ] CORS configured (if using API routes)
- [ ] CSP headers configured
- [ ] Security headers in next.config.js

### 📊 Performance Optimization

#### 1. Build Optimization

```bash
# Run production build
npm run build

# Check bundle size
npm run build -- --profile
```

#### 2. Image Optimization

- [ ] All images use Next.js Image component
- [ ] Images are properly sized
- [ ] WebP format where possible

#### 3. Code Splitting

- [x] Dynamic imports for heavy components
- [x] Services loaded dynamically in actions
- [ ] Route-based code splitting

### 🧪 Testing

#### Manual Testing Checklist

**Authentication Flow**:
- [ ] Sign up new user
- [ ] Login existing user
- [ ] Logout
- [ ] Profile dropdown shows correct info
- [ ] Admin dashboard accessible for admin users

**Blood Request Flow**:
- [ ] Submit blood request (logged in)
- [ ] Receive tracking ID
- [ ] Search for donors with tracking ID
- [ ] Contact donor
- [ ] View request status

**Donor Features**:
- [ ] Search donors by blood type
- [ ] Filter by location
- [ ] View donor profiles
- [ ] Update availability

**Admin Features**:
- [ ] View all blood requests
- [ ] Approve/reject requests
- [ ] Manage events
- [ ] View contact messages
- [ ] Verify donors

**Forms**:
- [ ] Contact form submission
- [ ] Blood request form validation
- [ ] Signup form validation
- [ ] Error messages display correctly

### 🚀 Deployment Steps

#### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Backend standardization complete"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Configure Custom Domain** (Optional)
   - Add domain in Vercel dashboard
   - Update DNS records
   - Enable SSL (automatic)

#### Option 2: Self-Hosted

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Use Process Manager**
   ```bash
   # Install PM2
   npm install -g pm2

   # Start app
   pm2 start npm --name "blood-bank" -- start

   # Save process list
   pm2 save

   # Setup startup script
   pm2 startup
   ```

### 📝 Post-Deployment

#### 1. Verify Deployment

- [ ] Visit deployed URL
- [ ] Test signup/login
- [ ] Submit test blood request
- [ ] Check admin dashboard
- [ ] Verify all pages load correctly

#### 2. Monitor Errors

```bash
# Check Vercel logs
vercel logs

# Or check your hosting provider's logs
```

#### 3. Setup Monitoring

**Recommended Tools**:
- **Sentry** - Error tracking
- **Vercel Analytics** - Performance monitoring
- **Google Analytics** - User analytics

#### 4. Database Backups

```bash
# Setup automated backups in Supabase dashboard
# Settings → Database → Backups
```

### 🔧 Troubleshooting

#### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

#### Database Connection Issues

1. Check environment variables are set
2. Verify Supabase project is active
3. Check RLS policies aren't blocking queries

#### Authentication Issues

1. Verify Supabase auth is enabled
2. Check redirect URLs in Supabase dashboard
3. Ensure cookies are enabled

### 📊 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 300KB (initial)

### 🎯 Success Criteria

- [ ] All pages load without errors
- [ ] Authentication works correctly
- [ ] Blood requests can be submitted
- [ ] Donor search functions properly
- [ ] Admin features accessible
- [ ] Forms validate correctly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast page loads (< 3s)

### 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Review server logs
3. Verify environment variables
4. Check Supabase dashboard for database issues
5. Review [BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md)

---

**Last Updated**: 2025-12-27
**Status**: Ready for Deployment ✅
