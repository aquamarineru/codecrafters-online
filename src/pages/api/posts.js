// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from '../../../lib/client'

export default async function posts(req, res) {
  const { start, end } = req.query

  if(isNaN(Number(start)) || isNaN(Number(end))) {
    res.status(400).end().json({ error: 'Invalid query' })
  }

  const { posts, total } = await loadPosts(start, end)
  res.status(200).json({ posts, total })
}

export async function loadPosts(start, end) {
  // Separate the order and filter from the projection:
  const query = `
    *[_type == "post"] | order(postMain[0].publishedAt desc) [${start}...${end}] {
      _id,
      title,
      description,
      button,
      "postMains": postMain[]->{
        _id,
        title,
        subtitle,
        image,
        button,
        publishedAt,
        slug,
        readTime,
        body,
        tags[]->{
          _id,
          title,
          slug
        },
        author[]->{
          _id,
          name,
          image,
          bio
        }
      }
    }
  `;

  // Separate the total count query:
  const countQuery = `
    count(*[_type == "post"])
  `;

  const posts = await client.fetch(query);
  const total = await client.fetch(countQuery);
  
  return { posts, total };
}

/* export async function loadPosts(start, end) {
  const query = `
  {
    "posts": *[_type == "post"] | order(postMain[0].publishedAt desc) [${start}...${end}] {
      _id,
      title,
      description,
      button,
      postMain[]->{
        _id,
        title,
        subtitle,
        image,
        button,
        publishedAt,
        slug,
        readTime,
        body,
        tags[]->{
          _id,
          title,
          slug,
        },
        author[]->{
          _id,
          name,
          image,
          bio,
        }
      }
    },
    "total": count(*[_type == "post"])
  }
  `

const { posts, total } = await client.fetch(query)
return { posts, total }
} */
