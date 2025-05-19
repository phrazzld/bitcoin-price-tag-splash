# Chrome Web Store Link Implementation

## Changes Made

1. **Updated Button Component**:
   - Added `href` prop to allow buttons to function as links
   - When `href` is provided, button renders as an `<a>` tag
   - Maintains all styling and hover effects
   - Opens links in new tab with proper security attributes

2. **Created Constants File**:
   - Added `/lib/constants.ts` with centralized URLs
   - Chrome Web Store URL: https://chromewebstore.google.com/detail/phjlopbkegpphenpgimnlckfmjfanceh?utm_source=item-share-cb
   - GitHub URL: https://github.com/bitcoin-price-tag/extension

3. **Updated Components**:
   - Navigation: "Add to Chrome" button now links to Chrome Web Store
   - HeroSection: Main CTA button links to Chrome Web Store
   - CTASection: "Get Started" button links to Chrome Web Store
   - Footer: GitHub link uses constant (already had correct URL)

## Benefits
- All download/install buttons now properly link to the Chrome Web Store listing
- Centralized URL management for easy updates
- Consistent behavior across all CTAs
- Proper link attributes for security and tracking