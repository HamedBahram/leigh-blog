import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'posts')

export const getPostBySlug = slug => {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(postDirectory, `${realSlug}.mdx`)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const { data, content } = matter(fileContent)
  return { slug: realSlug, meta: data, content }
}

export const getAllPosts = () => {
  const files = fs.readdirSync(postDirectory)
  const posts = files.map(file => getPostBySlug(file))
  return posts.sort(
    (postA, postB) => new Date(postB.meta.date) - new Date(postA.meta.date)
  )
}

export const getAllSlugs = () => {
  const files = fs.readdirSync(postDirectory)
  const slugs = files.map(file => file.replace(/\.mdx$/, ''))
  return slugs
}
