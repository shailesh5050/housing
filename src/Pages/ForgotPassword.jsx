import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { getAuth,sendPasswordResetEmail} from 'firebase/auth'
import { toast } from 'react-toastify'
const ForgotPassword = () => {
  const [email,setEmail] = useState('');
  const onChange = e => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const auth = getAuth();
      await sendPasswordResetEmail(auth,email);
      toast.success('Email sent successfully');
    }catch(error){
      toast.error(error.message);
    }
  };

  return (
    <div className='pageCOntainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
        </header>
        <main>
          <form onSubmit={onSubmit} action="">
            <input type="email" name="" id="email" placeholder='Email' className='emailInput' onChange={onChange} value={email} />
            <Link to='/sign' className='forgotPasswordLink'>Back to Login</Link>
            <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
              
              <button className="signUpButton">
              <ArrowRightIcon fill='#fff' width="34px" height='34px' />
            </button>
            </div>
            
          </form>


        </main>

    </div>
  )
}

export default ForgotPassword