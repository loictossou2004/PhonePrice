import React, { useEffect, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function Home() {

    const [FillDataDelete, setFillDataDelete] = useState({})

    const [showPopUp, setShowPopUp] = useState(false)
    const [showPopUpDelete, setShowPopUpDelete] = useState(false)
    const [showDictionnaryPhone, setShowDictionnaryPhone] = useState({})
    const [showDictionnaryBattery, setShowDictionnaryBattery] = useState({})


    const [selectedValue, setSelectedValue] = useState('telephone')
    const [ChangeName, setChangeName] = useState('')
    const [ChangeValue, setChangeValue] = useState('')


    const HandleSetShowPopupDelete = (type, name, value) => {
        setFillDataDelete({type: type, name: name, value: value})
        setShowPopUpDelete(true)
    }

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangeName = (event) => {
        setChangeName(event.target.value);
    };

    const handleChangeValue = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setChangeValue(inputValue);
        }
    };

    const Handleclose = (e) => {
        if (e.target.id === "container" | e.key === "Escape")
            setShowPopUp(false)
    }

    const HandlecloseDelete = (e) => {
        if (e.target.id === "containerDelete" | e.key === "Escape")
            setShowPopUpDelete(false)
    }

    function CreateCategory() {
        if (showPopUp === true) {
            const dataSendbyAxios = {
                "category": selectedValue,
                "options": {
                    [ChangeName]: parseInt(ChangeValue)
                }
            }
            console.log(dataSendbyAxios)
            axios.post('https://api-phone-price.onrender.com/api/categories/create', dataSendbyAxios)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                window.location.reload(false)
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
        }
    }

    function DeleteCategory() {
        if (showPopUpDelete === true) {
            const dataSendbyAxios = {
                "delete": [
                    FillDataDelete["name"]
                ]
            }
            console.log(dataSendbyAxios)
            // axios.delete('https://api-phone-price.onrender.com/api/categories/delete/telephone', dataSendbyAxios)
            // .then(response => {
            //     console.log('Data sent successfully:', response.data);
            //     window.location.reload(false)
            // })
            // .catch(error => {
            //     console.error('Error sending data:', error);
            // });

            const config = {
                method: 'delete',
                url: `https://api-phone-price.onrender.com/api/categories/delete/${FillDataDelete["type"]}`,
                data: dataSendbyAxios
              };
          
              axios(config)
                .then(response => {
                  console.log('Data sent successfully:', response.data);
                  window.location.reload(false);
                })
                .catch(error => {
                  console.error('Error sending data:', error);
                });
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', Handleclose, true)
        document.addEventListener('keydown', HandlecloseDelete, true)
        axios.get("https://api-phone-price.onrender.com/api/categories").then((response) => {
            setShowDictionnaryPhone({...response.data.data["0"]["options"]})
            setShowDictionnaryBattery({...response.data.data["1"]["options"]})
        });
    }, [])


    const navigate = useNavigate()

    return (
    <div className='w-full h-full font-Poppins'>


        { showPopUp === true &&
            <div id='container' className="fixed inset-1 backdrop-blur-sm flex justify-center items-center" onClick={Handleclose}>
                <div className="bg-white p-8 w-72 rounded-xl shadow-lm">
                    <div className="flex flex-col">
                        <select name='Choose' value={selectedValue} className='mb-5 p-2 py-sm-3 rounded-md mt-1 outline-none border placeholder:font-extrabold' onChange={handleSelectChange} required>
                            <option value="Telephone" >Telephone</option>
                            <option value="Battery" >Battery</option>
                        </select>
                        <input type="text" value={ChangeName} onChange={handleChangeName} className="border border-gray-700 p-2 rounded mb-5" placeholder="Nom"/>
                        <input type="text" value={ChangeValue} onChange={handleChangeValue} className="border border-gray-700 p-2 rounded mb-5" placeholder="Valeur"/>
                    </div>
                    <div className="text-center">
                        <button className="px-5 py-2 bg-gray-700 text-white rounded" onClick={CreateCategory}>
                            add
                        </button>
                    </div>
                </div>
            </div>
        }

        { showPopUpDelete === true &&
            <div id='containerDelete' className="fixed inset-1 backdrop-blur-sm flex justify-center items-center" onClick={HandlecloseDelete}>
                <div className="bg-white p-8 w-72 rounded-xl shadow-lm space-y-5">
                    <div className='text-center'>Are you sure ?</div>
                    <div className="text-center space-x-7">
                        {/* {FillDataDelete} */}
                        <button className="px-5 py-2 bg-green-500 text-white rounded" onClick={DeleteCategory}>
                            Yes
                        </button>

                        <button className="px-5 py-2 bg-red-500 text-white rounded" onClick={() => setShowPopUpDelete(false)}>
                            No
                        </button>

                    </div>
                </div>
            </div>

        }



        <div className='w-full h-full flex justify-center md:py-20 py-10 overflow-auto no-scrollbar'>
            <div className='md:max-w-[50%] max-w-[90%] w-full h-auto flex justify-between items-center font-extrabold space-x-6'>
                <div className='bg-[#2082B9] px-12 py-3 rounded-3xl shadow-lm text-[#FFFFFF] cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/')}>Catégorie</div>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/choice')}>Choix</div>
                <div className='bg-[#F5F5F5] px-12 py-3 rounded-3xl shadow-lm cursor-pointer hover:scale-110 duration-150' onClick={() => navigate('/clients')}>Clients</div>
            </div>
        </div>
        <div className='flex justify-center font-extrabold'>
            <div className='bg-[#2082B9] px-12 py-3 rounded-3xl shadow-lm text-[#FFFFFF] cursor-pointer hover:scale-110 duration-150' onClick={() => setShowPopUp(true)}>Ajouter</div>
        </div>
        <div className='w-full h-full flex flex-wrap items-center md:space-x-5 space-y-6 justify-center py-20 px-20'>
            {Object.entries(showDictionnaryPhone).map(([key, value]) => (
                <div className='flex flex-col md:w-[25%] w-[100%] h-[350px] object-none bg-white rounded-xl shadow-lm border ' key={key}>
                    <div className='w-full h-[60%] bg-[#2082B9] rounded-t-xl shadow-lm'>
                        <div className='flex space-x-4 p-2 justify-end'>
                            <AiFillDelete onClick={() => HandleSetShowPopupDelete("telephone", key, value)} className='bg-white rounded-full p-2 w-10 h-10 cursor-pointer hover:scale-110 duration-150' fontSize={25} color='red'/>
                            <MdEdit className='bg-white rounded-full p-2 w-10 h-10 cursor-pointer hover:scale-110 duration-150' fontSize={25}/>
                        </div>
                        <div className='w-full h-full flex justify-center items-center font-black text-white'>
                            Iphone
                        </div>

                    </div>
                    <div className='p-2 space-y-3 font-extrabold'>
                        <div>{key}</div>
                        <div>{value}</div>
                    </div>
                </div>
            ))}
            {Object.entries(showDictionnaryBattery).map(([key, value]) => (
                <div className='flex flex-col md:w-[25%] w-[100%] h-[350px] object-none bg-white rounded-xl shadow-lm border ' key={key}>
                    <div className='w-full h-[60%] bg-[#2082B9] rounded-t-xl shadow-lm'>
                        <div className='flex space-x-4 p-2 justify-end'>
                            <AiFillDelete onClick={() => HandleSetShowPopupDelete("battery", key, value)} className='bg-white rounded-full p-2 w-10 h-10 cursor-pointer hover:scale-110 duration-150' fontSize={25} color='red'/>
                            <MdEdit className='bg-white rounded-full p-2 w-10 h-10 cursor-pointer hover:scale-110 duration-150' fontSize={25}/>
                        </div>
                        <div className='w-full h-full flex justify-center items-center font-black text-white'>
                            Battery
                        </div>

                    </div>
                    <div className='p-2 space-y-3 font-extrabold'>
                        <div>{key}</div>
                        <div>{value}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home