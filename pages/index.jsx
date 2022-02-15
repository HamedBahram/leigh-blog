import { getAllPosts } from '@/lib/posts'

const Home = ({ posts }) => {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>{post.meta.title}</li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: { posts },
  }
}

export default Home
