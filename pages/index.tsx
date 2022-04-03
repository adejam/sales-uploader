import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Add Sales Data</title>
        <meta name="description" content="Sales app home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div><h1 className='bold text-xl font-extrabold text-center '>Home page</h1></div>
    </div>
  )
}

export default Home
