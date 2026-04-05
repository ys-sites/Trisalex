# Trisalex Painting - Professional Painting Services

A high-end, professional painting service website for Montreal and the West Island.

## Features
- **Modern UI**: Built with React, Tailwind CSS, and Motion.
- **SEO Optimized**: Includes meta tags, Open Graph, Twitter cards, and JSON-LD structured data.
- **Interactive Background**: Custom spotlight reveal effect on the contact page.
- **Lead Generation**: Integrated with a Lead Connector webhook for form submissions.
- **Multi-language Support**: i18next integration for English and French.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4.
- **Animations**: Motion (formerly Framer Motion).
- **Icons**: Lucide React.
- **Routing**: React Router 7.
- **Internationalization**: i18next.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-example
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your webhook URL:
   ```env
   VITE_CONTACT_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
   ```

### Development
Run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### Building for Production
Build the project:
```bash
npm run build
```
The output will be in the `dist/` directory.

## Deployment

### Vercel
This project is ready for Vercel. Simply connect your GitHub repository and Vercel will automatically detect the build settings.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Vite

### GitHub Pages
You can also deploy to GitHub Pages by building the project and serving the `dist` folder.

## License
MIT
