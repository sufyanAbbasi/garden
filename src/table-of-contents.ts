import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-item-body.js";
import "@polymer/paper-listbox/paper-listbox.js";

import { LitElement, html, css } from "lit";
import { until } from "lit-html/directives/until.js";
import { customElement } from "lit/decorators.js";
import { Post, getPostsByDate } from "./blog-posts";
import { PaperItemElement } from "@polymer/paper-item/paper-item.js";
import { PaperListboxElement } from "@polymer/paper-listbox/paper-listbox.js";
import { PaperItemBodyElement } from "@polymer/paper-item/paper-item-body.js";

/**
 * Renders a table of contents based on posts.
 */
@customElement("table-of-contents")
export class TableOfContents extends LitElement {
  static styles = css`
    a {
      color: inherit;
      text-decoration: inherit !important;
    }
  `;

  render() {
    return html`${until(this.getPosts(), html`<p>Loading</p>`)}`;
  }

  private async getPosts() {
    const posts = await getPostsByDate();
    return html`
      <paper-listbox>
        ${posts.map((posts: Post[]) => {
          return this.renderItem(posts[0].date, posts[0].title);
        })}
      </paper-listbox>
    `;
  }

  private renderItem(date: string, title: string) {
    return html` <a href="#posted${date}" tabindex="-1">
      <paper-item raised>
        <paper-item-body two-line>
          <div>Posted Date: ${date}</div>
          <div secondary>${title}</div>
        </paper-item-body>
      </paper-item>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "table-of-contents": TableOfContents;
    "paper-listbox": PaperListboxElement;
    "paper-item": PaperItemElement;
    "paper-item-body": PaperItemBodyElement;
  }
}
