---
description: Comparison of methods for rendering BSP maps in the browser using VBsp.JS and ModelViewer in combination with Blender
title: Rendering BSP maps in the browser 🗺️
date: August 14, 2023
emoji: 🗺️
---

# Rendering BSP maps in the browser 🗺️

## Introduction

Recently to me for my previous [project](https://github.com/zachey01/MimiCMS) it was necessary to render the BSP map in the browser, or rather on the map preview page. At that time, there was already a [solution](https://github.com/MDFL64/vbsp.js) of this problem.

### [VBsp.JS](https://github.com/MDFL64/vbsp.js)

This method has many advantages:

- works everywhere (Firefox, Chrome, Safari, etc.);
- does not lag;
- easy to use;
- works with almost all BSP versions.

But there are also significant disadvantages:

- it's difficult to add your own textures and models;
- many bugs;
- does not work on mobile devices;
- textures are not detailed.

#### Usage

[Download](https://www.sendspace.com/file/ok3iq5)

```html
<div
  id="render"
  style="width: 800px; height: 600px; display: inline-block;"
></div>
<button
  onclick='map.loadMap("https://cdn.zachey.space/assets/gm_construct.bsp");'
>
  gm_construct
</button>

<script src="vbsp.js"></script>
<script>
  var map = new VBSP();
  map.ready(function () {
    map.initRenderer(document.getElementById("render"));
  });
</script>
```

![VBsp demo](https://telegra.ph/file/b39e74a08760191e092b7.png)

### [ModelViewer](https://modelviewer.dev) + Blender

<kbd>Cons</kbd>:

- sooo long to load
- difficult
- requires a lot of space on the server
- if the card is large, then this method is not suitable

<kbd>Advantages</kbd>:

- works everywhere
- map

#### Usage

#### Installation

1. Installing Blender and Java
2. Installing addons in Blender:

![](https://telegra.ph/file/15c3f5f112d6623bcdf18.png)

Click Install and select the downloaded archive and enable the addon, do the same with the second addon

![](https://telegra.ph/file/7cc92c31cfd04e27cb76c.png)

1. Import VMF from the menu: <kbd>Import/Plumber/.vmf</kbd>
2. Install skybox by selecting it and clicking on <kbd>Object/Transform VMF 3D sky</kbd>
   > You can switch shaders => ![](https://telegra.ph/file/1ed323bb09cf5bf0e22a5.png)

**Result:**

![Blender Result](https://telegra.ph/file/85cad0e26d2556540a070.jpg)

1. And then through export to .GLB and add to the site via ModelViewer or Three.JS
