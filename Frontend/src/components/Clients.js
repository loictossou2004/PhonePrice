import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import {BsFillCloudDownloadFill} from 'react-icons/bs'

function Clients() {
    
    const navigate = useNavigate()
  
    return (
    <div className='w-full h-full font-Poppins '>
        <div className='w-full h-full flex justify-center md:py-20 py-10 overflow-auto no-scrollbar'>
            <div className='md:max-w-[50%] max-w-[90%] w-full h-auto flex justify-between items-center font-extrabold space-x-6'>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150 ' onClick={() => navigate('/')}>Catégorie</div>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/choice')}>Choix</div>
                <div className='bg-[#2082B9] px-12 py-3 rounded-3xl shadow-lm text-[#FFFFFF] cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/clients')}>Clients</div>
            </div>
        </div>
        <div className='w-full h-full flex flex-wrap items-center md:space-x-5 space-y-6 justify-center '>
            <div className='md:max-w-[90%] max-w-full w-full h-auto justify-between items-center font-extrabold space-y-5 py-6'>
                {[...Array(10)].map((index) => (
                    <div className='bg-[#FFFFFF] w-full h-auto py-8 rounded-3xl shadow-lm flex justify-between items-center md:px-8 px-2'>
                        <div className='text-center font-extrabold text-md'>Arnaud de la campagne</div>
                        <div className='text-center font-extrabold text-md md:px-0 px-4'>17/01/2023</div>
                        <div className='flex md:space-x-8 space-x-4'>
                            <div className='text-center font-extrabold cursor-pointer hover:scale-110 duration-150'><BsFillCloudDownloadFill className='md:text-[30px]' ></BsFillCloudDownloadFill></div>
                            <div className='text-center font-extrabold cursor-pointer hover:scale-110 duration-150'><AiFillDelete color='red' className='md:text-[30px]'></AiFillDelete></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Clients