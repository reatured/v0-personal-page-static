# Portfolio Website

This is a portfolio website built with Next.js, featuring dynamic category routes and markdown-based project content.

## Adding New Projects

To add a new project, create a markdown file in the `projects` directory with the following frontmatter structure:

\`\`\`markdown
---
title: Project Title
description: A brief description of the project
date: YYYY-MM-DD
image: /path/to/image.jpg
categories: [category1, category2]
tags: [tag1, tag2, tag3]
githubUrl: https://github.com/username/repo (optional)
liveUrl: https://demo-url.com (optional)
---

# Project Content

Write your project details here using Markdown.
\`\`\`

### Frontmatter Fields

- **title**: The title of your project
- **description**: A brief description (1-2 sentences)
- **date**: The completion date in YYYY-MM-DD format
- **image**: Path to the project's featured image
- **categories**: An array of categories the project belongs to
- **tags**: An array of technologies or skills used
- **githubUrl** (optional): Link to the GitHub repository
- **liveUrl** (optional): Link to the live demo

### Available Categories

- `3d-design`: 3D Design projects
- `graphic-design`: Graphic Design work
- `creative-coding`: Creative coding experiments
- `game-dev`: Game development projects
- `xr-dev`: VR/AR/XR development
- `full-stack`: Full stack web applications

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
