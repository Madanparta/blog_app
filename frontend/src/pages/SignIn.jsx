import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice.js";
import OAuth from '../components/OAuth.jsx';

const SignIn = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch();
  const [formData,setFormData]=useState({});
  const {loading,error:errorMessage}=useSelector(state=>state.user);
  // const [errorMessage,setErrorMessage]=useState(null);
  // const [loading,setLoading]=useState(false);

  const inputHandler = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure("Please fill out all fields."))
    }
    try {
      dispatch(signInStart());
      const request = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await request.json();
      if(data.success === false){
        return dispatch(signInFailure(data.message))
      }
      dispatch(signInFailure())
      if(request.ok){
        dispatch(signInSuccess(data))
        navigation('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Partu's</span>Blog
          </Link>
          <p className='text-sm mt-5'>You can sign In with your email and password
          or with Google.</p>
        </div>

        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email'/>
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={inputHandler}/>
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type='password' placeholder='******' id='password' onChange={inputHandler}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ):"Sign Up"
              }
            </Button>
            <OAuth/>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to="/sign-up" className='text-blue-500'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn

