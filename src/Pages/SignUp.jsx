import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import {getAuth,createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../FireBaseConfig';
import { setDoc,doc,serverTimestamp } from 'firebase/firestore';
import OAuth from '../Components/OAuth';
const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:''
  });


  const {name,email,password} = formData;
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
    const userCreadetial=await createUserWithEmailAndPassword(auth,email,password)
    const user = userCreadetial.user;
    updateProfile(auth.currentUser,{displayName:name});
    const formDataCopy= {...formData};
    delete formDataCopy.password;
    formDataCopy.timeStamp= serverTimestamp();
    await setDoc(doc(db,'users',user.uid),formDataCopy);
    navigate('/')
   }catch(error){
     console.log("Error",error);
   }
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Welcome Back!</p>
        <form onSubmit={onSubmit} action="">
        <input type="text" name="" id="name" placeholder='Name' className='nameInput' onChange={onChange} value={name} />
          <input type="email" name="" id="email" placeholder='Email' className='emailInput' onChange={onChange} value={email} />
          <div className="passwordInputDiv">
            <input type={showPassword ? 'type' : 'password'} name="" id="password" placeholder='Password' className='passwordInput' onChange={onChange} value={password} />
            <img src={visibilityIcon} alt="visibilityIcon" className="showPassword" onClick={() => setShowPassword(!showPassword)}/>
          </div>

          <Link to='/forgotPassword' className='forgotPasswordLink'>Forgot Password?</Link> 
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#fff' width="34px" height='34px' />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to='/sign' className='registerLink'>Sign In Instead</Link>
      </header>
    </div>
  )
}

export default SignUp