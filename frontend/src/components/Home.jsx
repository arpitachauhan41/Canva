import React, { useState, useEffect } from 'react'
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

const Home = () => {
    const [designs, setDesign] = useState([])
    const navigate = useNavigate()
    const [state, setState] = useState({
        width: 0,
        height: 0
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const [show, setShow] = useState(false)

    const create = () => {
        navigate('/design/create', {
            state: {
                type: 'create',
                width: state.width,
                height: state.height
            }
        })
    }

    const get_user_design = async () => {
        try {
            const { data } = await api.get('/api/user-designs')
            setDesign(data.designs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        get_user_design()
    }, [])

    return (
        <div className='pt-5'>
            <div className='w-fill h-[250px] rounded-md overflow-hidden'>
                <div className='relative flex justify-center items-center w-full h-full' >
                    <div className='relative flex justify-center items-center w-full h-full'>
                        <button onClick={() => setShow(!show)} className='px-4 py-2 text-[15px] overflow-hidden text-center bg-[#8b3dffad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] absolute top-3 right-3'>Custom size</button>
                        <form onSubmit={create} className={`absolute top-16 right-3 gap-3 bg-[#252627] w-[250px] p-4 text-white ${show ? 'visible opacity-100' : 'invisible opacity-50'} transition-all duration-500`}>
                            <div className='grid grid-cols-2 pb-4 gap-3'>
                                <div className='flex gap-2 justify-center items-start flex-col'>
                                    <label htmlFor="width">Width</label>
                                    <input required onChange={inputHandle} type="number" name='width' className='w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md' id='width' />
                                </div>
                                <div className='flex gap-2 justify-center items-start flex-col'>
                                    <label htmlFor="height">Height</label>
                                    <input onChange={inputHandle} type="number" name='height' required className='w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md' id='height' />
                                </div>
                            </div>
                            <button className='px-4 py-2 text-[13px] overflow-hidden text-center bg-[#8b3dffad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] w-full'>Create new design</button>
                        </form>
                        <div>
                            <h2 className='text-3xl pb-10 pt-6 font-semibold text-white'>What will you design today?</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home