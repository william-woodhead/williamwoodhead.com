const { marked } = require("marked");
const fs = require("fs");
const Handlebars = require("handlebars");

const sitemapPath = `${__dirname}/sitemap.json`;
const postsDir = `${__dirname}/posts`;
const postTemplatePath = `${__dirname}/templates/post.html`;
const homeTemplatePath = `${__dirname}/templates/home.html`;

const outputDir = `${__dirname}/out`;

const sitemap = JSON.parse(fs.readFileSync(sitemapPath).toString());

// Generate all posts
if (fs.existsSync(outputDir)){
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir);

for (index in sitemap.posts) {
  const post = sitemap.posts[index];
  const contents = fs.readFileSync(`${postsDir}/${post.filename}`).toString();
  const htmlPost = marked.parse(contents);
  const source = fs.readFileSync(postTemplatePath).toString();
  const template = Handlebars.compile(source);
  const result = template({ ...post, htmlPost });
  fs.writeFileSync(`${outputDir}/${post.slug}.html`, result);
}

// Generate home page
sitemap.home.slug
const source = fs.readFileSync(homeTemplatePath).toString();
const template = Handlebars.compile(source);
const result = template({ posts: sitemap.posts });
fs.writeFileSync(`${outputDir}/${sitemap.home.slug}`, result);

// copy styles
fs.cpSync("./css", "./out", { recursive: true });
