# CLAIMS AUDIT — Sorted Case Study

**File:** `bharat-app/v2.html`
**Audit date:** 2026-08-24

---

## 1. OFCOM — Online Nation 2025

### "41 apps used per month by UK smartphone users"

**Status: VERIFIED**

Ofcom Online Nation 2025 report (PDF, p. summary section) states:
> "Smartphone users use on average 41 apps in a month. This has increased by +3 apps since 2024."

Source: Ofcom, Online Nation 2025 report (PDF).
URL on case study (`https://www.ofcom.org.uk/research-and-data/online-research/online-nation`) is a valid landing page; the stat is in the downloadable PDF, not on the page itself. Acceptable citation practice.

Attribution line "Ofcom, Online Nation 2025 · May 2025" — **Verified** (report covers May 2025 data).

---

### "53% of UK people say they often see AI summaries in search results"

**Status: VERIFIED — attribution needs correction**

Ofcom Online Nation 2025 report (PDF) states:
> "research from YouGov found that 53% of UK people say they often see AI summaries"

Footnote 30 in the Ofcom PDF:
> "53% of UK citizens often see AI overviews, YouGov, 18 February 2025"

**Issue:** The case study attributes this to "Ofcom, Online Nation 2025 · YouGov · Feb 2025". This is acceptable — Ofcom cites the YouGov research within their report. The dual attribution is honest. However:

- The stat is from YouGov's own research (Feb 2025), cited by Ofcom.
- The case study correctly attributes both. No change needed.

---

## 2. MONZO — Annual Report

### "15.2M Monzo customers"

**Status: VERIFIED**

Monzo 2026 Annual Report states: "+3m new customers, bringing the total to 15.2m"
URL `https://monzo.com/annual-report` resolves to the FY2026 report.

### "10.4M monthly active"

**Status: VERIFIED**

Report states: "+26% monthly active users to 10.4m"

### "49% use Monzo as primary bank"

**Status: VERIFIED**

Report states: "49% of monthly active users use Monzo as a primary bank."

### "FY2026" label

**Status: VERIFIED**

Page title is "Monzo — Year in review 2026". All figures are FY2026 with FY2025 as prior-year comparison. CEO listed as Diana Layfield.

**Note:** The generic URL `/annual-report` currently resolves to FY2026, but will likely change when FY2027 is published. Consider noting the access date or archiving.

---

## 3. COMPETITIVE CLAIMS

### Klarna: "recommends products then navigates away to buy"

**Status: VERIFIED**

Klarna's shopping flow directs users to external retailer sites for purchase. Their "store directory" links point to "pay-with-klarna" pages at merchant sites. Klarna serves as a payment layer, not a closed-loop marketplace. The case study's claim that Klarna "navigates to a product page" is accurate.

### Amazon Rufus: "answers questions then links to product pages"

**Status: VERIFIED**

Amazon's own description confirms Rufus suggests "shoppable product categories" that "customers can click on to conduct more specific searches." Users are funneled into standard product pages and search results for actual purchase. The claim is accurate.

**Note:** Amazon has since expanded Rufus capabilities. The claim should use past/present tense carefully. Current wording "Amazon Rufus answers questions then links to product pages" is still directionally correct as of Aug 2026 — purchases still happen on product pages, not in the chat.

### Uber: "expanded from mobility into food and grocery"

**Status: VERIFIED**

Wikipedia confirms Uber Eats launched 2014, Cornershop grocery acquisition 2019/2021, Trendyol Go grocery acquisition 2025. Delivery is 31.3% of 2024 revenue ($13.8B). Claim is accurate.

### Revolut: "expanded from a strong financial core into adjacent services such as insurance, stays, and cashback"

**Status: NEEDS SOFTENING**

- **Insurance**: Verified — listed as a core product on Wikipedia and Revolut's own materials.
- **Stays**: Revolut does offer a "Stays" accommodation booking feature within the app, but this is not documented on Wikipedia and the Revolut website returned 403 errors. The feature exists but is difficult to source publicly.
- **Cashback**: Revolut offers RevPoints with cashback-like rewards, but "cashback" as a standalone product is not documented on Wikipedia.

**Recommendation:** The claim is directionally accurate but hard to verify from public sources. Consider softening to: "Revolut demonstrates how a UK digital platform can expand from a strong financial core into adjacent services such as insurance and travel." Or keep as-is and accept the sourcing risk is low (these are observable app features, not disputed claims).

### GOV.UK: "317 local authorities in England"

**Status: VERIFIED**

GOV.UK guidance page states: "In total there are 317 local authorities in England made up of 5 different types."
Source: `https://www.gov.uk/guidance/local-government-structure-and-elections`

---

## 4. BAYMARD CLAIMS

### "Their guidelines are tested findings, not opinions"

**Status: NEEDS SOFTENING**

Baymard does frame their work as empirical research ("200,000+ hours of UX research", "18,000+ users tested", "4,400+ qualitative moderated in-lab Think Aloud sessions"). They use language like "research-backed UX insights."

However, the case study phrasing "tested findings, not opinions" is the author's editorial framing, not Baymard's exact words. It's defensible but slightly overconfident.

**Recommendation:** Rewrite to something like: "I reviewed Baymard's cart and checkout research — 200,000+ hours of usability testing across 250+ e-commerce sites — and retained nine principles that applied to a cross-domain cart."

### "nine rules" terminology

**Status: AUTHOR'S FRAMING — ACCEPTABLE**

"Nine rules" is the author's own count/framing, not a Baymard term. Baymard publishes "700+ UX Best Practice Guidelines." The author selected 9 that applied to the cross-domain cart problem. This is honest and clearly framed as a curation.

No change needed, but ensure the page doesn't imply these are "Baymard's nine rules" — they are nine of Baymard's guidelines selected by the author.

### "44px minimum touch targets"

**Status: NEEDS CORRECTION — wrong attribution**

The case study states (Baymard tab 04): "44px minimum touch targets reduce errors on mobile."

**44px is NOT from Baymard.** The 44×44 CSS pixel target comes from:
- **WCAG 2.2 SC 2.5.5** (Target Size Enhanced, Level AAA)
- **Apple Human Interface Guidelines** (44pt)
- **Google Material Design** (48dp)

WCAG 2.2 SC 2.5.8 (Level AA minimum) is actually 24×24 CSS pixels.

**Recommendation:** Rewrite to: "Grocery items need frequent quantity changes. Touch targets are sized for reliable mobile interaction." — removes the specific pixel claim and avoids misattribution. Or cite the correct source: "per WCAG and platform guidelines."

### "thousands of e-commerce sites"

**Status: NEEDS CORRECTION**

Baymard's research page states they have benchmarked **"250+ top ecommerce sites"** and tested across **"90+ leading US and European sites."** They have conducted 4,400+ moderated usability sessions across 18,000+ users.

"Thousands" significantly overstates the site count. The scale is impressive on other metrics (200,000+ research hours, 18,000+ users) but the site count is 250+, not thousands.

**Recommendation:** Change "thousands of e-commerce sites" to "250+ e-commerce sites" or simply "leading e-commerce sites" to avoid a specific inaccuracy.

---

## SUMMARY TABLE

| Claim | Status | Action |
|---|---|---|
| 41 apps/month (Ofcom) | VERIFIED | None |
| 53% AI summaries (Ofcom/YouGov) | VERIFIED | None |
| 15.2M Monzo customers | VERIFIED | None |
| 10.4M MAU (Monzo) | VERIFIED | None |
| 49% primary bank (Monzo) | VERIFIED | None |
| FY2026 label | VERIFIED | None |
| Klarna navigates away | VERIFIED | None |
| Amazon Rufus links out | VERIFIED | Minor — check tense |
| Uber mobility → food/grocery | VERIFIED | None |
| Revolut → insurance, stays, cashback | NEEDS SOFTENING | Simplify to avoid hard-to-source sub-claims |
| 317 local authorities | VERIFIED | None |
| "tested findings, not opinions" | NEEDS SOFTENING | Rewrite with specifics |
| "nine rules" | ACCEPTABLE | Ensure framing is clear |
| 44px touch targets | NEEDS CORRECTION | Wrong attribution (not Baymard) |
| "thousands of e-commerce sites" | NEEDS CORRECTION | Baymard says 250+ |
| "34 screens" (throughout) | NEEDS CORRECTION | Actual count is 44 |
| "7 modules" (throughout) | NEEDS CORRECTION | Actual count is ~10 domains |
