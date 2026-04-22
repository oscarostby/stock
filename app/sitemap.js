import { siteUrl } from "./seo";

const routes = [
  { path: "/", priority: 1 },
  { path: "/tjenester", priority: 0.9 },
  { path: "/pris", priority: 0.8 },
  { path: "/hvorfor", priority: 0.8 },
  { path: "/kontakt", priority: 0.9 },
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
