// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Julien Tanay",
  siteDescription:
    "About Software Development, DevOps culture, creative thinking and hacking things.",
  siteUrl: "https://www.julientanay.com",
  plugins: [
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md",
        route: "/blog/:slug",
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            route: "/blog/tag/:id",
            create: true,
          },
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
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Julien Tanay",
          feed_url: "https://www.julientanay.com/blog/rss.xml",
          site_url: "https://www.julientanay.com",
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: "https://www.julientanay.com/blog/" + node.slug,
          author: node.fields.author,
        }),
        output: {
          dir: "./static",
          name: "rss.xml",
        },
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"],
    },
  },
};
