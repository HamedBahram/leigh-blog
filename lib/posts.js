import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postDirectory = path.join(process.cwd(), 'posts')

export const getPostBySlug = slug => {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(postDirectory, `${realSlug}.mdx`)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)
  return { slug: realSlug, meta: { ...data, readTime: stats.text }, content }
}

export const getAllPosts = () => {
  const files = fs.readdirSync(postDirectory)
  const posts = files.map(file => getPostBySlug(file))
  return posts.sort((postA, postB) => new Date(postB.meta.date) - new Date(postA.meta.date))
}

export const getAllSlugs = () => {
  const files = fs.readdirSync(postDirectory)
  const slugs = files.map(file => file.replace(/\.mdx$/, ''))
  return slugs
}

export const getPostsByTag = tag => {
  const posts = getAllPosts()
  const filtered = posts.filter(post => post.meta.tags.includes(tag))
  return filtered
}

export const getAllTags = () => {
  const posts = getAllPosts()
  const tags = posts.reduce((acc, curr) => [...acc, ...curr.meta.tags], [])
  return tags
}
