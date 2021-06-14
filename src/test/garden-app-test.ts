import { GardenApp } from "../garden-app.js";

import { fixture, html } from "@open-wc/testing";

const assert = chai.assert;

suite("garden-app", () => {
  test("is defined", () => {
    const el = document.createElement("garden-app");
    assert.instanceOf(el, GardenApp);
  });

  test("renders with default values", async () => {
    const el = await fixture(html`<garden-app></garden-app>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test("renders with a set name", async () => {
    const el = await fixture(html`<garden-app></garden-app>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test("handles a click", async () => {
    const el = (await fixture(html`<garden-app></garden-app>`)) as GardenApp;
    const button = el.shadowRoot!.querySelector("button")!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  test("styling applied", async () => {
    const el = (await fixture(html`<garden-app></garden-app>`)) as GardenApp;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, "16px");
  });
});
