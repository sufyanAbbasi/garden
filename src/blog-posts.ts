import "@polymer/paper-card";
import "@polymer/marked-element";

import { LitElement, html, css, nothing } from "lit";
import { until } from "lit-html/directives/until.js";
import { customElement } from "lit/decorators.js";

export interface Post {
  date: string;
  title: string;
  imageUrl: string;
  alt: string;
  content: string;
}

export function getPostsByDate() {
  return new Promise((resolve: (post: Post[]) => any, reject) => {
    var req = new XMLHttpRequest();
    req.responseType = "json";
    req.open("GET", "posts.json", true);
    req.onload = () => {
      const jsonResponse = req.response as Post[];
      resolve(jsonResponse);
    };
    req.onerror = reject;
    req.send(null);
  }).then((posts: Post[]) => {
    return posts
      .sort((a: Post, b: Post) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .reduce(
        (previousValue: Post[][], currentValue: Post) => {
          if (previousValue[0][0]) {
            const currDate = previousValue[0][0].date;
            if (currentValue.date === currDate) {
              previousValue[0].push(currentValue);
            } else {
              previousValue.unshift([currentValue]);
            }
          } else {
            previousValue[0].push(currentValue);
          }
          return previousValue;
        },
        [[]]
      )
      .reverse();
  });
}

/**
 * Renders a list of blog posts.
 */
@customElement("blog-posts")
export class BlogPosts extends LitElement {
  static styles = css`
    paper-card {
      margin: 10px 30px;
      max-width: 800px;
      width: 75%;
    }

    img {
      width: 100%;
      max-width: 400px;
    }

    .date-header {
      margin: 30px;
    }
  `;

  render() {
    return html`${until(this.getPosts(), html`<p>Loading</p>`)}`;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", () => this.onHashChange());
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", () => this.onHashChange());
    super.disconnectedCallback();
  }

  private onHashChange() {
    location.hash && this.shadowRoot!.querySelector(location.hash)?.scrollIntoView();
  }

  private async getPosts() {
    const posts = await getPostsByDate();
    setTimeout(() => {
      this.onHashChange();
    }, 10);
    return posts.map((posts: Post[]) => {
      return html` <h2 id="posted${posts[0].date}" class="date-header">
          ${posts[0].date}
        </h2>
        ${posts.map((post: Post) => {
          const { title, imageUrl, alt, content } = post;
          return this.renderCard(title, imageUrl, alt, content);
        })}`;
    });
  }

  private renderCard(title: string, imageUrl = "", alt = "", content: string) {
    return html`
      <paper-card heading="${title}">
        <div class="card-content">
          ${imageUrl ? html`<img src="${imageUrl}" alt="${alt}">` : nothing}
          <marked-element>
            <div slot="markdown-html"></div>
            <script type="text/markdown">
              ${content}
            </script>
          </marked-element>
        </div>
        <!-- <div class="card-actions"></div> -->
      </paper-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "blog-posts": BlogPosts;
  }
}
