import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { TasksType } from '../../types';
import { SlNotebook } from "react-icons/sl";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Tasks() {
    const [Task, setTask] = useState<string>('');
    const [Tasks, setTasks] = useState<TasksType[]>([]);
    const [FormValidation, setFormValidation] = useState<{ Name: boolean }>({ Name: false });
    const [IsSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [TaskCreated, setTaskCreated] = useState<boolean>(false);

    const HandelChanges = (e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value);
    const AddNewTask = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        /*---> Validation <---*/
        const Namevalidation = Task.trim() !== '';
        setFormValidation({ Name: Namevalidation });

        /*---> Alert Not Created <---*/
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2000);

        /*---> Return If Note Valid <---*/
        if (!Namevalidation) { return };

        /*---> Create New Task <---*/
        const NewTask: TasksType = { Name: Task, Checked: false };
        setTasks([...Tasks, NewTask]);

        /*---> Alert Created <---*/
        setTaskCreated(true);
        setTimeout(() => setTaskCreated(false), 2000);

        /*---> Clear Input <---*/
        setTask('');
    }

    return <>
        <section className="w-full h-[65vh] sm:max-h-[830px] z-20 flex justify-center sm:pt-[9rem] relative">
            <div className="w-[95%] sm:max-w-[850px] flex flex-col gap-5 p-[17px] z-20 absolute rounded-xl shadow-xl bg-white">
                <form onSubmit={AddNewTask} className="w-full h-full flex items-center gap-4">
                    <Box className="w-full">
                        <TextField fullWidth type="text" className="w-full" size="medium" label="Create New Task" value={Task} onChange={HandelChanges} sx={{ '& fieldset': { borderColor: 'gray', border: '2px solid' }, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'gray', border: '2px solid' }, '& .MuiInputLabel-root': { color: 'black', fontWeight: 'bold' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', }, '& .MuiInputBase-input': { color: 'black', fontWeight: 'bold' }, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, }} />
                    </Box>
                    <input
                        type='submit'
                        value="Add"
                        className='px-8 py-[13px] h-full text-xl cursor-pointer duration-500 hover:bg-green-500 bg-black text-white rounded-lg' />
                </form>
                <div className='flex flex-col gap-4'>
                    <li className='text-xl'>Tasks</li>
                    <div className='flex flex-col gap-2'>
                        {Tasks && Tasks.length > 0 ? (
                            Tasks.map((item: TasksType) => (
                                <ul className='flex justify-between items-center bg-gray-200 p-3 rounded-md overflow-hidden'>
                                    <div className='flex items-center gap-3 text-xl'>
                                        <div className='px-[9px] py-[9px] border border-gray-500 rounded-[5px] cursor-pointer bg-white'></div>
                                        <li>{item.Name}</li>
                                    </div>
                                    <div className="w-2/6 h-full flex justify-end items-center gap-1">
                                        <i className="bx bxs-edit text-3xl cursor-pointer text-green-500"></i>
                                        <i className="bx bxs-x-square text-3xl cursor-pointer text-red-500"></i>
                                    </div>
                                </ul>
                            ))
                        ) : (
                            <div className='w-full py-10 flex flex-col gap-5 justify-center items-center'>
                                <SlNotebook className='text-[90px]' />
                                <h1 className='w-1/2 sm:w-1/4 text-center text-xl'>!You, Dont have any Task</h1>
                            </div>
                        )}
                    </div>
                </div>
                {/* <div className='flex flex-col gap-4'>
                    <li className='text-xl'>Tasks Checked</li>
                    <div>
                        <ul className='flex justify-between items-center bg-gray-200 p-3 rounded-md'>
                            <div className='flex items-center gap-3 text-xl'>
                                <div className='px-[9px] py-[9px] border border-gray-500 rounded-[5px] cursor-pointer bg-black'></div>
                                <li>Task</li>
                            </div>
                            <div className="w-2/6 h-full flex justify-end items-center gap-1">
                                <i className="bx bxs-edit text-3xl cursor-pointer text-green-500"></i>
                                <i className="bx bxs-x-square text-3xl cursor-pointer text-red-500"></i>
                            </div>
                        </ul>
                    </div>
                </div> */}
            </div>
        </section >
        <div className='w-full h-1/2 py-8 flex justify-center items-end fixed bottom-0 z-40'>
            <div className='max-w-[800px] flex flex-col gap-4'>
                <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${!FormValidation.Name && IsSubmitted ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                    <Alert variant="filled" severity="error">
                        You need to add a task to proceed.
                    </Alert>
                </Stack>
                <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${TaskCreated ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                    <Alert variant="filled" severity="success">
                        Your Task Has Created
                    </Alert>
                </Stack>
            </div>
        </div>
    </>
}