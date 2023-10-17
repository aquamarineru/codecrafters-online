import { client } from "../../../lib/client";

const baseUrl = 'https://www.codecrafters.online';
const staticPages = [
    '',
    'about',
    'impressum',
    'services',
    'projects',
    'blog',
    'terms-and-conditions',
    'privacy-policy',
  ];

  async function fetchDynamicRoutes() {
    try {
      const projectsQuery = '*[_type == "projectItem"]{slug}';
      const blogPostsQuery = '*[_type == "postMain"]{slug}';
      const projects = await client.fetch(projectsQuery);
      const blogPosts = await client.fetch(blogPostsQuery);
  
      console.log('Projects:', projects);
      console.log('Blog Posts:', blogPosts);
  
      const projectRoutes = projects.map(project => `/projects/${encodeURIComponent(project.slug?.current || "")}`);
      const blogRoutes = blogPosts.map(post => `blog/${encodeURIComponent(post.slug?.current || "")}`);
  
      console.log('Project Routes:', projectRoutes);
      console.log('Blog Routes:', blogRoutes);
  
      return [...projectRoutes, ...blogRoutes];
    } catch (error) {
      console.error('Error fetching dynamic routes:', error);
    }
  }
  const sitemapHandler = async (req, res) => {
    const dynamicRoutes = await fetchDynamicRoutes();
    const allRoutes = [...staticPages, ...dynamicRoutes];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes.map(route => `
        <url>
          <loc>${baseUrl}/${route}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>
  `;
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  };

  export default sitemapHandler;