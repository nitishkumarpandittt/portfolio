# Nitish Kumar Pandit - Full Stack Developer Portfolio

A modern, SEO-optimized portfolio website built with Next.js 16, showcasing projects, skills, and professional experience.

## 🚀 Features

- **Next.js 16** with React 19 and App Router
- **SEO Optimized** for Google and other search engines
- **Responsive Design** - Perfect on all devices
- **Modern UI** built with Tailwind CSS v4 and shadcn/ui components
- **Dark Mode** support
- **Performance Optimized** with Next.js Image optimization
- **Structured Data** (JSON-LD) for rich search results
- **Sitemap & Robots.txt** for better crawling

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React, Tabler Icons, React Icons
- **Animations**: Motion One
- **State Management**: Zustand
- **Analytics**: Vercel Analytics & Speed Insights

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/nitishkumarpandittt/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the portfolio.

## ⚙️ Configuration

### Update Personal Information

Edit `src/config.ts` to update your personal information, projects, and skills:

```typescript
export const config = {
  developer: {
    name: "Your Name",
    title: "Your Title",
    bio: "Your bio",
    avatar: "Your avatar URL",
  },
  social: {
    github: "your-github-username",
    email: "your-email@example.com",
    location: "Your Location",
  },
  // Add your projects and skills
}
```

### SEO Configuration

1. Update `src/app/layout.tsx`:
   - Replace `https://yourportfolio.com` with your actual domain
   - Add your Google Search Console verification code
   - Update Twitter handle if you have one

2. Update `src/app/sitemap.ts`:
   - Replace `https://yourportfolio.com` with your actual domain

3. Update `public/robots.txt`:
   - Replace `https://yourportfolio.com` with your actual domain

4. Update `src/components/structured-data.tsx`:
   - Add your social media profiles
   - Add your education details
   - Update any other personal information

### Add Resume

Place your resume PDF file in the `public` folder as `resume.pdf`.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Update environment variables if needed

### Build for Production

```bash
npm run build
npm run start
```

## 📈 SEO Optimization

This portfolio is optimized for search engines with:

- ✅ Comprehensive meta tags
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD) for rich results
- ✅ Sitemap.xml for better crawling
- ✅ Robots.txt for search engine guidance
- ✅ Semantic HTML structure
- ✅ Mobile-responsive design
- ✅ Fast loading times
- ✅ Accessible design

### Post-Deployment SEO Steps

1. **Google Search Console**:
   - Add your site to [Google Search Console](https://search.google.com/search-console)
   - Submit your sitemap (`yoursite.com/sitemap.xml`)
   - Verify ownership and add verification code to `layout.tsx`

2. **Google Analytics** (Optional):
   - Set up [Google Analytics 4](https://analytics.google.com)
   - Add tracking ID to your site

3. **Social Media**:
   - Create an OG image (1200x630px) and save as `public/og-image.jpg`
   - Share your portfolio on LinkedIn, Twitter, etc.

4. **Build Backlinks**:
   - Add portfolio to GitHub profile
   - Share on dev.to, Medium, and other platforms
   - List on developer directories

## 📱 Screenshots

Add screenshots of your portfolio here.

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

- Email: workwithnitishhh@gmail.com
- GitHub: [@nitishkumarpandittt](https://github.com/nitishkumarpandittt)

---

Built with ❤️ by Nitish Kumar Pandit