#!/usr/bin/env node

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { createInterface } from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => readline.question(query, resolve));
}

async function generateSEOFiles() {
  console.log('\n🔍 SEO Files Generator\n');
  console.log('This script will generate llm.txt, sitemap.xml, and robots.txt\n');

  // Get site information
  const siteName = await question('Site name (default: My Website): ') || 'My Website';
  const siteUrl = await question('Site URL (e.g., https://example.com): ');
  const siteDescription = await question('Site description: ') || 'A modern website built with React';

  // Validate URL
  if (!siteUrl || !siteUrl.startsWith('http')) {
    console.error('\n❌ Please provide a valid URL starting with http:// or https://');
    readline.close();
    process.exit(1);
  }

  // Get pages
  console.log('\n📄 Enter your site pages (one per line, press Enter twice when done):');
  console.log('Example: /about, /contact, /blog\n');

  const pages = ['/'];  // Always include home page
  let page = await question('Page (or press Enter to finish): ');

  while (page.trim()) {
    if (page.startsWith('/')) {
      pages.push(page.trim());
    } else {
      pages.push('/' + page.trim());
    }
    page = await question('Page (or press Enter to finish): ');
  }

  // Ensure public directory exists
  if (!existsSync('./public')) {
    mkdirSync('./public');
  }

  // Generate llm.txt
  const llmContent = generateLLMTxt(siteName, siteUrl, siteDescription, pages);
  writeFileSync('./public/llm.txt', llmContent);
  console.log('\n✅ Generated public/llm.txt');

  // Generate sitemap.xml
  const sitemapContent = generateSitemap(siteUrl, pages);
  writeFileSync('./public/sitemap.xml', sitemapContent);
  console.log('✅ Generated public/sitemap.xml');

  // Generate robots.txt
  const robotsContent = generateRobots(siteUrl);
  writeFileSync('./public/robots.txt', robotsContent);
  console.log('✅ Generated public/robots.txt');

  console.log('\n🎉 All SEO files generated successfully!\n');
  console.log('Next steps:');
  console.log('1. Review the generated files in the public/ directory');
  console.log('2. Deploy your site to make the files accessible');
  console.log('3. Submit your sitemap to Google Search Console\n');

  readline.close();
}

function generateLLMTxt(siteName, siteUrl, siteDescription, pages) {
  const date = new Date().toISOString().split('T')[0];

  return `# ${siteName}

> ${siteDescription}

## About

This is a modern website built with React, TypeScript, and Tailwind CSS.
It includes authentication via Supabase and payment processing via Stripe.

## Pages

${pages.map(page => `- ${siteUrl}${page}`).join('\n')}

## Technology Stack

- Frontend: React 19 with TypeScript
- Styling: Tailwind CSS
- Build Tool: Vite
- Authentication: Supabase
- Payments: Stripe
- Testing: Vitest + Playwright

## Features

- Modern, responsive design
- Type-safe codebase
- Authentication system
- Payment integration
- Comprehensive testing
- SEO optimized

## Contact

Website: ${siteUrl}

---

Last updated: ${date}
`;
}

function generateSitemap(siteUrl, pages) {
  const date = new Date().toISOString().split('T')[0];
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  const urls = pages.map(page => {
    // Determine priority based on page
    let priority = '0.8';
    let changefreq = 'weekly';

    if (page === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (page.includes('/blog')) {
      priority = '0.6';
      changefreq = 'weekly';
    }

    return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateRobots(siteUrl) {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  return `# robots.txt for ${baseUrl}

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`;
}

// Handle errors
process.on('SIGINT', () => {
  console.log('\n\n👋 Generation cancelled.\n');
  readline.close();
  process.exit(0);
});

// Start generation
generateSEOFiles().catch((error) => {
  console.error('\n❌ Generation failed:', error.message);
  readline.close();
  process.exit(1);
});
