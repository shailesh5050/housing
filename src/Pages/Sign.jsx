import React,{useState} from 'react'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate,Link } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { toast } from 'react-toastify';
import OAuth from '../Components/OAuth';
const Sign = () => {
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });
  const {email,password} = formData;
  const onChange = e => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    }));
  };
  
    const onSubmit =async (e) => {
      e.preventDefault();
      try{
      const auth = getAuth();
      const userCreadetial=await signInWithEmailAndPassword(auth,email,password)
      const user = userCreadetial.user;
      navigate('/')
    }catch(error){
      console.log("Error",error);
      toast.error("Username or Password is incorrect");
    }
    }
 
  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Welcome Back!</p>
        <form onSubmit={onSubmit} action="">
          <input type="email" name="" id="email" placeholder='Email' className='emailInput' onChange={onChange} value={email} />
          <div className="passwordInputDiv">
            <input type={showPassword ? 'type' : 'password'} name="" id="password" placeholder='Password' className='passwordInput' onChange={onChange} value={password} />
            <img src={visibilityIcon} alt="visibilityIcon" className="showPassword" onClick={() => setShowPassword(!showPassword)}/>
          </div>

          <Link to='/forgotPassword' className='forgotPasswordLink'>Forgot Password?</Link> 
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width="34px" height='34px' />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to='/signUp' className='registerLink'>Sign Up Instead</Link>
      </header>
    </div>
  )
}

export default Sign