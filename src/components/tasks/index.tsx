import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Tasks() {
    return <>
        <section className="w-full h-[65vh] sm:h-[860px] 2xl:max-h-[830px] z-20 flex justify-center sm:pt-[9rem] relative">
            <div className="w-[95%] sm:max-w-[750px] xl:max-w-[850px] flex flex-col gap-5 p-5 z-20 absolute rounded-xl mt-[-8vh] sm:mt-0 shadow-xl bg-white">
                <div className="w-full h-full flex items-center gap-4">
                    <Box className="w-full">
                        <TextField fullWidth type="text" className="w-full" size="medium" label="Create New Task"
                            sx={{
                                '& fieldset': {
                                    borderColor: 'gray',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: 'gray',
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
                <div>
                    <li className='text-xl'>Tasks</li>
                </div>
            </div>
        </section>
    </>
}