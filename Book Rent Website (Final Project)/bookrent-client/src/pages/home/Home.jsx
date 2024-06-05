import React from 'react'
import Banner from '../../components/Banner'
import Catagories from './Categories'
import PopularBooks from './PopularBooks'


const Home = () => {
  return (
    <div>
      <Banner/>
      <Catagories/>
      <PopularBooks/>

    </div>
  )
}

export default Home