const { marked } = require("marked");
const fs = require("fs");
const Handlebars = require("handlebars");

const sitemapPath = `${__dirname}/sitemap.json`;
const postsDir = `${__dirname}/posts`;
const postTemplatePath = `${__dirname}/templates/post.html`;
const outputDir = `${__dirname}/out`;

const sitemap = JSON.parse(fs.readFileSync(sitemapPath).toString());

// Generate all posts
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

for (index in sitemap.posts) {
  const post = sitemap.posts[index];
  const contents = fs.readFileSync(`${postsDir}/${post.filename}`).toString();
  const htmlPost = marked.parse(contents);
  const source = fs.readFileSync(postTemplatePath).toString();
  const template = Handlebars.compile(source);
  const result = template({ ...post, htmlPost });
  fs.writeFileSync(`${outputDir}/${post.slug}`, result);
}
