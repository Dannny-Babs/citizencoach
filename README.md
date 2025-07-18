# CitizenCoach 🇨🇦

An AI-powered citizenship test preparation platform for Canadian citizenship applicants. CitizenCoach provides personalized quiz coaching, smart flashcards, and comprehensive test prep covering Canadian history, geography, government, and civic essentials.

## ✨ Features

- **AI-Powered Quiz Coach**: Personalized questions and explanations tailored to your knowledge gaps
- **Smart Flashcards**: Automatically generated flashcards with spaced repetition algorithms
- **Complete Coverage**: Study all citizenship test topics including Canadian history, geography, government, rights and responsibilities
- **Multi-Provider Support**: Works with OpenAI and Google Gemini AI models
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Chat Interface**: Interactive learning experience with AI tutor

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI Integration**: OpenAI GPT-4, Google Gemini
- **Deployment**: Vercel
- **UI Components**: Custom components with shadcn/ui patterns

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenAI API key (optional)
- Google Gemini API key (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dannny-Babs/citizencoach.git
   cd citizencoach
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
   
   > **Note**: If you see a warning about multiple lockfiles, you can safely ignore it. The build will use the appropriate lockfile automatically.

3. **Set up environment variables**
   Copy the example environment file and fill in your API keys:
   ```bash
   cp env.example .env.local
   ```
   
   Then edit `.env.local` and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
citizencoach/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── chat/          # Chat API endpoint
│   │   └── generate-flashcards/ # Flashcard generation API
│   ├── chat/              # Chat interface pages
│   │   ├── flashcards/    # Flashcard management
│   │   └── review/        # Review mode
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── utils/                # Helper functions
│   ├── llmClient.ts      # AI client implementation
│   ├── promptTemplates.ts # AI prompt templates
│   └── storage.ts        # Local storage utilities
└── public/               # Static assets
```

## 🎯 Usage

### Getting Started

1. Visit the landing page to learn about CitizenCoach
2. Click "Start Quiz" to begin your citizenship test preparation
3. Choose your preferred AI provider (OpenAI or Gemini)
4. Enter your API keys if not already configured
5. Start answering questions and learning!

### Features

- **Quiz Mode**: Answer questions and get instant feedback
- **Flashcard Generation**: Create personalized flashcards from your study sessions
- **Review Mode**: Review previously generated flashcards
- **Progress Tracking**: Monitor your learning progress

## 🔧 Configuration

### AI Providers

CitizenCoach supports multiple AI providers:

- **OpenAI**: Uses GPT-4 models for high-quality responses
- **Google Gemini**: Uses Gemini models for cost-effective alternatives

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `GEMINI_API_KEY`: Your Google Gemini API key

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for future Canadian citizens**
