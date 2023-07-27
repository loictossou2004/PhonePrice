import React from 'react'
import {useNavigate} from 'react-router-dom'

function Choice() {

    const navigate = useNavigate()

  return (
    <div className='w-full h-full font-Poppins '>
        <div className='w-full h-full flex justify-center md:py-20 py-10 overflow-auto no-scrollbar'>
            <div className='md:max-w-[50%] max-w-[90%] w-full h-auto flex justify-between items-center font-extrabold space-x-6'>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/')}>Catégorie</div>
                <div className='bg-[#2082B9] px-12 py-3 rounded-3xl shadow-lm text-[#FFFFFF] cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/choice')}>Choix</div>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/clients')}>Clients</div>
            </div>
        </div>
        <div className='w-full h-full flex items-center md:space-x-5 space-y-6 justify-center'>
            <div className='max-w-[90%] w-full h-auto flex md:flex-row flex-col  justify-between items-center font-extrabold md:space-x-6 md:space-y-0 space-y-5'>
                <div className='bg-[#FFFFFF] w-full h-auto py-8 rounded-3xl shadow-lm'>
                    <div className='text-center font-extrabold'>Votre Iphone</div>
                    <div className=' w-full flex justify-center'>
                        <select value="nothing" className='w-[80%] p-2 py-sm-3 rounded-md mt-1 outline-none border placeholder:font-extrabold' required>
                            <option value={1} >lol</option>
                        </select>
                    </div>
                </div>
                
                
                <div className='bg-[#FFFFFF] w-full h-auto py-8 rounded-3xl shadow-lm'>
                    <div className='text-center font-extrabold'>L'état de votre batterie</div>
                    <div className=' w-full flex justify-center'>
                        <select value="nothing" className='w-[80%] p-2 py-sm-3 rounded-md mt-1 outline-none border placeholder:font-extrabold' required>
                            <option value={1} >lol</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div className='w-full h-full flex items-center md:space-x-5 space-y-6 justify-center py-8'>
            <div className='md:max-w-[50%] max-w-[90%] w-full h-auto flex md:flex-row flex-col  justify-between items-center font-extrabold md:space-x-6 md:space-y-0 space-y-5'>
                <div className='bg-[#FFFFFF] w-full h-auto py-8 rounded-3xl shadow-lm'>
                    <div className='text-center font-extrabold'>Votre Iphone</div>
                    <div className=' w-full flex justify-center'>
                        <select value="nothing" className='w-[80%] p-2 py-sm-3 rounded-md mt-1 outline-none border placeholder:font-extrabold' required>
                            <option value={1} >lol</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-center font-extrabold md:text-3xl py-10'>
            <div>
                Le montant s'élève à:<span className='text-[#2082B9]'> 150000 FCFA</span>
            </div>
        </div>

        <div className='w-full flex justify-center font-extrabold py-10'>
            <div className='bg-[#2082B9] px-12 py-3 rounded-3xl shadow-lm text-[#FFFFFF] cursor-pointer hover:scale-110 duration-150'>Valider</div>
        </div>

    
    </div>
  )
}

export default Choice