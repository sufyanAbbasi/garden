import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";

import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { AppDrawerElement } from "@polymer/app-layout/app-drawer/app-drawer.js";
import { AppDrawerLayoutElement } from "@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import { AppToolbarElement } from "@polymer/app-layout/app-toolbar/app-toolbar.js";
import { AppHeaderElement } from "@polymer/app-layout/app-header/app-header.js";
import { AppHeaderLayoutElement } from "@polymer/app-layout/app-header-layout/app-header-layout.js";

/**
 * An app.
 */
@customElement("garden-app")
export class GardenApp extends LitElement {
  static styles = css`
    :host {
      --paper-font-common-base: {
        font-family: Raleway, sans-serif;
      }
    }

    app-drawer-layout:not([narrow]) [drawer-toggle] {
      display: none;
    }

    h1 {
      font-size: 1.5em;
    }
  `;

  render() {
    return html`
      <app-drawer-layout>
        <app-drawer slot="drawer">
          <app-toolbar>
            <h3>Posts</h3>
          </app-toolbar>
          <slot name="drawer-content"></slot>
        </app-drawer>
        <app-header-layout fullbleed>
          <app-header slot="header">
            <app-toolbar>
              <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
              <h1>Sufy's Garden Blog</h1>
            </app-toolbar>
          </app-header>
          <slot name="main-content"></slot>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "garden-app": GardenApp;
    "app-drawer-layout": AppDrawerLayoutElement;
    "app-drawer": AppDrawerElement;
    "app-toolbar": AppToolbarElement;
    "app-header-layout": AppHeaderLayoutElement;
    "app-header": AppHeaderElement;
  }
}
