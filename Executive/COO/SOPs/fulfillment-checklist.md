# shroome Fulfillment Standard Operating Procedure

> Last updated: March 2026
> Owner: COO / Operations Lead
> Applies to: All DTC orders via drinkshroome.com

---

## 1. Order Processing

### When an order comes in:

- [ ] Order received in Shopify (or commerce platform) — confirm payment captured
- [ ] Verify shipping address is complete and valid (no PO boxes if using carriers that don't deliver to them)
- [ ] Verify order contents match available inventory
- [ ] Flag any orders with notes or special requests for manual review
- [ ] If order includes the 20% off + free shipping waitlist discount (or 30% with phone stackable), verify the customer is on the waitlist list in Klaviyo
- [ ] Push order to 3PL (or internal fulfillment queue) within 2 hours of payment confirmation during business hours

### Order batching:
- Orders received before 2:00 PM local time: ship same business day
- Orders received after 2:00 PM: ship next business day
- Weekend/holiday orders: ship next business day

---

## 2. Inventory Management

### Before fulfillment begins each day:

- [ ] Check current inventory levels for both SKUs (Vanilla and Strawberry)
- [ ] Confirm sufficient stock for all pending orders
- [ ] If inventory for any SKU falls below [____] units, trigger reorder alert to Operations Lead
- [ ] Log daily beginning inventory count

### Reorder triggers:

| SKU | Reorder Point | Reorder Quantity | Lead Time |
|---|---|---|---|
| SHR-VAN-01 (Vanilla) | [____] units | [____] units | [____] weeks |
| SHR-STR-01 (Strawberry) | [____] units | [____] units | [____] weeks |

### Out-of-stock protocol:
1. Immediately update website to reflect out-of-stock status
2. Email affected customers within 4 hours with expected restock date
3. Offer to hold the order or refund — customer's choice
4. Do NOT substitute flavors without explicit customer approval

---

## 3. Quality Control — Pre-Shipment

### Every order must pass the following checks:

- [ ] **Correct SKU:** Product matches what was ordered (Vanilla vs. Strawberry)
- [ ] **Correct quantity:** Number of sachets matches order
- [ ] **Sachet integrity:** No tears, punctures, or visible damage to sachet packaging
- [ ] **Expiration check:** Product expiration date is at least 12 months from ship date
- [ ] **Lot number recorded:** Log the lot number(s) for every order shipped (for recall traceability)
- [ ] **Insert included:** Brand card / welcome insert is in the package
- [ ] **Packaging condition:** Outer packaging is clean, undamaged, and properly sealed

### Damaged product protocol:
- Remove damaged sachets from inventory immediately
- Log damaged units with lot number, date, and damage description
- If damage rate exceeds 2% of a batch, escalate to Operations Lead and notify co-packer
- Photograph damage for records

---

## 4. Packing Standards

### What goes in every order:

| Item | Quantity | Notes |
|---|---|---|
| Product sachets | Per order | Correct SKU and quantity |
| Brand insert card | 1 | Welcome message, preparation instructions, QR to socials |
| Tissue paper | 1 sheet | Brand-colored (Cream or Blush) |
| Outer mailer/box | 1 | Sized appropriately — no excess void space |
| Sticker seal (optional) | 1 | shroome logo sticker on tissue fold |

### Packing guidelines:
- Sachets should be arranged neatly, not crumpled or forced into the box
- No loose fill / packing peanuts — use tissue paper only
- Mailer should be snug — product should not rattle or shift during transit
- Seal outer packaging securely with branded tape or sticker

---

## 5. Shipping Standards

### Carrier selection:

| Order Value | Shipping Method | Carrier | Estimated Delivery |
|---|---|---|---|
| Standard | Ground | USPS / UPS Ground | 3-7 business days |
| Expedited (if offered) | Priority | USPS Priority / UPS 2-Day | 2-3 business days |
| Free shipping threshold | Ground | [Carrier] | Above $[____] order value |

### Shipping label:
- [ ] Return address: shroome / ZSQUARED INC, [fulfillment address]
- [ ] Ship-to address matches Shopify order exactly
- [ ] Weight and dimensions accurate on label
- [ ] Tracking number generated and synced back to Shopify

### Tracking notification:
- Shopify sends automatic "Your order has shipped" email with tracking number
- Verify tracking email fires within 1 hour of label creation

---

## 6. Post-Shipment

- [ ] Mark order as "fulfilled" in Shopify
- [ ] Verify tracking number is live and scanning within 24 hours
- [ ] If tracking shows no movement after 48 hours, investigate with carrier
- [ ] Monitor delivery confirmation — flag any orders showing "delivery exception"

---

## 7. Returns & Refunds

### Return policy:
- Returns accepted within 30 days of delivery for unopened product
- Opened sachets are not eligible for return (consumable product)
- Customer pays return shipping unless the return is due to our error

### Return processing:

- [ ] Customer contacts support requesting return
- [ ] Issue RMA number and provide return shipping instructions
- [ ] Upon receipt: inspect returned product condition
- [ ] If product is unopened and undamaged: restock and issue full refund
- [ ] If product is opened or damaged by customer: deny restock, issue refund at discretion
- [ ] If return is due to our error (wrong item, damaged in transit): issue full refund + prepaid return label
- [ ] Process refund in Shopify within 3 business days of receiving return
- [ ] Log return reason for product/operations review

### Damaged-in-transit claims:
1. Ask customer for photos of damaged package and product
2. File carrier claim if applicable
3. Ship replacement order immediately — do not wait for carrier resolution
4. Log incident for carrier performance tracking

---

## 8. Escalation Matrix

| Issue | First Response | Escalate To | Timeline |
|---|---|---|---|
| Wrong item shipped | Customer support | Operations Lead | Resolve within 24 hours |
| Damaged in transit | Customer support | Operations Lead | Ship replacement within 24 hours |
| Out of stock (existing order) | Operations Lead | CEO | Notify customer within 4 hours |
| Quality issue (taste, appearance) | Customer support | Product Lead | Log and investigate within 48 hours |
| Batch recall | Operations Lead | CEO + Product Lead | Immediate — halt all shipments from affected lot |

---

## 9. Daily Operations Checklist

**Morning (start of business):**
- [ ] Review overnight orders
- [ ] Check inventory levels
- [ ] Confirm 3PL / fulfillment queue is clear from previous day

**Midday:**
- [ ] Process all orders received before 2 PM cutoff
- [ ] Verify tracking numbers are scanning for today's shipments

**End of day:**
- [ ] Log daily shipment count and inventory levels
- [ ] Flag any unresolved issues for next business day
- [ ] Review customer support tickets related to fulfillment
