import {Box,Dialog,Button, DialogContent,makeStyles,TextField,Typography} from '@material-ui/core';
import { useState } from 'react';
import {authenticateSignup,authenticateLogin} from '../../service/api.js';
import UserProfile from '../../context/UserProfile';

const useStyle=makeStyles({
    component:{
        height:'52vh',
        width:'35vw',
        overflowY:'hidden'
    },
    register:{
        height:'60vh',
        width:'70vh'
        
    },
    // image:{
    //     height:'auto',
    //     backgroundRepeat:'none',
    //     width:'40%',
    //     backgroundPosition:'center 85%',
    //     padding:'45px 35px',
    //     '& >*':{
    //         color:'white',
    //         fontWeight:600,
    //     }
    // },
    login:{
        padding:'20px',
        display:'flex',
        justifyContent:'center',
        height:'100%',
        width:'100%',
        
        flexDirection:'column',
        '& >*':{
            marginTop:20,
        }
    },
    text:{
        fontSize:12,
        color:'deeppink',
    },
    button:{
        height:48,
        borderRadius:2,
        alignSelf:'center'
    },
    createText:{
        textAlign:'center',
        marginTop:135,
        fontSize:14,
        color:'green',
        fontWeight:600,
        cursor:'pointer'
    },
    error:{
        fontSize:10,
        color:'red',
    }
})

const initialValue ={
    login:{
        view:'login',
        heading:'Login',
        subHeading:'Get access to your orders and bookings'
    },
    signup:{
        view:'signup',
        heading:'SignUp',
        subHeading:'Join To The Vivaah Family'
    }
}

const signupInitialValue={
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    pwd:'',
}

const loginInitialValue={
    username:'',
    pwd:''
}


const Login=({open,setOpen,setProfile})=>{

    const classes=useStyle();

    const [profile,toggleProfile]=useState(initialValue.login);
    const [signup,setSignup]=useState(signupInitialValue);
    const [login,setLogin]=useState(loginInitialValue);
    const [error,setError]=useState(false);

    const handleClose=()=>{
        setOpen(false);
        toggleProfile(initialValue.login);
    }

    const toggleUserProfile = () =>{
        toggleProfile(initialValue.signup);
    }

    const signupUser=async()=>{
        let response=await authenticateSignup(signup);
        if(!response) return;
        handleClose();
        alert("Successfully Registered")
        setProfile(signup.username);
        UserProfile.setName(signup.username);
    }

    const loginUser=async()=>{
        let response=await authenticateLogin(login);
        if(!response) {
            alert("Incorrect Username or Password")
            setError(true);
            return;
        }
        handleClose();
        alert("Successfully LoggedIn")
        if (login.username === 'lokesh' || login.username === 'lokesh') {
            setProfile('admin');
        } else {
            setProfile(login.username);
        }
        UserProfile.setName(login.username);
    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value});
        console.log(signup);
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            
                
                    
                    {
                        profile.view === 'login' ?
                        <DialogContent className={classes.component}>

                    <Box className={classes.login} style={{backgroundColor:'#fffee0'}}>
                        <TextField onChange={(e)=>onValueChange(e)} name='username' label='Enter Username'/>
                        <TextField onChange={(e)=>onValueChange(e)} name='pwd' type='password' label='Enter Password'/>
                        {error && <Typography className={classes.error}>Invalid username or password</Typography>}
                        
                        
                        <Button variant="contained" className={classes.button} style={{background:'orange'}} onClick={()=>loginUser()}>Login</Button>
                        <Typography onClick={()=>toggleUserProfile()} className={classes.createText}>New to Lifetime? Create a new account</Typography>
                    </Box>  </DialogContent>  :
                    <DialogContent className={classes.register}>
                        <Box className={classes.login}  style={{backgroundColor:'#fffee0'}}>
                        <TextField onChange={(e)=>onInputChange(e)} name='firstname' label='Enter Firstname'/>
                        <TextField onChange={(e)=>onInputChange(e)} name='lastname' label='Enter Lastname'/>
                        <TextField onChange={(e)=>onInputChange(e)} name='username' label='Enter Username' />
                        <TextField onChange={(e)=>onInputChange(e)} name='email' label='Enter Email' />
                        <TextField onChange={(e)=>onInputChange(e)} name='pwd' label='Enter Password' type='pwd' />
                        
                        <Button variant="contained" onClick={()=>signupUser()} classname={classes.button} style={{background:'orange'}}>SignUp</Button>
                    </Box>
                    </DialogContent>

                    }
                    
                
            

        </Dialog>
    )
}

export default Login;