import fs from "fs";
import path from "path";
import showdown from "showdown";
import yaml from "js-yaml";
import htmlMinifier from "html-minifier";

const converter = new showdown.Converter();
const sourceFolder = "./articles";
const targetFolder = "./dist";

const getAllMetadata = () => {
  const metadata = [];

  const files = fs.readdirSync(sourceFolder);
  for (const file of files) {
    const filePath = path.join(sourceFolder, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const delimiterIndex = content.indexOf("---", 4);
    const frontMatter = content.substring(4, delimiterIndex);
    const { title, description, date } = yaml.load(frontMatter);
    const link = file.split(".")[0];
    const postContent = content.substring(delimiterIndex + 4); // Content after front matter
    metadata.push({
      title,
      description,
      date,
      content: converter.makeHtml(postContent),
      link,
    });
  }

  return metadata;
};

const generateHTML = async () => {
  const metadata = await getAllMetadata();
  const htmlTemplate = fs.readFileSync("./src/blog-template.html", "utf-8");

  const blogPosts = metadata.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    link: post.link,
  }));

  let htmlContent = htmlTemplate.replace(
    /<% blogPosts.forEach\(post => \{ %>(.*?)<% \}\); %>/gs,
    (_, content) => {
      return blogPosts
        .map((post) => {
          return content.replace(/<%= post.(.*?) %>/g, (_, key) => post[key]);
        })
        .join("");
    }
  );

  // Minify HTML content
  const minifiedHtml = htmlMinifier.minify(htmlContent, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
  });

  fs.writeFileSync(path.join(targetFolder, "blog.html"), minifiedHtml);
};

generateHTML();
export const getBlogPosts = () => {
  return getAllMetadata();
};

export default getBlogPosts;
