# T008: Create StepCard.tsx Component

## Implementation Plan

Based on the requirements from PLAN.md for the How It Works section, I will create a StepCard component with the following structure:

1. Component Structure:
   - Large step number (gray color)
   - Screenshot placeholder area with border (1px solid Gray 300)
   - Description text

2. Design Implementation:
   - Follow the Swiss Minimalism principles
   - Use the existing color palette (gray scale)
   - Implement proper spacing and typography
   - Ensure mobile responsiveness

3. Props Interface:
   - stepNumber: number
   - screenshot: string (path or placeholder)
   - description: string

4. Styling:
   - Number: Large font size, gray color (Gray 700)
   - Screenshot: Bordered container with 1px solid Gray 300
   - Description: Concise text with appropriate spacing
   - Use Tailwind CSS for consistency

5. Client Component:
   - Likely not needed unless it has interactive elements