---
title: "Cartoon Shader"
description: "A creative exploration of toon shading techniques in Blender, showcasing custom shader development for stylized 3D models."
date: "2022-02-20"
categories: ["3D Design"]
tags: ["Blender", "Shader Development"]
image: "https://github.com/reatured/public-assets/blob/main/3d-design/project2-magicwand/WandDemoGIF7.gif?raw=true"
featured: true
---

# Cartoon Shader

## Overview

Modelling and coloring with a custom toon shader in Blender.

## Process

1. **Base Modeling**: Created the base 3D models.
2. **Shader Development**: Developed a custom toon shader using Blender's shader nodes.
3. **Material Application**: Applied the toon shader to various objects.
4. **Lighting Setup**: Configured lighting to complement the toon shading style.
5. **Animation**: Added simple animation to showcase the shader in action.

## Technical Details

The toon shader was built using Blender's node system, combining key elements such as:

- **Shader Nodes**: Using nodes like Diffuse BSDF, Shader to RGB, and ColorRamp.
- **ColorRamp with Constant Interpolation**: To create distinct color bands for shadows and highlights, achieving the characteristic flat shading of cartoons.
- **Fresnel Effect**: Incorporated to enhance edge lighting and add subtle rim highlights.
- **Customizable Parameters**: Including line thickness, color saturation, and shadow softness for artistic control.
- **Outline Creation**: Added outlines by applying a Solidify modifier with a separate outline material that uses backface culling and flipped normals to simulate cartoon-style edges.

## Tools Used

- Blender 3.0
- Custom shader nodes
- Animation tools

## Media Gallery
<div class="image-grid-2column">
   <img 
     src="https://github.com/reatured/public-assets/blob/main/3d-design/project2-magicwand/WandDemoGIF7.gif?raw=true" 
     alt="Wand Demo GIF"
   />
   <img 
     src="https://github.com/reatured/public-assets/blob/main/3d-design/project2-magicwand/CakeDemoGIF7.gif?raw=true" 
     alt="Cake Demo GIF"
   />
   <iframe 
     src="https://player.vimeo.com/video/595566707" 
     width="100%" 
     height="360" 
     frameborder="0" 
     allow="autoplay; fullscreen; picture-in-picture" 
     allowfullscreen
     title="Cartoon Shader Demo Video 1"></iframe>
   <iframe 
     src="https://player.vimeo.com/video/595566536" 
     width="100%" 
     height="360" 
     frameborder="0" 
     allow="autoplay; fullscreen; picture-in-picture" 
     allowfullscreen
     title="Cartoon Shader Demo Video 2"></iframe>
</div>
