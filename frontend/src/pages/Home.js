import React from 'react'
import TravelImg from '../assets/travel.svg'
import FeatImg from '../assets/features.svg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='md:mx-28 mx-4 text-white pt-10 pb-12'>

      <div className='md:grid md:grid-cols-2 items-center pt-10'>
        <div className=''>
          <h1 className='text-3xl md:text-6xl'>Who we are</h1>
          <p className='text-xl md:text-2xl py-4 tracking-wider'></p>

          <Link to="/upload">
            <button className='bg-secondary py-2 px-8 rounded-md text-xl md:text-2xl'>Upload Menue</button>
          </Link>

        </div>
        <div className="grid place-items-center py-4 drop-shadow-3xl shadow-black">
          <img src={TravelImg} alt="img" width="350" height="350" />
        </div>
      </div>

      <div className='md:grid md:grid-cols-2 pt-12 items-center'>
        <div className="grid place-items-center py-4 drop-shadow-3xl shadow-black">
          <img src={FeatImg} alt="img" width="350" height="350" />
        </div>
        <div className=''>
          <h1 className='text-3xl md:text-6xl'>What else do we have</h1>
          <p className='text-xl md:text-2xl py-4 tracking-wider'> Don't Dis My Ability is a web app where you can:
          </p>
          <ul className="text-xl">
            <li className="list-disc">Allow micropayments to be made using Coil</li>
            <li className="list-disc">Classify the food as vegetarian or non-vegetarian</li>
            <li className="list-disc">Upload the menu and extract the information from it</li>
            <li className="list-disc">Convert the extracted text from the menu into speech</li>
            <li className="list-disc">Get nutrition information about the food, such as its ingredients and its calories</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
