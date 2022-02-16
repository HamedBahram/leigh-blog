import Articles from '@/components/Articles'
import { getAllTags, getPostsByTag } from '@/lib/posts'
// import { useRouter } from 'next/router'

const FilteredByTag = ({ tag, posts }) => {
  //   since we have access to tag in getStaticProps()
  //   no need to use router here.
  //   const router = useRouter()
  //   const tag = router.query?.tag

  return (
    <>
      <h1>Tag: {tag}</h1>
      <Articles posts={posts} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { tag } = params
  const posts = getPostsByTag(tag)

  return {
    props: { tag, posts },
  }
}

export async function getStaticPaths() {
  const tags = getAllTags()
  const paths = tags.map(tag => ({ params: { tag } }))

  return {
    paths,
    fallback: false,
  }
}

export default FilteredByTag
