import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// syntax highlighting using highlight.js
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

// syntax highlighting using prism
// import rehypePrism from 'rehype-prism-plus'
// import 'prismjs/themes/prism-tomorrow.min.css'

import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import YouTube from '@/components/YouTube'

const components = {
  YouTube,
  Image,
}

const Article = ({ source, meta }) => {
  return (
    <div>
      <h1>{meta.title}</h1>
      <small>{meta.readTime}</small>
      <MDXRemote {...source} components={components} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const { meta, content } = getPostBySlug(slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        // [rehypePrism, { showLineNumbers: true }],
        rehypeHighlight,
      ],
    },
  })

  return {
    props: {
      source: mdxSource,
      meta,
    },
  }
}

export async function getStaticPaths() {
  const slugs = getAllSlugs()
  const paths = slugs.map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export default Article
