import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { TasksType } from '../../types';
import { SlNotebook } from "react-icons/sl";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AddTaskApi, GetTasksApi, GetTasksCheckedApi, RemoveTaskApi, TasksCheckedApi, UpdateTaskApi } from '../../api/tasks';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setEditingTask, setEditValue, setIsSubmitted, setTask, setTaskActions, setTasks, setTasksChecked } from '../../slices/taskSlice';
import { RootState } from '../../store/store';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function Tasks() {
    /*---> States <---*/
    const reduxDispatch = useDispatch();
    const readStates = useSelector((state: RootState) => state?.taskSlice);
    const navigate = useNavigate();

    /*---> Handle Input Changes <---*/
    const handelChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        reduxDispatch(setTask(e.target.value));
    };
    /*---> Get All Tasks Not Checked <---*/
    const getTasks = async () => {
        try {
            const response = await GetTasksApi();
            reduxDispatch(setTasks(response || []));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
    /*---> Get Checked Tasks <---*/
    const getTasksChecked = async () => {
        try {
            const response = await GetTasksCheckedApi();
            reduxDispatch(setTasksChecked(response || []));
        } catch (error) {
            console.error("Error fetching checked tasks:", error);
        }
    }
    /*---> Add New Task <---*/
    const addNewTask = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        /*---> Validate Task Name <---*/
        const nameValidation = readStates?.task.trim() !== '';

        /*---> Return if Task Name is Empty <---*/
        if (!nameValidation) {
            reduxDispatch(setTaskActions('notFound'));
            reduxDispatch(setIsSubmitted(true));
            setTimeout(() => reduxDispatch(setIsSubmitted(false)), 2000);
            return;
        }

        /*---> Update Existing Task <---*/
        if (readStates?.editingTask) {
            try {
                await UpdateTaskApi(readStates?.editingTask, { name: readStates?.task });
                getTasks();
                reduxDispatch(setEditingTask(null));
                reduxDispatch(setEditValue(''));
                reduxDispatch(setTask(''));
                /*---> Display Task Updated Alert <---*/
                reduxDispatch(setTaskActions('Updated'));
                reduxDispatch(setIsSubmitted(true));
                setTimeout(() => reduxDispatch(setIsSubmitted(false)), 2000);
            } catch (error) {
                console.error("Error updating task:", error);
            }

            /*---> Create New Task <---*/
        } else {
            const newTask: TasksType = {
                id: uuidv4(),
                name: readStates?.task,
                checked: false
            };
            try {
                await AddTaskApi(newTask);
                getTasks();
            } catch (error) {
                console.error("Error creating task:", error);
            }
            /*---> Display Task Created Alert <---*/
            reduxDispatch(setTaskActions('Created'));
            reduxDispatch(setIsSubmitted(true));
            setTimeout(() => reduxDispatch(setIsSubmitted(false)), 2000);
            /*---> Clear Input Field <---*/
            reduxDispatch(setTask(''));
        }
    };
    /*---> Remove Task by ID <---*/
    const removeTask = async (id: string) => {
        try {
            await RemoveTaskApi(id);
            getTasks();
            getTasksChecked();
            /*---> Display Task Removed Alert <---*/
            reduxDispatch(setTaskActions('Removed'));
            reduxDispatch(setIsSubmitted(true));
            setTimeout(() => reduxDispatch(setIsSubmitted(false)), 2000);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
    /*---> Edit Task by ID <---*/
    const editTask = (id: string) => {
        const findtask = readStates?.tasks?.find((item: TasksType) => item?.id === id);
        if (findtask) {
            reduxDispatch(setEditingTask(findtask?.id));
            reduxDispatch(setEditValue(findtask?.name));
            reduxDispatch(setTask(findtask?.name));
        } else {
            console.log("Task not found!");
            return;
        }
    }
    /*---> Update Task Checked Status <---*/
    const taskChecked = async (id: string, checked: boolean) => {
        try {
            const newChecked = !checked;
            await TasksCheckedApi(id, newChecked);
            getTasks();
            getTasksChecked();
        } catch (error) {
            console.error("Error toggling task check status:", error);
        }
    };
    /*---> Log Out Functionality <---*/
    const logOut = () => {
        localStorage.removeItem("Token");
        navigate("/sign-up");
    };
    /*---> Fetch Tasks and Checked Tasks on Load <---*/
    useEffect(() => {
        getTasks();
        getTasksChecked();
    }, []);

    return <>
        <div className="w-full h-[65vh] sm:max-h-[830px] z-20 flex justify-center sm:pt-[9rem] relative">
            <div className="w-[95%] sm:max-w-[850px] flex flex-col gap-5 p-[17px] z-20 absolute rounded-xl shadow-xl bg-white">
                <form onSubmit={addNewTask} className="w-full h-full flex items-center gap-4">
                    <Box className="w-full">
                        <TextField fullWidth type="text" className="w-full" size="medium" label="Create New Task" value={readStates?.task} onChange={handelChanges} sx={{ '& fieldset': { borderColor: 'gray', border: '2px solid' }, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'gray', border: '2px solid' }, '& .MuiInputLabel-root': { color: 'black', fontWeight: 'bold' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', }, '& .MuiInputBase-input': { color: 'black', fontWeight: 'bold' }, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, }} />
                    </Box>
                    <input
                        type='submit'
                        value={readStates?.editingTask ? "Update" : "Add"}
                        className='px-8 py-[13px] h-full text-xl cursor-pointer duration-500 hover:bg-green-500 bg-black text-white rounded-lg' />
                </form>
                <div className={`flex flex-col gap-4 ${readStates?.tasks?.length > 0 ? '' : 'hidden'}`}>
                    <li className='text-xl'>Tasks</li>
                    <div className='flex flex-col gap-2'>
                        {readStates?.tasks && readStates?.tasks?.length > 0 && (
                            readStates?.tasks?.map((item: TasksType) => (
                                <ul key={item?.id} className='flex justify-between items-center bg-gray-200 p-3 rounded-md overflow-hidden'>
                                    <div className='flex items-center gap-3 text-xl'>
                                        <div className='px-[9px] py-[9px] border border-gray-500 rounded-[5px] cursor-pointer bg-white' onClick={() => taskChecked(item?.id, item?.checked)}></div>
                                        <li>{item?.name}</li>
                                    </div>
                                    <div className="w-2/6 h-full flex justify-end items-center gap-1">
                                        <i className="bx bxs-edit text-3xl cursor-pointer text-green-500" onClick={() => editTask(item?.id)}></i>
                                        <i className="bx bxs-x-square text-3xl cursor-pointer text-red-500" onClick={() => removeTask(item?.id)}></i>
                                    </div>
                                </ul>
                            ))
                        )}
                    </div>
                </div>
                <div className={`flex flex-col gap-4 ${readStates?.tasksChecked?.length > 0 ? '' : 'hidden'}`}>
                    <li className='text-xl'>Tasks Checked</li>
                    {readStates?.tasksChecked && readStates?.tasksChecked?.length > 0 && (
                        readStates?.tasksChecked?.map((item: TasksType) => (
                            <ul key={item?.id} className='flex justify-between items-center bg-gray-200 p-3 rounded-md overflow-hidden'>
                                <div className='flex items-center gap-3 text-xl'>
                                    <div className='px-[9px] py-[9px] border border-gray-500 rounded-[5px] cursor-pointer bg-black' onClick={() => taskChecked(item?.id, item?.checked)}></div>
                                    <li>{item?.name}</li>
                                </div>
                                <div className="w-2/6 h-full flex justify-end items-center gap-1">
                                    <i className="bx bxs-x-square text-3xl cursor-pointer text-red-500" onClick={() => removeTask(item?.id)}></i>
                                </div>
                            </ul>
                        ))
                    )}
                </div>
                <div className={`w-full py-10 flex flex-col gap-5 justify-center items-center ${readStates?.tasks.length > 0 || readStates?.tasksChecked?.length > 0 ? 'hidden' : ''}`}>
                    <SlNotebook className='text-[90px]' />
                    <h1 className='w-1/2 sm:w-1/4 text-center text-xl'>!You, Dont have any Task</h1>
                </div>
            </div>
        </div>
        <div className='w-full p-8 fixed bottom-0 z-40'>
            <div className='w-full h-full flex justify-center items-center relative'>
                <div className='max-w-[800px] flex flex-col gap-4'>
                    <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${readStates?.taskActions === 'notFound' && readStates?.isSubmitted ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                        <Alert variant="filled" severity="error">
                            You need to add a task to proceed.
                        </Alert>
                    </Stack>
                    <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${readStates?.taskActions === 'Created' && readStates?.isSubmitted ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                        <Alert variant="filled" severity="success">
                            Your Task Has Created
                        </Alert>
                    </Stack>
                    <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${readStates?.taskActions === 'Update' && readStates?.isSubmitted ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                        <Alert variant="filled" severity="info">
                            Your Task Has Updated
                        </Alert>
                    </Stack>
                    <Stack sx={{ width: '100%' }} spacing={2} className={`duration-300 scale-110 ${readStates?.taskActions === 'Removed' && readStates?.isSubmitted ? 'opacity-100 mb-0' : 'opacity-0 mb-[-4rem]'}`}>
                        <Alert variant="filled" severity="warning">
                            Your Task Has Removed
                        </Alert>
                    </Stack>
                </div>
            </div>
        </div>
        <div className='w-full flex p-10 fixed bottom-0 z-50'>
            <button className='p-[11px] text-[25px] rounded-full shadow-[#00000050] shadow-md text-black' onClick={logOut}>
                <CiLogout />
            </button>
        </div>
    </>
}