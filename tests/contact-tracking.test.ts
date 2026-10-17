import { test } from "node:test";
import assert from "node:assert/strict";
import { contactChannel, isLiveContactPage, trackContactActivation } from "../lib/contact-tracking";

test("contact clicks recognise only Alya's phone and WhatsApp destinations", () => {
  for (const href of ["tel:+966552980261", "tel:0552980261", "tel:+966%2055%20298%200261"]) {
    assert.equal(contactChannel(href), "phone");
  }
  assert.equal(contactChannel("https://wa.me/966552980261?text=hello"), "whatsapp");
  assert.equal(contactChannel("https://api.whatsapp.com/send?phone=966552980261"), "whatsapp");
  for (const href of ["tel:+966500000000", "https://wa.me/966500000000", "https://wa.me.evil.example/966552980261", "http://wa.me/966552980261", "/products/alya-roof", "invalid"]) {
    assert.equal(contactChannel(href), null, href);
  }
});

test("tracking stays off on previews, local development and admin pages", () => {
  assert.equal(isLiveContactPage("dahanat-alya-riyadh.vercel.app", "/products/alya-lux"), true);
  for (const [host, path] of [["localhost", "/"], ["preview.vercel.app", "/"], ["dahanat-alya-riyadh.vercel.app", "/admin"], ["dahanat-alya-riyadh.vercel.app", "/admin/reports"], ["dahanat-alya-riyadh.vercel.app", "/api/admin"]]) {
    assert.equal(isLiveContactPage(host, path), false);
  }
});

test("one activation sends one event with no customer message, phone or form payload", () => {
  const events: unknown[] = [];
  const href = "https://wa.me/966552980261?text=private-customer-enquiry";
  assert.equal(trackContactActivation({ href, button: 0, defaultPrevented: false }, event => events.push(event)), true);
  assert.equal(events.length, 1);
  assert.deepEqual(Object.keys(events[0] as object), ["send_to"]);
  assert.doesNotMatch(JSON.stringify(events), /private-customer-enquiry|966552980261/);
});

test("cancelled, secondary-button and unrelated clicks do not report; reporter errors stay contained", () => {
  let count = 0;
  const report = () => { count += 1; };
  const click = { href: "tel:+966552980261", button: 0, defaultPrevented: false };
  assert.equal(trackContactActivation({ ...click, defaultPrevented: true }, report), false);
  assert.equal(trackContactActivation({ ...click, button: 2 }, report), false);
  assert.equal(trackContactActivation({ ...click, href: "https://example.com/" }, report), false);
  assert.equal(count, 0);
  assert.doesNotThrow(() => trackContactActivation(click, () => { throw new Error("blocked analytics"); }));
  assert.equal(trackContactActivation(click, report), true);
  assert.equal(count, 1);
});
