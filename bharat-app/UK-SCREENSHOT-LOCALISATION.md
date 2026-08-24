# UK Screenshot Localisation — Design Change Spec

Three screenshots contain legacy-market content that conflicts with the UK framing. This document provides exact replacement specifications for manual Figma updates.

---

## 1. checkout-payment.webp

### Current visible state

- **Header banner:** "Complete Payment" / "Amount Payable: £68.00" (GBP — correct)
- **Delivery address:** "Deliver to Terry John" / "2-3 Bridge Street, Salisbury, Wiltshire, United Kingdom - SP1 2LX" (UK — correct)
- **Change link:** Present (correct)
- **Saved payment options:**
  - Visa xxxx xxxx xxxx 7814 — cardholder "Ashutosh Navkar" (selected)
  - Visa xxxx xxxx xxxx 0240 — cardholder "Terry John Paul"
- **Pay button:** "Pay ₹890" (CONFLICT — rupee symbol, wrong amount)
- **"More options" link:** Present
- **No UPI / PhonePe / Google Pay section visible** (clean)

### Why it conflicts

The Pay button prominently displays "₹890" in Indian rupees while the header shows "£68.00" in GBP. This is the most visible CTA on the screen — a hiring manager clicking into the lightbox will see the contradiction immediately. The cardholder name "Ashutosh Navkar" is also not UK-consistent with the "Terry John" delivery name.

### Exact design changes required

| Element | Current | Change to |
|---|---|---|
| Pay button text | `Pay ₹890` | `Pay £68.00` |
| Card 1 cardholder | `Ashutosh Navkar` | `Terry John` |

### No other changes needed

- Header amount (£68.00) — already correct
- Delivery address (Salisbury, Wiltshire) — already UK
- Card 2 cardholder (Terry John Paul) — fine
- Card numbers — fine (masked)
- "More options" — fine

---

## 2. checkout-cart-full.webp

### Current visible state

- **Map:** Shows UK location — Frome Museum, Broadway, Christchurch Street West, The Cornerhouse, Bert's Café, The Three Swans, Market Place, Rye B[uildings]. Delivery parcel icon on map.
- **Status:** "Order Placed" / "Arrives in 13 mins" (green)
- **Delivery address block:**
  - Name: "Terry John Paul" with "HOME" badge
  - Address: "105, 1st floor - Ganesh Kunj CHS Society, Maheswari Nagar, Kondivita Road, JB Nagar, Mumbai, Andheri, Maharashtra - 400059."
  - Phone: "+91 - 8680997595"
- **Store:** "Nike - Sports Accessories" / "Marol, Andheri"
- **Status badge:** "Your Order Is Packed, Waiting On Delivery Partner" (green)
- **Product:** "Pure Cotton Slim Fit Opaque Printed Casual Shirt" with thumbnail
- **Links:** "View Order Summary" / "Need help with my order? Get Help & Support"

### Why it conflicts

The map shows a UK location (Frome, Somerset) but the delivery address is a full Mumbai, India address with an Indian phone number (+91). The store location "Marol, Andheri" is also in Mumbai. This is the most severe localisation conflict — the map and address directly contradict each other on the same screen.

### Exact design changes required

| Element | Current | Change to |
|---|---|---|
| Address line 1 | `105, 1st floor - Ganesh Kunj CHS Society,` | `Flat 3, 14 Catherine Street,` |
| Address line 2 | `Maheswari Nagar, Kondivita Road, JB Nagar,` | *(remove — single line address)* |
| Address line 3 | `Mumbai, Andheri, Maharashtra - 400059.` | `Frome, Somerset BA11 1DA` |
| Phone | `+91 - 8680997595` | `+44 7700 900123` |
| Store location | `Marol, Andheri` | `Market Place, Frome` |

### No other changes needed

- Name "Terry John Paul" — fine
- "HOME" badge — fine
- Map (already UK Frome) — fine
- "Nike - Sports Accessories" brand — fine
- Product name — fine
- Status text — fine
- All other UI — fine

---

## 3. widget-score.webp

### Current visible state

- **Location header:** "Frome Styles Hills" / "Home Market, Piccadilly Circus - BA 11J5R" (UK — correct)
- **Search bar:** "Shop, Order Food, Book Cab, and m..." with mic icon (fine)
- **Quick actions:** "Search Screenshot" / "Trending outfits" (fine)
- **Live score widget:**
  - "ICC" / "World T20 Qualifier" / "Live" (green dot)
  - 🇮🇳 India — 150/4 (20)
  - 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England — 60/5 (15.4) / Target 151
  - "BNG needs 90 runs in 4.2 overs to win" / "CCR: 3.8 RRR: 7.5"
- **Category icons:** Scan & pay, News, Food, Shopping (fine)
- **Section label:** "Only on bharat app" (CONFLICT)
- **Section heading:** "Popular Brands" with shopping bag icon
- **Brand cards:** Paul Smith, TORY BURCH, BOSS (fine — international brands)

### Why it conflicts

1. **"Only on bharat app"** — directly references the India-market product name. This text sits prominently above the Popular Brands section.
2. **Cricket widget** — The India vs England match is actually plausible UK content (cricket is widely followed in England, and this match would appear on UK sports apps). The Indian flag is visible but not problematic in a sports context. This is LOW priority.

### Exact design changes required

| Element | Current | Change to |
|---|---|---|
| Section label | `Only on bharat app` | `Only on Sorted` |

### Optional changes (LOW priority)

| Element | Current | Possible change |
|---|---|---|
| Cricket match | India vs England | Keep as-is (valid UK sports content) or change to "England vs Australia" for stronger UK resonance |
| Indian flag | 🇮🇳 visible | Keep if match stays India vs England; replace with 🇦🇺 if match changes |

### No other changes needed

- Location header (Frome/Piccadilly) — already UK
- Search bar — fine
- Category icons — fine
- Popular Brands (Paul Smith, Tory Burch, Boss) — international, fine
- All other UI — fine

---

## Summary

| Screenshot | Severity | Changes needed |
|---|---|---|
| checkout-payment | HIGH | 2 text changes (Pay button ₹→£, cardholder name) |
| checkout-cart-full | CRITICAL | 4 text changes (full address, phone, store location) |
| widget-score | MEDIUM | 1 text change ("bharat app" → "Sorted") |

Total: 7 mandatory text replacements across 3 Figma frames. No layout, colour, or structural changes required.
