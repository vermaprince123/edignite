# Edignite NGO Website

A vibrant, creative, and child-friendly website for Edignite NGO built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🌟 Features

- **Vibrant Design**: Colorful, playful design perfect for a children's NGO
- **Fully Responsive**: Works beautifully on all devices
- **Smooth Animations**: Engaging animations with Framer Motion
- **Multiple Sections**:
  - Hero with mission statement
  - About Us with story
  - Programs showcase
  - Impact statistics with animated counters
  - Testimonials
  - Gallery
  - Events calendar
  - Blog/News section
  - Donation section
  - Volunteer signup form
  - Contact form

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

Edit the data in `lib/data.ts` to customize:
- NGO information
- Programs
- Impact statistics
- Events
- Blog posts
- Contact information

## 🎨 Design Features

- Gradient color schemes (orange, pink, purple)
- Animated counters for impact stats
- Interactive cards with hover effects
- Smooth scroll animations
- Child-friendly emojis and icons
- Beautiful gradient backgrounds

## 📧 Contact Information

Update contact details in `lib/data.ts`:
- Email
- Phone
- Address

## 📬 Email Service Setup

This website uses **Web3Forms** (free, unlimited emails) to handle contact and volunteer form submissions with **hCaptcha** spam protection.

### Setup Instructions:

1. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install `@hcaptcha/react-hcaptcha` which is required for spam protection.

2. **Get your free access key:**
   - Visit [https://web3forms.com](https://web3forms.com)
   - Sign up for a free account (no credit card required)
   - Create a new access key
   - Add your email: `edignitengo@gmail.com` as the recipient
   - **Enable hCaptcha** in your Web3Forms dashboard:
     - Go to [https://app.web3forms.com](https://app.web3forms.com)
     - Click on your form/access key
     - Under "Captcha Protection", select **hCaptcha**
     - Save the settings

3. **Configure environment variable:**
   - Create a `.env.local` file in the root directory
   - Add your access key:
     ```
     NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
     ```

4. **Restart your development server:**
   ```bash
   npm run dev
   ```

### Features:
- ✅ Free forever
- ✅ Unlimited emails per month
- ✅ No API rate limits
- ✅ hCaptcha spam protection (already integrated)
- ✅ Works with both Contact and Volunteer forms
- ✅ Automatic captcha reset after form submission

### hCaptcha Integration:
The forms use hCaptcha for spam protection. The site key `50b2fe65-b00b-4b9e-ad62-3ba471098be2` is already configured for free plans. Users must complete the captcha before submitting forms.

**Note:** If you don't set up the access key, forms will still work but emails won't be sent. You'll see an error message prompting users to contact you directly.

## 🌐 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
```

## 📄 License

MIT

