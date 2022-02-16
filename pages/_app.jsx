import Link from 'next/link'
import Head from 'next/head'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <div className='container'>
            <Head>
                <title>My Blog</title>
            </Head>
            <nav>
                <Link href='/'>Home</Link>
            </nav>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
