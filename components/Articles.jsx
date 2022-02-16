import Link from 'next/link'
import styles from '@/styles/Articles.module.css'

const Articles = ({ posts }) => {
    return (
        <ul className={styles.list}>
            {posts.map(post => (
                <li key={post.slug}>
                    <Link href={`/posts/${post.slug}`}>
                        <a className={styles.title}>{post.meta.title}</a>
                    </Link>
                    <p>{post.meta.excerpt}</p>
                    <p className={styles.tags}>
                        {post.meta.tags.map(tag => (
                            <Link key={tag} href={`/tags/${tag}`}>
                                {tag}
                            </Link>
                        ))}
                    </p>
                </li>
            ))}
        </ul>
    )
}

export default Articles
