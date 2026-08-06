const fs = require("fs");
const path = require("path");
const http = require("http");
const puppeteer = require("puppeteer");

const BUILD_DIR = path.join(__dirname, "..", "build");
const SITE_URL = "https://info.t-cafe.com";
const PORT = 45678;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function readRoutes() {
  const sitemapPath = path.join(BUILD_DIR, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`sitemap.xml not found at ${sitemapPath}`);
  }
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(
    (m) => m[1],
  );
  const routes = locs
    .filter((loc) => loc.startsWith(SITE_URL))
    .map((loc) => loc.slice(SITE_URL.length) || "/")
    .map((r) => (r.length > 1 ? r.replace(/\/$/, "") : r));
  return [...new Set(routes)];
}

function startServer(shell) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const resolved = path.join(BUILD_DIR, path.normalize(urlPath));

    if (
      resolved.startsWith(BUILD_DIR) &&
      fs.existsSync(resolved) &&
      fs.statSync(resolved).isFile()
    ) {
      res.writeHead(200, {
        "Content-Type":
          MIME[path.extname(resolved)] || "application/octet-stream",
      });
      fs.createReadStream(resolved).pipe(res);
      return;
    }

    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(shell);
  });

  return new Promise((resolve) =>
    server.listen(PORT, "127.0.0.1", () => resolve(server)),
  );
}

function outputPaths(route) {
  if (route === "/") return [path.join(BUILD_DIR, "index.html")];
  const rel = route.replace(/^\//, "");
  return [
    path.join(BUILD_DIR, `${rel}.html`),
    path.join(BUILD_DIR, rel, "index.html"),
  ];
}

async function main() {
  const shellPath = path.join(BUILD_DIR, "index.html");
  if (!fs.existsSync(shellPath)) {
    throw new Error("build/index.html not found — run `npm run build` first.");
  }
  const shell = fs.readFileSync(shellPath, "utf8");

  const routes = readRoutes();
  console.log(`[prerender] ${routes.length} routes from sitemap.xml`);

  const server = await startServer(shell);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const rendered = [];
  const warnings = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    for (const route of routes) {
      await page.goto(`${ORIGIN}${route}`, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          return root && root.children.length > 0;
        },
        { timeout: 30000 },
      );

      const html = await page.content();
      const title = await page.title();

      if (/Page Not Found/.test(html)) {
        warnings.push(
          `${route} rendered the NotFound page — check the route exists in App.js`,
        );
      }

      rendered.push({ route, html });
      console.log(
        `[prerender] ${route.padEnd(38)} ${(html.length / 1024).toFixed(0)}KB  ${title}`,
      );
    }
  } finally {
    await browser.close();
    server.close();
  }

  let files = 0;
  for (const { route, html } of rendered) {
    for (const out of outputPaths(route)) {
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, html, "utf8");
      files += 1;
    }
  }

  console.log(`[prerender] wrote ${files} files for ${rendered.length} routes`);

  if (warnings.length) {
    console.warn("\n[prerender] warnings:");
    warnings.forEach((w) => console.warn(`  - ${w}`));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
