# T031 Plan: Add Meta Tags and Favicon

## Objective
Add appropriate meta tags for SEO and social sharing, plus a favicon to give the site a professional appearance.

## Implementation Approach

1. **Update Meta Tags in app/layout.tsx**
   - Add proper title: "Bitcoin Price Tag - See Bitcoin prices everywhere"
   - Add description: "Convert any price to Bitcoin automatically with our Chrome extension"
   - Add Open Graph tags for social sharing:
     - og:title
     - og:description
     - og:type (website)
     - og:url
     - og:image (create a social preview image)
   - Add Twitter Card meta tags
   - Add viewport meta tag (likely already present)

2. **Create and Add Favicon**
   - Design a simple Bitcoin-themed favicon (Bitcoin orange background with "BTC" or "₿" symbol)
   - Create icon.svg or favicon.ico in /public directory
   - Ensure multiple sizes for different devices (if using .ico)
   - Add link in app/layout.tsx

3. **Additional Meta Tags**
   - Add keywords meta tag
   - Add author meta tag
   - Add robots meta tag (if needed)
   - Add canonical URL

## Implementation Details
- Use Next.js Metadata API for proper implementation
- Ensure all meta tags follow SEO best practices
- Keep description under 160 characters
- Use Bitcoin orange (#F7931A) for favicon consistency

## Testing
- Check browser tab shows correct favicon
- Verify title and description in browser
- Use social media debuggers to test Open Graph tags
- Test on different devices for favicon display