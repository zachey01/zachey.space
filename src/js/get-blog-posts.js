fetch("/blog/feed.xml")
  .then((response) => response.text())
  .then((xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const items = xmlDoc.querySelectorAll("item");
    const totalItems = items.length;

    for (let i = totalItems - 3; i < totalItems; i++) {
      const item = items[i];
      const titleElement = item.querySelector("title");
      const linkElement = item.querySelector("link");
      const descriptionElement = item.querySelector("description");

      if (titleElement && linkElement && descriptionElement) {
        const post = {
          title: titleElement.textContent,
          link: linkElement.textContent,
          description: descriptionElement.textContent,
        };

        const blogArticle = document.createElement("div");
        blogArticle.classList.add("blog-article");

        const title = document.createElement("h3");
        title.classList.add("blog-article-title");
        const titleLink = document.createElement("a");
        titleLink.setAttribute("href", `/blog/${post.link}`);
        titleLink.textContent = post.title;
        title.appendChild(titleLink);
        blogArticle.appendChild(title);

        const description = document.createElement("p");
        description.classList.add("blog-article-description");
        description.textContent = post.description;
        blogArticle.appendChild(description);

        document.body.appendChild(blogArticle);
      } else {
      }
    }
  })
  .catch((error) => {
    console.error("XML Error:", error);
  });
