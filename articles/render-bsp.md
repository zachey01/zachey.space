---
data: 2023-08-15
title: Рендеринг BSP карт в браузере
tags: Source Engine, Blender, 3D, HTML
description: Различные способы рендеринга BSP карт в браузере...
---

### Введение

Недавно мне для моего предыдущего [проекта](https://github.com/zachey01/MimiCMS) понадобилось рендерить BSP карту в браузере, а точнее на странице предпросмотра карты. На тот момент уже существовало [решение](https://github.com/MDFL64/vbsp.js) этой проблемы.

#### [VBsp.JS](https://github.com/MDFL64/vbsp.js)

У этого способа много плюсов:

- работает везде (Firefox, Chrome, Safari и т.д.);
- не лагает;
- легкий в использовании;
- работает почти со всеми версиями BSP.

Но есть и существенные минусы:

- сложно добавить свои текстуры и модели;
- мноооого багов;
- не работает на мобильных устройствах;
- текстуры не детализированные.

##### Использование

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

<kbd>Минусы</kbd>:

- ооочень долго загружается
- сложно
- требует много места на сервере
- если карта большая, то такой способ не подходит

<kbd>Плюсы</kbd>:

- работает везде
- карта

##### Использование

###### Установка

1. Установка Blender и Java
2. Установка аддонов в Blender:

   ![](/blog/render-bsp/blender-addon1.png)
   Нажмите Install и выберите скачанный архив и включите аддон, тоже самое сделайте с вторым аддоном
   ![](/blog/render-bsp/blender-addon2.png)

3. Импортируйте VMF из меню : <kbd>Import/Plumber/.vmf</kbd>
4. Установите skybox выделив его и нажав на <kbd>Object/Transform VMF 3D sky</kbd>
   > Переключить шейдеры можно => ![](/blog/render-bsp/blender-addon3.png)

**Результат:**

![Blender Result](/blog/render-bsp/blender-result.jpg =720x400)

###### Интеграция на сайт
