# CommunityConnect - Community Organization Web App

A modern, responsive web application for community-based organizations built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Community Management**: Member profiles, roles, and achievements
- **Event System**: Create, manage, and attend community events
- **Volunteer Coordination**: Opportunities and programs for community involvement
- **Donation Platform**: Secure donation processing and impact tracking
- **News & Updates**: Community news, announcements, and stories
- **Contact System**: Multiple contact methods and inquiry forms
- **Customer Care Assistant**: AI-powered chat support for instant help
- **Admin Panel**: Comprehensive management dashboard for administrators
- **Responsive Design**: Mobile-first design that works on all devices

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Pages Included

- **Home** (`/`) - Hero section with community stats and features
- **About** (`/about`) - Organization history, mission, and team
- **Events** (`/events`) - Upcoming events and registration
- **Members** (`/members`) - Community member profiles and directory
- **Volunteer** (`/volunteer`) - Volunteer opportunities and applications
- **News** (`/news`) - Latest community news and announcements
- **Contact** (`/contact`) - Contact forms and information
- **Support** (`/support`) - Customer care chat assistant and FAQ
- **Donate** (`/donate`) - Donation platform with multiple options
- **Admin Panel** (`/admin-panel-fcc-2025`) - Management dashboard (admin only)

## 🎨 Design Features

- Modern gradient designs and animations
- Accessible color schemes and typography
- Interactive hover effects and transitions
- Mobile-responsive navigation
- Professional card layouts
- Consistent component styling

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── donate/            # Donation page
│   ├── events/            # Events page
│   ├── members/           # Members page
│   ├── news/              # News page
│   ├── volunteer/         # Volunteer page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── HomePage.tsx       # Home page content
└── types/
    └── index.ts           # TypeScript type definitions
```

## 💬 Customer Care Assistant

The application includes an AI-powered customer care assistant that provides instant support to users.

### Features

- **24/7 Availability**: AI assistant available round the clock
- **Context-Aware Responses**: Knows about your organization, events, and services
- **Multi-Channel Support**: Chat widget on all pages + dedicated support page
- **Admin Dashboard**: Manage chat sessions and user inquiries
- **Session Management**: Track and organize customer conversations

### Setup

1. **Get an OpenAI API Key**: Sign up at [OpenAI Platform](https://platform.openai.com/api-keys)

2. **Configure Environment Variables**:

   ```bash
   cp .env.example .env.local
   ```

   Add your OpenAI API key to `.env.local`:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Customize Assistant Behavior**: Edit the system prompt in `/src/app/api/chat/route.ts` to match your organization's tone and services.

### Usage

- **Users**: Click the chat bubble in the bottom-right corner or visit `/support`
- **Admins**: Access chat session management at `/admin-panel-fcc-2025/chat-sessions`

### Components

- `ChatWidget`: Floating chat button and modal
- `ChatInterface`: Full-page chat interface
- `ChatProvider`: Global state management
- Admin dashboard for session management

## 🎯 Community Features

### Member Management

- Member profiles with avatars and skills
- Leadership team showcase
- Member achievements and recognition
- Role-based member directory

### Event System

- Event categories and filtering
- RSVP and attendance tracking
- Event location and timing
- Community event calendar

### Volunteer Programs

- Multiple volunteer opportunities
- Skill-based matching
- Time commitment options
- Application and contact system

### Donation Platform

- One-time and recurring donations
- Impact tracking and statistics
- Multiple giving options
- Transparent fund allocation

## 🤝 Contributing

This is a community-driven project. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

For questions about this project or to get involved:

- Email: info@communityconnect.org
- Website: [Your Website URL]

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for the community by CommunityConnect

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
