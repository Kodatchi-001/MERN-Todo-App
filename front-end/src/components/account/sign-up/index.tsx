import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useState } from "react";
import { Account } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { setisNotSubmitted, setisSubmitted } from "../../../slices/signupSlice";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";

export default function SignUp() {
    /*---> States <---*/
    const [account, setAccount] = useState<Account>({ fullName: '', email: '', password: '' });
    const reduxDispatch = useDispatch();
    const readStates = useSelector((state: RootState) => state.signUp);

    /*---> Handel Values <---*/
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setAccount((prevState: Account) => ({ ...prevState, [name]: value }))
    }
    /*---> Create NewAccount and send to dataBase <---*/
    const createNewAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fullName: boolean = account?.fullName?.trim() !== '';
        const email: boolean = account?.email?.trim() !== '';
        const password: boolean = account?.password?.trim() !== '';
        if (!fullName || !email || !password) {
            reduxDispatch(setisNotSubmitted(true));
            setTimeout(() => { reduxDispatch(setisNotSubmitted(false)); }, 2000);
            return
        }
        // try {
        //     const response = test;
        //     if (response?.message === '') {
        //         setIsSubmitted(true);
        //         setTimeout(() => { setIsSubmitted(false) }, 2000);
        //     }
        // } catch (error) {
        //     console.error("Problem Create NewAccount and send to dataBase", error);
        // }
        setAccount({ fullName: '', email: '', password: '' });
        reduxDispatch(setisSubmitted(true));
        setTimeout(() => { reduxDispatch(setisSubmitted(false)) }, 2000);
    }

    return <>
        <section className="w-full h-screen flex relative">
            <div className="w-full lg:w-[40%] 2xl:w-full h-full flex justify-center items-center">
                <div className="w-full lg:w-[480px] 2xl:w-[700px] p-8 flex flex-col gap-10">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-[35px]">Sign Up</h1>
                        <p className="w-4/6 text-[14px] text-gray-500">Sign Up to manage your day!</p>
                    </div>
                    <form onSubmit={createNewAccount} className="flex flex-col gap-4">
                        <Box className="w-full">
                            <TextField fullWidth type="text" className="w-full" label="Full Name" name="fullName" value={account?.fullName} onChange={handleInputChange} sx={{ '& fieldset': { borderColor: 'gray' }, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'gray' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', }, '& .MuiInputBase-input': { color: 'black' }, '& .MuiOutlinedInput-root': { borderRadius: '5px' }, }} />
                        </Box>
                        <Box className="w-full">
                            <TextField fullWidth type="email" className="w-full" label="Email" name="email" value={account?.email} onChange={handleInputChange} sx={{ '& fieldset': { borderColor: 'gray' }, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'gray' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', }, '& .MuiInputBase-input': { color: 'black' }, '& .MuiOutlinedInput-root': { borderRadius: '5px' }, }} />
                        </Box>
                        <Box className="w-full">
                            <TextField fullWidth type="password" className="w-full" label="Password" name="password" value={account?.password} onChange={handleInputChange} sx={{ '& fieldset': { borderColor: 'gray' }, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'gray' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', }, '& .MuiInputBase-input': { color: 'black' }, '& .MuiOutlinedInput-root': { borderRadius: '5px' }, }} />
                        </Box>
                        <Stack className="w-full" spacing={6} direction="row">
                            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, fontSize: '17px', backgroundColor: 'black', color: 'white' }}>
                                Sign Up
                            </Button>
                        </Stack>
                        <div className="w-full flex justify-center gap-1">
                            <h1>Already have an account?</h1>
                            <Link to="/sign-in" className="text-gray-500">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-[60%] h-full p-[7px] hidden lg:flex 2xl:hidden">
                <div className="w-full h-full rounded-2xl bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url(${require('../../../assets/pic-account.png')})` }}></div>
            </div>
            <div className='w-full py-8 flex justify-center items-end fixed bottom-0 z-40'>
                <div className="max-w-[800px] flex flex-col gap-2">
                    <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${readStates?.isNotSubmitted ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                        <Alert variant="filled" severity="error">
                            Please provide the required data to proceed!
                        </Alert>
                    </Stack>
                    <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${readStates?.isSubmitted ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                        <Alert variant="filled" severity="success">
                            Your Task Has Created
                        </Alert>
                    </Stack>
                </div>
            </div>
        </section>
    </>
}