import type { HelmetServerState } from "react-helmet-async";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { clearPrerenderPathname, setPrerenderPathname } from "./lib/routes";

type HeadElement = {
  type: string;
  props: Record<string, string>;
};

/** Helmet already HTML-escapes; vite-prerender-plugin escapes again — decode once. */
function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTitle(titleFragment: string) {
  const match = titleFragment.match(/<title[^>]*>(.*?)<\/title>/i);
  const raw = match?.[1]?.trim() ?? "";
  return decodeHtmlEntities(raw);
}

function parseHelmetTags(fragment: string): HeadElement[] {
  const elements: HeadElement[] = [];
  const tagRegex = /<(meta|link)\s+([^>]+?)\/?>/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(fragment)) !== null) {
    const type = match[1].toLowerCase();
    const attrString = match[2];
    const props: Record<string, string> = {};
    const attrRegex = /([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
    let attrMatch: RegExpExecArray | null;

    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      const key = attrMatch[1];
      const value = attrMatch[3] ?? attrMatch[4] ?? "";
      props[key] = key === "content" || key === "href" ? decodeHtmlEntities(value) : value;
    }

    if (Object.keys(props).length > 0) {
      elements.push({ type, props });
    }
  }

  return elements;
}

function helmetToHead(helmet?: HelmetServerState) {
  if (!helmet) return undefined;

  const title = extractTitle(helmet.title.toString());
  const elements = new Set([
    ...parseHelmetTags(helmet.meta.toString()),
    ...parseHelmetTags(helmet.link.toString()),
  ]);

  return {
    title: title || undefined,
    elements,
  };
}

export async function prerender(data: { url: string }) {
  const { renderToString } = await import("react-dom/server");
  const { parseLinks } = await import("vite-prerender-plugin/parse");

  const url = new URL(data.url, "http://localhost");
  setPrerenderPathname(url.pathname);

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  const helmetContext: { helmet?: HelmetServerState } = {};

  try {
    const html = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>,
    );

    const links = parseLinks(html);
    const head = helmetToHead(helmetContext.helmet);

    return {
      html,
      links: new Set(links),
      head,
    };
  } finally {
    clearPrerenderPathname();
  }
}
