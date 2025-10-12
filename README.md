# Physics Club Problem-Solving App

A modern web application designed specifically for high school Physics Club students to practice F=ma and USAPhO problems with progress tracking and live classroom features.

## Features

### 🎯 **Current Problem Page**
- Displays the current class problem set by instructors
- LaTeX/markdown support for mathematical equations
- Optional problem diagrams and images
- Collapsible hints and step-by-step solutions
- Live status updates during class (e.g., "Now solving part (a)...")
- Responsive design optimized for classroom projection

### 📊 **User Progress Tracking**
- Google Sign-In authentication
- Individual progress tracking across physics categories:
  - Kinematics, Forces, Energy, Rotation, Center of Mass, Momentum
  - Oscillations, Thermodynamics, Waves, Electricity, Magnetism, Optics, Modern Physics
- Visual progress bars and completion statistics
- Problem history and performance analytics

### 👨‍🏫 **Admin Dashboard**
- Create, edit, and delete physics problems
- Set current problem for live classroom teaching
- Upload problem images and diagrams
- Real-time classroom status updates
- LaTeX equation support for problem creation

### 📚 **Problem Library**
- Curated F=ma and USAPhO problem collection
- Difficulty ratings (1-5 stars)
- Category-based organization
- Search and filter capabilities
- Mark problems as solved with progress tracking

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Firebase Auth (Google Sign-In)
- **Database**: Cloud Firestore
- **UI Components**: Radix UI, Lucide Icons
- **Math Rendering**: KaTeX for LaTeX equations
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Authentication and Firestore enabled
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd physicsclubwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication with Google Sign-In provider
   - Enable Cloud Firestore database
   - Copy your Firebase config

4. **Environment Configuration**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Firebase credentials in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting Up Admin Users

1. Sign in to the app with your Google account
2. In Firebase Console, go to Firestore Database
3. Find your user document in the `users` collection
4. Set the `isAdmin` field to `true`
5. Refresh the app to see admin features

## Usage Guide

### For Students
1. **Sign In**: Use your Google account to authenticate
2. **Current Problem**: Follow along with live classroom problems
3. **Practice**: Browse and solve problems in the Progress section
4. **Track Progress**: Monitor your improvement across different physics topics

### For Instructors (Admin)
1. **Create Problems**: Add new F=ma/USAPhO problems with LaTeX support
2. **Set Current Problem**: Choose which problem to display for live teaching
3. **Live Updates**: Share real-time status during problem-solving sessions
4. **Manage Library**: Organize problems by category and difficulty

## Problem Format

Problems support LaTeX math rendering:
- Inline math: `$E = mc^2$`
- Block math: `$$F = ma$$`
- Complex equations: `$$\vec{F} = \frac{d\vec{p}}{dt}$$`

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Build the app: `npm run build`
3. Deploy: `firebase deploy`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please contact the Physics Club instructor or create an issue in this repository.