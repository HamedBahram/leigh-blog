import { getAllPosts } from '@/lib/posts'
import Articles from '@/components/Articles'

const Home = ({ posts }) => {
    return (
        <>
            <h1>Articles</h1>
            <Articles posts={posts} />
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
