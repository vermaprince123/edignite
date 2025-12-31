# Gallery Images Setup Guide

## ✅ Enhanced Gallery Features

The gallery now includes:
- **Clickable preview cards** on the main gallery section
- **Dedicated gallery page** (`/gallery`) with full image grid
- **Category filtering** (All, Education, Arts, Events, Sports, Community)
- **Lightbox modal** with full-screen image view
- **Keyboard navigation** (Arrow keys to navigate, Escape to close)
- **Beautiful placeholders** until real images are added

## 📸 How to Add Real Images

### Step 1: Download Images
Download images from Edignite's social media:
- **Instagram**: https://www.instagram.com/ed_ignite/
- **LinkedIn**: https://in.linkedin.com/company/edignite-ngo
- **Facebook**: https://www.facebook.com/socialindiagroup.in/

### Step 2: Save Images
Save images to `/public/gallery/` folder with these naming conventions:
- `education-1.jpg`, `education-2.jpg`, `education-3.jpg`
- `arts-1.jpg`, `arts-2.jpg`
- `events-1.jpg`, `events-2.jpg`, `events-3.jpg`
- `sports-1.jpg`, `sports-2.jpg`
- `community-1.jpg`, `community-2.jpg`

### Step 3: Image Specifications
- **Format**: JPG or PNG
- **Size**: 1200x1200px (square) or 1200x800px (landscape)
- **File size**: Optimize to under 500KB for fast loading
- **Quality**: High quality, clear images

### Step 4: Enable Images
Once images are added, update `app/gallery/page.tsx`:

Find this function:
```typescript
const imageExists = (imagePath: string) => {
  return false; // Set to true when you add real images
};
```

Change to:
```typescript
const imageExists = (imagePath: string) => {
  // Images will automatically load if they exist in /public/gallery/
  return true;
};
```

Or better yet, remove the `imageExists` check entirely - Next.js Image component will handle missing images gracefully.

## 🎨 Current Placeholder System

The gallery currently uses beautiful gradient placeholders with:
- Category-specific colors
- Relevant icons (📚 for Education, 🎨 for Arts, etc.)
- Smooth animations
- Professional appearance

## 📁 Image Categories

1. **Education** (`education-*`)
   - Learning sessions
   - Classroom activities
   - Teaching moments
   - Science workshops

2. **Arts** (`arts-*`)
   - Artwork showcases
   - Drawing sessions
   - Creative workshops
   - Children's creations

3. **Events** (`events-*`)
   - Foundation Day
   - NCC Exhibition Visit
   - Christmas Celebration
   - Volunteer Recruitment

4. **Sports** (`sports-*`)
   - Sports activities
   - Physical games
   - Outdoor activities
   - Team building

5. **Community** (`community-*`)
   - Community outreach
   - Volunteer meets
   - Community gatherings
   - Social events

## 🚀 Features

- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized images and lazy loading
- **Smooth Animations**: Framer Motion animations
- **Category Filtering**: Easy navigation by category
- **Lightbox View**: Full-screen image viewing
- **Keyboard Support**: Arrow keys and Escape key
- **Image Counter**: Shows current position (e.g., "3 / 12")

## 📝 Notes

- Images are automatically optimized by Next.js
- Placeholders will be replaced when real images are added
- All images should be properly named and categorized
- Consider image compression for better performance

