# Denis Tola - Personal Portfolio

A modern, minimal personal portfolio website built with Next.js 16, featuring a blog system, GitHub integration, and beautiful animations.

## ✨ Features

- **Modern Design**: Clean, minimal aesthetic with Geist fonts
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: System-aware theme switching with manual override
- **Interactive Terminal**: Animated terminal component on homepage
- **MDX Blog System**: File-based blog with markdown support
- **GitHub Integration**: Live repository data and contribution graph
- **Skills Visualization**: Animated progress bars and skill metrics
- **Contact Form**: Functional contact form with animations
- **Performance Optimized**: Built with Next.js 16 for optimal performance
- **SEO Ready**: Comprehensive meta tags and structured data

## 🛠 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Content**: MDX with gray-matter
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Date Handling**: date-fns

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/denistola/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Adding Blog Posts

Create new blog posts in the `content/blog/` directory:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
description: "Brief description of your post"
tags: ["React", "Next.js", "Web Development"]
---

# Your Content Here

Write your blog post content in MDX format...
```

## 🎨 Customization

### Personal Information

Update personal details in:

- `app/layout.tsx` - Meta tags and site title
- `app/page.tsx` - Hero section content
- `app/about/page.tsx` - About page content
- `components/Terminal.tsx` - Terminal commands
- `lib/metadata.ts` - Site configuration

### Styling

- Colors and themes: `app/globals.css`
- Component styles: Individual component files
- Dark mode: `components/ThemeProvider.tsx`

### GitHub Integration

Update GitHub username in `app/projects/page.tsx` to fetch real repository data.

## 📱 Pages

- **Home** (`/`) - Hero section with terminal and featured projects
- **About** (`/about`) - Personal story, skills, and experience
- **Projects** (`/projects`) - Portfolio projects and GitHub repositories
- **Blog** (`/blog`) - Blog posts with search and filtering
- **Contact** (`/contact`) - Contact form and social links

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/eaglemann/portfolio/issues).

---

Built with ❤️ by [Denis Tola](https://github.com/eaglemann)
