#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => readline.question(query, resolve));
}

function formatColor(color) {
  // Handle hex colors
  if (color.startsWith('#')) {
    return color.toLowerCase();
  }
  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    return color;
  }
  // Add # prefix if missing
  if (color.match(/^[0-9a-fA-F]{6}$/)) {
    return `#${color.toLowerCase()}`;
  }
  return color;
}

async function setupEnvironment() {
  console.log('\n🚀 Welcome to the Website Template Setup!\n');
  console.log('This script will help you configure your environment and design system.\n');

  // Check if .env already exists
  if (existsSync('.env')) {
    const overwrite = await question('⚠️  .env file already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Skipping environment setup...\n');
      return setupDesignSystem();
    }
  }

  console.log('📝 Environment Variables Setup\n');

  // Supabase Configuration
  const setupSupabase = await question('Do you want to configure Supabase? (Y/n): ');
  let supabaseUrl = '';
  let supabaseKey = '';

  if (setupSupabase.toLowerCase() !== 'n') {
    console.log('\n🔐 Supabase Configuration:');
    console.log('Get these from: https://app.supabase.com/project/_/settings/api\n');
    supabaseUrl = await question('Supabase URL (or press Enter to skip): ');
    supabaseKey = await question('Supabase Anon Key (or press Enter to skip): ');
  }

  // Stripe Configuration
  const setupStripe = await question('\nDo you want to configure Stripe? (Y/n): ');
  let stripeKey = '';

  if (setupStripe.toLowerCase() !== 'n') {
    console.log('\n💳 Stripe Configuration:');
    console.log('Get this from: https://dashboard.stripe.com/test/apikeys\n');
    stripeKey = await question('Stripe Publishable Key (or press Enter to skip): ');
  }

  // Create .env file
  const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=${stripeKey}
`;

  writeFileSync('.env', envContent);
  console.log('\n✅ Environment file created successfully!\n');

  await setupDesignSystem();
}

async function setupDesignSystem() {
  console.log('\n🎨 Design System Setup\n');

  const customizeDesign = await question('Do you want to customize the design system? (y/N): ');

  if (customizeDesign.toLowerCase() !== 'y') {
    console.log('\nSkipping design system customization...');
    finish();
    return;
  }

  console.log('\n🎨 Let\'s customize your design system!\n');
  console.log('Press Enter to keep the current value, or enter a new value.\n');

  // Read current CSS file
  const cssPath = './src/index.css';
  let cssContent = readFileSync(cssPath, 'utf8');

  // Primary Color
  console.log('Primary Color (currently: #3b82f6)');
  const primaryColor = await question('Primary color (hex): ');
  if (primaryColor) {
    const formatted = formatColor(primaryColor);
    cssContent = cssContent.replace(/--color-primary: #[0-9a-fA-F]{6};/, `--color-primary: ${formatted};`);
  }

  // Secondary Color
  console.log('\nSecondary Color (currently: #8b5cf6)');
  const secondaryColor = await question('Secondary color (hex): ');
  if (secondaryColor) {
    const formatted = formatColor(secondaryColor);
    cssContent = cssContent.replace(/--color-secondary: #[0-9a-fA-F]{6};/, `--color-secondary: ${formatted};`);
  }

  // Border Radius
  console.log('\nBorder Radius (currently: 8px)');
  const borderRadius = await question('Border radius (e.g., 4px, 12px, 16px): ');
  if (borderRadius) {
    cssContent = cssContent.replace(/--radius-md: \d+px;/, `--radius-md: ${borderRadius};`);
  }

  // Write updated CSS
  writeFileSync(cssPath, cssContent);
  console.log('\n✅ Design system updated successfully!\n');

  finish();
}

function finish() {
  console.log('\n🎉 Setup Complete!\n');
  console.log('Next steps:');
  console.log('  1. npm install          - Install dependencies');
  console.log('  2. npm run dev          - Start development server');
  console.log('  3. npm test             - Run tests');
  console.log('\nHappy coding! 🚀\n');
  readline.close();
}

// Handle errors
process.on('SIGINT', () => {
  console.log('\n\n👋 Setup cancelled.\n');
  readline.close();
  process.exit(0);
});

// Start setup
setupEnvironment().catch((error) => {
  console.error('\n❌ Setup failed:', error.message);
  readline.close();
  process.exit(1);
});
