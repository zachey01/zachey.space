import fs from "fs";
import path from "path";
import showdown from "showdown";
import htmlMinifier from "html-minifier";

const converter = new showdown.Converter();
const blogDir = "./articles";
const templatePath = "./src/article-template.html";
const outputDir = "./dist/blog";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const template = fs.readFileSync(templatePath, "utf8");

fs.readdir(blogDir, (err, files) => {
  if (err) {
    console.error("Error reading blog directory:", err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === ".md") {
      const filePath = path.join(blogDir, file);
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        const { metadata, content } = parseMarkdown(data);

        const html = template
          .replace(/<%= metadata.title %>/g, metadata.title)
          .replace(/<%= metadata.emoji %>/g, metadata.emoji)
          .replace(/<%= metadata.description %>/g, metadata.description)
          .replace(/<%= htmlContent %>/g, content);

        const htmlFilePath = path.join(
          outputDir,
          `${path.basename(file, ".md")}.html`
        );

        // Минимизируем HTML перед сохранением
        const minifiedHtml = htmlMinifier.minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
        });

        fs.writeFile(htmlFilePath, minifiedHtml, (err) => {
          if (err) {
            console.error("Error writing HTML file:", err);
          }
        });
      });
    }
  });
});

function parseMarkdown(markdown) {
  const lines = markdown.split("\n");
  let metadata = {};
  let content = "";

  let inMetadata = false;
  lines.forEach((line) => {
    if (line.trim() === "---") {
      inMetadata = !inMetadata;
    } else if (inMetadata) {
      const [key, value] = line.split(":").map((item) => item.trim());
      metadata[key] = value;
    } else {
      content += line + "\n";
    }
  });

  return { metadata, content: converter.makeHtml(content) };
}
