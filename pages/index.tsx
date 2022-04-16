import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add Sales Data</title>
        <meta name="description" content="Sales app home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='m-auto'>
        <h1 className='text-3xl my-4 font-extrabold text-center '>Welcome to BatchJob</h1>
        <h2 className='text-xl text-gray-500 text-center '>
          Use BatchJob to upload thousands and even a million data form a csv file
        </h2>
      </div>
    </>
  )
}

export default Home
