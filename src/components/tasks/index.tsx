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

export default function Tasks() {
    /*---> States <---*/
    const reduxDispatch = useDispatch();
    const readStates = useSelector((state: RootState) => state?.taskSlice);

    /*---> Handel Input <---*/
    const HandelChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        reduxDispatch(setTask(e.target.value));
    };
    /*---> Get Tasks <---*/
    const GetTasks = async () => {
        try {
            const response = await GetTasksApi();
            reduxDispatch(setTasks(response || []));
        } catch (error) {
            return console.error("Get Problem:", error);
        }
    }
    /*---> Get Tasks-Checked <---*/
    const GetTasksChecked = async () => {
        try {
            const response = await GetTasksCheckedApi();
            reduxDispatch(setTasksChecked(response || []));
        } catch (error) {
            return console.error("Get Checked Tasks Problem:", error);
        }
    }
    /*---> Create New-Task <---*/
    const AddNewTask = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        /*---> Validation <---*/
        const Namevalidation = readStates?.task.trim() !== '';
        /*---> Return If Note Valid <---*/
        if (!Namevalidation) {
            /*---> Alert Not Created <---*/
            reduxDispatch(setTaskActions('notFound'));
            reduxDispatch(setIsSubmitted(true));
            setTimeout(() => { reduxDispatch(setIsSubmitted(false)) }, 2000);
            return
        };
        /*---> Create New Task <---*/
        if (readStates?.editingTask) {
            try {
                await UpdateTaskApi(readStates?.editingTask, { name: readStates?.task });
                await GetTasks();
                reduxDispatch(setEditingTask(null));
                reduxDispatch(setEditValue(''));
                reduxDispatch(setTask(''));
                /*---> Alert Updated <---*/
                reduxDispatch(setTaskActions('Update'));
                reduxDispatch(setIsSubmitted(true));
                setTimeout(() => reduxDispatch(setIsSubmitted(false)), 2000);
            } catch (error) {
                return console.error("Update New-Task Problem:", error);
            }

        } else {
            const newTask: TasksType = {
                id: uuidv4(),
                name: readStates?.task,
                checked: false
            };
            try {
                await AddTaskApi(newTask);
                await GetTasks();
            } catch (error) {
                return console.error("Create New-Task Problem:", error);
            }
            /*---> Alert Created <---*/
            reduxDispatch(setTaskActions('Created'));
            reduxDispatch(setIsSubmitted(true));
            setTimeout(() => reduxDispatch(setIsSubmitted(false)), 2000);
            /*---> Clear Input <---*/
            reduxDispatch(setTask(''));
        }
    }
    /*---> Remove Task ById <---*/
    const RemoveTask = async (id: string) => {
        try {
            await RemoveTaskApi(id);
            await GetTasks();
            await GetTasksChecked();
            /*---> Alert Removed <---*/
            reduxDispatch(setTaskActions('Removed'));
            reduxDispatch(setIsSubmitted(true));
            setTimeout(() => reduxDispatch(setIsSubmitted(false)), 2000);
        } catch (error) {
            return console.error("DELETE Problem:", error);
        }
    }
    /*---> Modify Task ById <---*/
    const EditTask = (id: string) => {
        const findtask = readStates?.tasks?.find((item: TasksType) => item?.id === id);
        console.log(findtask)
        if (findtask) {
            reduxDispatch(setEditingTask(findtask?.id));
            reduxDispatch(setEditValue(findtask?.name));
            reduxDispatch(setTask(findtask?.name));
        } else {
            return console.log("Task not found!");
        }
    }
    /*---> Modify Task Checked <---*/
    const TaskChecked = async (id: string, checked: boolean) => {
        try {
            const newChecked = !checked
            await TasksCheckedApi(id, newChecked);
            await GetTasks();
            await GetTasksChecked();
        } catch (error) {
            return console.error("Checked Task Problem:", error);
        }
    }
    /*---> Get Tasks <---*/
    useEffect(() => {
        GetTasks();
        GetTasksChecked();
    }, []);

    return <>
        <section className="w-full h-[65vh] sm:max-h-[830px] z-20 flex justify-center sm:pt-[9rem] relative">
            <div className="w-[95%] sm:max-w-[850px] flex flex-col gap-5 p-[17px] z-20 absolute rounded-xl shadow-xl bg-white">
                <form onSubmit={AddNewTask} className="w-full h-full flex items-center gap-4">
                    <Box className="w-full">
                        <TextField fullWidth type="text" className="w-full" size="medium" label="Create New Task" value={readStates?.task} onChange={HandelChanges} sx={{ '& fieldset': { borderColor: 'gray', border: '2px solid' }, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'gray', border: '2px solid' }, '& .MuiInputLabel-root': { color: 'black', fontWeight: 'bold' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black', }, '& .MuiInputBase-input': { color: 'black', fontWeight: 'bold' }, '& .MuiOutlinedInput-root': { borderRadius: '8px' }, }} />
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
                                        <div className='px-[9px] py-[9px] border border-gray-500 rounded-[5px] cursor-pointer bg-white' onClick={() => TaskChecked(item?.id, item?.checked)}></div>
                                        <li>{item?.name}</li>
                                    </div>
                                    <div className="w-2/6 h-full flex justify-end items-center gap-1">
                                        <i className="bx bxs-edit text-3xl cursor-pointer text-green-500" onClick={() => EditTask(item?.id)}></i>
                                        <i className="bx bxs-x-square text-3xl cursor-pointer text-red-500" onClick={() => RemoveTask(item?.id)}></i>
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
                                    <div className='px-[9px] py-[9px] border border-gray-500 rounded-[5px] cursor-pointer bg-black' onClick={() => TaskChecked(item?.id, item?.checked)}></div>
                                    <li>{item?.name}</li>
                                </div>
                                <div className="w-2/6 h-full flex justify-end items-center gap-1">
                                    <i className="bx bxs-x-square text-3xl cursor-pointer text-red-500" onClick={() => RemoveTask(item?.id)}></i>
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
        </section>
        <div className='w-full py-8 flex justify-center items-end fixed bottom-0 z-40'>
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
    </>
}