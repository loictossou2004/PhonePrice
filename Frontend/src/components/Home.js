import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'

function Home() {
    
    const navigate = useNavigate()
  
    return (
    <div className='w-full h-full font-Poppins '>
        <div className='w-full h-full flex justify-center md:py-20 py-10 overflow-auto no-scrollbar'>
            <div className='md:max-w-[50%] max-w-[90%] w-full h-auto flex justify-between items-center font-extrabold space-x-6'>
                <div className='bg-[#2082B9] px-12 py-3 rounded-3xl shadow-lm text-[#FFFFFF] cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/')}>Catégorie</div>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/choice')}>Choix</div>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/clients')}>Clients</div>
            </div>
        </div>
        <div className='w-full h-full flex flex-wrap items-center md:space-x-5 space-y-6 justify-center py-20 px-20'>
            {[...Array(10)].map((index) => (
                <div className='flex flex-col md:w-[25%] w-[100%] h-[350px] object-none bg-white rounded-xl shadow-lm border ' key={index}>
                    <div className='w-full h-[60%] bg-[#2082B9] rounded-t-xl shadow-lm'>
                        <div className='flex space-x-4 p-2 justify-end'>
                            <AiFillDelete className='bg-white rounded-full p-2 w-10 h-10 cursor-pointer hover:scale-110 duration-150' fontSize={25} color='red'/>
                            <MdEdit className='bg-white rounded-full p-2 w-10 h-10 cursor-pointer hover:scale-110 duration-150' fontSize={25}/>
                        </div>
                        <div className='w-full h-full flex justify-center items-center font-black text-white'>
                            Iphone
                        </div>

                    </div>
                    <div className='p-2 space-y-3 font-extrabold'>
                        <div>Iphone</div>
                        <div>1500000</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home