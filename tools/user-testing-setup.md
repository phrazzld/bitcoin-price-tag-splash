# User Testing Quick Start Guide

## 🚀 Immediate Setup (30 minutes)

This guide gets you from zero to running user tests in 30 minutes using free tools.

### Step 1: Set Up Testing Environment (5 minutes)

**Deploy to Vercel (Recommended):**

```bash
# If not already deployed
pnpm build
npx vercel --prod

# Note the production URL for testing
# Example: https://bitcoin-price-tag-splash.vercel.app
```

**Testing URL:**

```
PRODUCTION_URL="https://bitcoin-price-tag-splash.vercel.app"
LOCAL_BACKUP="http://localhost:3000"
```

### Step 2: Configure Recording (10 minutes)

**Option A: OBS Studio (Best Quality)**

```bash
# macOS
brew install --cask obs

# Windows
# Download from https://obsproject.com/
```

**Quick OBS Setup:**

1. Open OBS
2. Add Source > Window Capture > Select Browser
3. Settings > Output > Recording Quality: High Quality, Medium File Size
4. Audio > Desktop Audio: Enabled

**Option B: Loom (Easiest)**

1. Visit https://loom.com/download
2. Install desktop app
3. Select "Screen + Camera"
4. Test recording 30 seconds

### Step 3: Create Recruitment Post (10 minutes)

**Copy-Paste Reddit Post:**

```
Title: [Academic] Quick 15-minute Bitcoin website feedback - $25 gift card

Hi everyone! I'm conducting user research for a Bitcoin-related website and would love your honest first impressions.

What: 15-minute screen share session where you look at a website and share your thoughts
When: This week, flexible scheduling
Compensation: $25 Amazon gift card
Requirements:
- 18+ years old
- Comfortable with video calls
- No preparation needed

The session is purely about getting your honest reaction to a website design. No Bitcoin knowledge required!

Interested? Comment below or DM me and I'll send a scheduling link.

This is legitimate academic research - happy to provide verification.
```

**Copy-Paste Twitter/X Post:**

```
🧪 User Research Opportunity!

Looking for 15 people to spend 15 minutes giving feedback on a website design.

💰 $25 Amazon gift card
📅 This week, flexible times
🎯 No special knowledge needed
💻 Quick video call

DM me if interested! #UXResearch #UserTesting
```

### Step 4: Set Up Scheduling (5 minutes)

**Calendly Free Setup:**

1. Go to https://calendly.com/signup
2. Create free account
3. Set availability: Mon-Fri 9am-5pm
4. Meeting length: 15 minutes
5. Buffer time: 5 minutes between meetings
6. Copy the scheduling link

**Email Template for Interested Participants:**

```
Subject: Bitcoin Website Feedback - Scheduling Link

Hi [Name],

Thanks for your interest in providing feedback!

Here's your scheduling link: [YOUR_CALENDLY_LINK]

What to expect:
✅ 15-minute video call (Zoom/Google Meet)
✅ You'll look at a website and share your honest thoughts
✅ No preparation needed - just your natural reactions
✅ $25 Amazon gift card sent after the session

The website is about Bitcoin, but no Bitcoin knowledge is required - actually, we want perspectives from all experience levels!

If you have any questions, just reply to this email.

Thanks!
[Your Name]
```

## 🎯 Running Your First Session (15 minutes)

### Pre-Session Setup (3 minutes)

```bash
# Checklist:
□ Open https://bitcoin-price-tag-splash.vercel.app in fresh browser
□ Start screen recording
□ Have timer ready (Google "stopwatch")
□ Open notepad for notes
□ Start video call with participant
```

### Session Script (12 minutes)

**Introduction (2 minutes):**

> "Hi! Thanks for joining. This will take about 15 minutes. I'm testing a website design and want your honest first impressions.
>
> There are no wrong answers - this is about testing the design, not testing you. Please think out loud as you look at things.
>
> I'll show you a webpage, ask a few questions, then you'll get your gift card. Sound good?"

**5-Second Test (3 minutes):**

> "I'll show you a webpage for exactly 5 seconds. Look at it normally, then I'll ask what you saw. Ready?"

1. **Show the website for exactly 5 seconds**
2. **Hide the screen**
3. **Ask:** "What product or service was that page about?"
4. **Follow-up:** "What does this product do?"

**Navigation Test (4 minutes):**

> "Now I'll show you the full page. Your task is: imagine you want to try this product. Show me how you'd get started."

1. **Show the website**
2. **Let them explore freely**
3. **Note:** How long to find install button? Any confusion?
4. **Ask:** "Was that easy or difficult to figure out?"

**Comprehension Test (2 minutes):**

> "Can you explain in your own words what this product does and how it works?"

**Trust Assessment (1 minute):**

> "On a scale of 1-10, how trustworthy does this website seem for a financial tool? Why?"

### Quick Data Recording

**Use this simple template for each session:**

```
Participant: P[ID]
Date: [DATE]

5-Second Test:
- What product: ________________
- What it does: ________________
- Pass/Fail: ________

Navigation:
- Time to install button: _____ seconds
- Success: Y/N
- Issues: ________________

Comprehension:
- Explanation: ________________
- Accuracy: 1-5 scale

Trust:
- Rating: ___/10
- Reason: ________________

Key Quotes:
- ________________
- ________________

Overall Success: Y/N
```

## 📊 Quick Analysis After 5 Sessions

**Calculate Success Rates:**

```
5-Second Test Success: [Passes] / 5 = ____%
Navigation Success: [Successes] / 5 = ____%
Average Trust Rating: [Sum] / 5 = ____/10
```

**Target Benchmarks:**

- ✅ 5-Second Test: 80%+ should understand the product
- ✅ Navigation: 90%+ should find install button easily
- ✅ Trust Rating: 7.0+ average
- ✅ Comprehension: 85%+ should explain it accurately

**Red Flags to Watch For:**

- 🚩 Multiple people confused about what the product is
- 🚩 People can't find the install button quickly
- 🚩 Trust ratings below 6/10
- 🚩 People think it's a scam or suspicious

## 💳 Payment Processing

**Amazon Gift Card Method (Recommended):**

1. Buy digital gift cards: https://amazon.com/giftcards
2. Send via email immediately after session
3. Keep receipt records for accounting

**PayPal Alternative:**

1. Send $25 via PayPal Friends & Family
2. Include note: "User testing participation - thank you!"

## 🔧 Troubleshooting Common Issues

**Recording Problems:**

- Backup: Use phone to record computer screen
- Quick fix: Browser built-in screen share recording

**Participant No-Shows:**

- Book 25% extra participants
- Send reminder emails 24 hours before
- Have backup time slots ready

**Technical Issues:**

- Always test your setup before first session
- Have backup video call platform ready
- Keep local environment running as backup

**Quality Control:**

- If participant gives unusable data, don't count toward your target
- Recruit 25+ people to account for 20% unusable sessions

## 📈 Scaling Up

**After 5 successful sessions:**

- Post recruitment in additional communities
- Consider paid platforms like UserTesting.com
- Set up Google Forms for automated data collection
- Create automated email sequences

**Communities for Recruitment:**

- Reddit: r/bitcoin, r/SampleSize, r/UserExperience
- Facebook: Local tech groups, UX research groups
- LinkedIn: Professional network, Bitcoin groups
- Discord: Bitcoin communities, design communities

---

**🎯 Success Milestone:** After your first 5 sessions, you'll know if the design is ready for launch or needs iteration!

**⏱️ Timeline:** 30 minutes setup + 15 minutes per session = 2.5 hours for initial validation

**💰 Budget:** $125 for 5 sessions + free tools = minimal investment for crucial data
