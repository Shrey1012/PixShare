import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {MdDownloadForOfline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { urlFor, client } from '../client'

const Pin = ({pin: {postedBy, image, _id, destination}}) => {

    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false)

    const navigate = useNavigate()

  return (
    <div className='m-2'>
        <div
        onMouseEnter={()=> setPostHovered(true)}
        onMouseLeave={()=> setPostHovered(false)}
        onClick={()=> navigate(`pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
     <img src={urlFor(image).width(250).url()} alt="user-post" className='rounded-lg w-full' />
     </div>
    </div>
  )
}

export default Pin