import styles from '@/styles/YouTube.module.css'

const YouTube = ({ id }) => {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow='autoplay; encrypted-media'
        title='Embedded YouTube video'
        className={styles.frame}
      />
    </div>
  )
}

export default YouTube
