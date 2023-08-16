---
data: 2023-08-15
title: Rendering BSP maps in the browser
tags: Source Engine, Blender, 3D, HTML
description: Various ways to render BSP maps in the browser...
---

### Introduction

Recently to me for my previous [project](https://github.com/zachey01/MimiCMS) it was necessary to render the BSP map in the browser, or rather on the map preview page. At that time, there was already a [solution] (https://github.com/MDFL64/vbsp.js) of this problem.

#### [VBsp.JS](https://github.com/MDFL64/vbsp.js)

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

##### Usage

[Download](/blog/render-bsp/VBsp-demo.zip)

<pre><code>
<div id="render" style="width: 800px; height: 600px; display: inline-block;"></div>
<button onclick='map.loadMap("https://cdn.zachey.space/assets/gm_construct.bsp");'>gm_construct</button>

<script src="vbsp.js"></script>
<script>
var map = new VBSP();
map.ready(function() {
map.initRenderer(document.getElementById("render"));
});
</script>

</code></pre>

![VBsp demo](/blog/render-bsp/vbsp-demo.png)

#### [ModelViewer](https://modelviewer.dev) + [Blender](https://www.blender.org/)

<kbd>Cons</kbd>:

- sooo long to load
- difficult
- requires a lot of space on the server
- if the card is large, then this method is not suitable

<kbd>Advantages</kbd>:

- works everywhere
- map

##### Usage

###### Installation

1. Installing Blender and Java
2. Installing addons in Blender:

![](/blog/render-bsp/blender-addon1.png)
Click Install and select the downloaded archive and enable the addon, do the same with the second addon
![](/blog/render-bsp/blender-addon2.png)

3. Import VMF from the menu: <kbd>Import/Plumber/.vmf</kbd>
4. Install skybox by selecting it and clicking on <kbd>Object/Transform VMF 3D sky</kbd>
   > You can switch shaders => ![](/blog/render-bsp/blender-addon3.png)

**Result:**

![Blender Result](/blog/render-bsp/blender-result.jpg =720x400)

4. And then through export to .GLB and add to the site via ModelViewer or Three.JS
