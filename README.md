# Simple Contacts Application

A JavaScript contacts management application ported from Java, built with Webpack.

## Features

- Add new contacts with validation
- Edit contact information inline
- Delete contacts with confirmation
- Persistent storage using browser localStorage
- Responsive design for desktop and mobile
- Input validation matching original Java implementation

## Validation Rules

- Contact ID: Required, maximum 10 characters, must be unique
- First/Last Name: Required, maximum 10 characters each
- Phone: Required, exactly 10 digits, numbers only
- Address: Required, maximum 30 characters

## Technology Stack

- JavaScript (ES6+) with classes and modules
- Webpack 5 for module bundling and build optimization
- Babel for JavaScript transpilation
- CSS3 for styling
- ESLint and Prettier for code quality
- GitHub Pages for deployment

## Project Structure

```
contacts-app/
├── src/
│   ├── models/
│   │   └── Contact.js           # Contact class with validation
│   ├── services/
│   │   └── ContactService.js    # Contact management logic
│   ├── components/
│   │   └── ContactApp.js        # UI controller
│   ├── styles/
│   │   └── main.css            # Application styles
│   └── index.js                # Application entry point
├── index.html                  # HTML template
├── webpack.config.js           # Webpack configuration
├── package.json               # Dependencies and scripts
└── dist/                      # Built files (generated)
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will open at http://localhost:3000 with hot reloading.

### Building for Production

Create a production build:
```bash
npm run build
```

Built files will be in the dist/ directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build

## License

MIT License