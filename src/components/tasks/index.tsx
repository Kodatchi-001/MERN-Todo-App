import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Tasks() {
    return <>
        <section className="w-full h-[65vh] sm:max-h-[830px] z-20 flex justify-center sm:pt-[9rem] relative">
            <div className="w-[95%] sm:max-w-[850px] flex flex-col gap-5 p-[17px] z-20 absolute rounded-xl mt-[-8vh] sm:mt-0 shadow-xl bg-white">
                <div className="w-full h-full flex items-center gap-4">
                    <Box className="w-full">
                        <TextField fullWidth type="text" className="w-full" size="medium" label="Create New Task"
                            sx={{
                                '& fieldset': {
                                    borderColor: 'gray',
                                    border: '2px solid'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'gray',
                                    border: '2px solid'
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                    fontWeight: 'bold'
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'black',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                    fontWeight: 'bold'
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }} />
                    </Box>
                    <button className='px-8 py-[13px] text-xl h-full duration-500 hover:bg-green-500 bg-black text-white rounded-lg'>
                        Add
                    </button>
                </div>
                <div className='flex flex-col gap-4'>
                    <li className='text-xl'>Tasks</li>
                    <div>
                        <ul className='flex justify-between items-center bg-gray-200 p-3 rounded-md'>
                            <div className='flex items-center gap-3 text-xl'>
                                <div className='px-[9px] py-[9px] border border-gray-500 rounded-[5px] cursor-pointer bg-white'></div>
                                <li>Task</li>
                            </div>
                            <div className="w-2/6 h-full flex justify-end items-center gap-1">
                                <i className="bx bxs-edit text-3xl cursor-pointer text-green-500"></i>
                                <i className="bx bxs-x-square text-3xl cursor-pointer text-red-500"></i>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
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
                </div>
            </div>
        </section>
    </>
}