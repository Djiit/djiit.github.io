// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

const postcssPlugins = [tailwind()];

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

module.exports = {
  siteName: "Julien Tanay",
  siteDescription:
    "About Software Development, DevOps culture, creative thinking and getting shit done.",
  siteUrl: "https://www.julientanay.com",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        typeName: "Post",
        refs: {
          tags: {
            typeName: "Tag",
            route: "blog/tag/:id",
            create: true,
          },
        },
        remark: {
          plugins: [
            [
              "gridsome-plugin-remark-shiki",
              { theme: "Material-Theme-Palenight", skipInline: true },
            ],
          ],
        },
      },
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Gridsome Portfolio Starter Blog",
          feed_url: "https://www.julientanay.com/blog/rss.xml",
          site_url: "https://www.julientanay.com/",
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: "https://www.julientanay.com/blog" + node.path,
          author: "Julien Tanay",
          date: node.date,
        }),
        output: {
          dir: "./static",
          name: "rss.xml",
        },
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000, // default
        config: {
          "/blog/*": {
            changefreq: "weekly",
            priority: 0.5,
          },
        },
      },
    },
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
