import { Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from "react-redux";

const DarshProfile = () => {
    const {currentUser} = useSelector(state=>state.user);

    const [imageFile,setImageFile]=useState(null);
    const [imageFileUrl,setImageFileUrl]=useState(null);
    const filePickerRef = useRef();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(e.target.files[0]);
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    // console.log(imageFile,imageFileUrl)
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);

    const uploadImage =async()=>{
        // firebase... code 
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read, write: if request.resource.size < 2 * 1024 * 1024 && 
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }

        // const storage = getStoreage()
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl '>Profile</h1>

      <form className='flex flex-col gap-4'>

        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden' onClick={()=>filePickerRef.current.click()}>
            <img src={imageFileUrl || currentUser.profilePicture} alt='user' className='rounded-full w-full h-full border-8 object-cover border-[lightgray] '/>
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='text' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DarshProfile
