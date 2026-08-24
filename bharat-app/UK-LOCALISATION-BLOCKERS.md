# UK Localisation Blockers — Sorted Case Study

**File:** `bharat-app/v2.html`  
**Audit date:** 2026-08-24

This case study is framed as a UK super app concept ("Sorted"). The screens originate from a Figma project called "Bharat App" / "JioBharat" targeting India. This document records every UK-incompatible element found in the HTML text, alt text, and visible screenshot content.

**Important:** Do not lie in alt text. If a screenshot visibly shows ₹ or Indian content, alt text must remain truthful. Design corrections to the screenshots themselves are recommended separately.

---

## SEVERITY LEVELS

- **CRITICAL** — Directly contradicts the UK framing in visible body text or alt text that a hiring manager will read
- **HIGH** — Visible in screenshots; creates cognitive dissonance with the UK narrative
- **MEDIUM** — Visible in screenshots but minor or partially obscured
- **LOW** — Present in Figma source data only; not visible to the reader

---

## BLOCKERS IN HTML TEXT / ALT TEXT

### 1. Alt text: ₹890 in cart sheet (CRITICAL)
- **Line:** 452
- **Current:** `alt="Cart bottom sheet — 1 item in cart, H&M cotton shirt, size 36/M, Proceed to Pay ₹890"`
- **Visible in screenshot:** £68 and "Proceed to Pay (£68)" — the screen actually shows GBP
- **Mismatch:** Alt text says ₹890; screenshot shows £68. Alt text is factually wrong.
- **Fix:** Change alt text to match actual screenshot: `"Cart bottom sheet — 1 item in cart, H&M cotton shirt, size 36/M, Proceed to Pay £68"`

### 2. Alt text: ₹457, PhonePe, Google Pay UPI in payment (CRITICAL)
- **Line:** 453
- **Current:** `alt="Payment modal — Complete Payment ₹457, delivery address, saved Visa cards, PhonePe and Google Pay UPI options"`
- **Visible in screenshot:** Header shows "Amount Payable: £68.00", UK address (Salisbury, Wiltshire, SP1 2LX), Visa cards. BUT the Pay button shows "Pay ₹890" and no PhonePe/Google Pay is visible in the cropped area.
- **Mismatch:** Alt text fabricates PhonePe/UPI presence. The ₹890 on the Pay button IS visible in the screenshot.
- **Fix (alt text):** `"Payment modal — Complete Payment £68, UK delivery address, saved Visa cards, Pay button"` — truthful about what's predominantly shown
- **Fix (screenshot — later):** Replace ₹890 on Pay button with £68 to match header

### 3. Alt text: India vs England cricket (MEDIUM)
- **Line:** 637
- **Current:** `alt="Score widget — ICC World T20 Qualifier, India vs England, live score"`
- **Visible in screenshot:** Yes, "India vs England" with Indian flag visible. Also shows "Only on bharat app" text.
- **Mismatch:** "India vs England" cricket is plausible UK content (cricket is popular in the UK, and this match would be shown on UK apps too). However "Only on bharat app" text is clearly India-branded.
- **Fix (alt text):** Keep match reference but remove if "bharat app" branding is redesigned. Current alt text is truthful.
- **Fix (screenshot — later):** Remove "Only on bharat app" label; replace with "Only on Sorted" or remove entirely

### 4. Body text: "Sortoo" AI name (LOW)
- **Lines:** 700, 708, 714
- **Current:** References to "Sortoo" as the AI assistant name
- **Visible in screenshot (onboarding-ai-intro.png):** "Hello. I'm Sortoo"
- **Mismatch:** "Sortoo" sounds like a play on "Sorted" and works fine for the UK framing. No action needed unless the name feels too Indian-market-specific.
- **Fix:** None required — name works in context

### 5. Body text: "five language options" (MEDIUM)
- **Lines:** 706 (alt text), 719 (evidence-signal)
- **Current:** "Five language options, four sign-in methods"
- **Visible in screenshot (onboarding-login.png):** Login screen shows 4 sign-in methods. Language options are NOT visible in this screenshot (they were on a separate overlaid layer in Figma).
- **Mismatch:** The "five language options" claim references Manipuri, Marathi, Malayalam, Hindi, English — all Indian languages. A UK version would show English, Welsh, Polish, Punjabi, Urdu or similar.
- **Fix (text):** Change to "multiple language options" or remove the count. The screenshot doesn't show languages anyway.
- **Fix (screenshot — later):** If language selection screen is redesigned, use UK-relevant languages

### 6. Body text: "multiple languages" (LOW)
- **Line:** 700
- **Current:** "Seven modules, dozens of categories, multiple languages."
- **Mismatch:** Vague enough to work for either market. No fix needed.

---

## BLOCKERS VISIBLE IN SCREENSHOTS ONLY (not in HTML text)

### 7. checkout-payment.png: ₹890 on Pay button (HIGH)
- **Screenshot shows:** "Pay ₹890" on the orange CTA button, despite header showing "Amount Payable: £68.00"
- **Why it matters:** A hiring manager viewing the lightbox will see the rupee symbol on the most prominent button
- **Fix (screenshot):** Replace "Pay ₹890" with "Pay £68" in the Figma source and re-export

### 8. checkout-cart-full.png: Mumbai address + Indian phone (HIGH)
- **Screenshot shows:** "105, 1st floor - Ganesh Kunj CHS Society, Maheswari Nagar, Kondivita Road, JB Nagar, Mumbai, Andheri, Maharashtra - 400059" and "+91 - 8680997595"
- **Also shows:** "Nike - Sports Accessories, Marol, Andheri"
- **Map shows:** UK location (Frome Museum, Broadway, Christchurch Street West) — mixed signals
- **Why it matters:** Full Indian address with +91 phone number directly contradicts the UK framing. This is the order confirmation/tracking screen — a critical moment in the flow.
- **Fix (screenshot):** Replace address with a UK address, replace phone with UK format (+44), replace "Marol, Andheri" with a UK location

### 9. widget-score.png: "Only on bharat app" (HIGH)
- **Screenshot shows:** "Only on bharat app" text below the category icons, Indian flag next to "India" in the cricket scorecard
- **Why it matters:** "bharat app" is the original India-market product name. This directly conflicts with "Sorted" branding.
- **Fix (screenshot):** Remove "Only on bharat app" text, or replace with "Only on Sorted"

### 10. hub-main-home.png: Cricketer in Indian-looking jersey (LOW)
- **Screenshot shows:** News section with a cricketer batting — appears to be in Indian cricket gear
- **Why it matters:** Borderline. Cricket is popular in the UK. The image alone doesn't prove India-specificity, but combined with other Indian elements it contributes to the pattern.
- **Fix (screenshot):** Optional — could replace with a more neutral sports image or UK-relevant content

### 11. Tourism filter pills (NOT VISIBLE — Figma data only)
- **Figma data showed:** "Government Tourism Schemes", "Pure Veg", "Fasting options" as filter pills
- **In screenshot (tourism-home.png):** These pills are below the fold / not visible in the exported screenshot
- **Why it matters:** If visible in a scrolled view or lightbox, "Pure Veg" and "Fasting options" signal Indian dietary categories specifically
- **Fix:** LOW priority — only matters if user scrolls deep into the tourism screenshot in lightbox

### 12. Tourism heatmap radar labels (NOT VISIBLE — Figma data only)
- **Figma data showed:** "Pure Veg", "Pocket Friendly", "Local Must Try" as radar categories
- **In body text (line 676):** These terms ARE used in the flow-decision body copy
- **Why it matters:** "Pure Veg" is distinctly Indian terminology (UK equivalent would be "Vegetarian"). "Pocket Friendly" is Indian English.
- **Fix (text):** Replace "Pure Veg" with "Vegetarian" and "Pocket Friendly" with "Budget-friendly" in body copy
- **Fix (screenshot):** If radar labels are visible, redesign later

---

## SUMMARY

| Severity | Count | Key items |
|---|---|---|
| CRITICAL | 2 | Alt text with ₹ / PhonePe / UPI (factually wrong — screenshots show £) |
| HIGH | 3 | ₹890 on Pay button, Mumbai address in order tracking, "bharat app" branding |
| MEDIUM | 2 | India vs England cricket alt text, "five language options" claim |
| LOW | 4 | Sortoo name, "multiple languages", cricketer image, Figma-only filter pills |

### Immediate text fixes (can do now without changing screenshots):
1. Fix alt text on lines 452–453 to match actual screenshot content (£ not ₹)
2. Remove "PhonePe and Google Pay UPI" from alt text (not visible)
3. Change "five language options" to "multiple language options" or remove count
4. Replace "Pure Veg" → "Vegetarian" and "Pocket Friendly" → "Budget-friendly" in body copy (line 676)

### Screenshot redesign needed later:
1. checkout-payment.png: Pay button ₹890 → £68
2. checkout-cart-full.png: Mumbai address → UK address, +91 → +44
3. widget-score.png: "Only on bharat app" → remove or rebrand
