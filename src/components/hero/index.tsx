import { useEffect, useState } from "react"

export default function Hero() {
    const [date, setdate] = useState<Date | null>(null);

    useEffect(() => {
        setdate(new Date())
    }, []);

    const DisplayDate = () => {
        if (date) {
            // Get the full name of the weekday (e.g., "Monday", "Tuesday")
            const dayName: string = date.toLocaleDateString('default', { weekday: 'long' });
            // Get the day of the month (e.g., 28)
            const day: number = date.getDate();
            // Get the full name of the month (e.g., "December", "January")
            const month: string = date.toLocaleDateString('default', { month: 'long' });
            // Get the full year (e.g., 2024)
            const year: number = date.getFullYear();

            // return date
            return <h1 className="text-2xl lg:text-lg">{`${dayName}, ${day} ${month} ${year}`}</h1>
        }

        return;
    }

    return <>
        <nav className="w-full h-[35vh] sm:h-[220px] 2xl:max-h-[250px] sm:absolute z-10 bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url(${require('../../assets/Background-image.jpg')})` }}>
            <div className="w-full h-full flex justify-center bg-[#00000053]">
                <div className="w-full sm:max-w-[750px] xl:max-w-[850px] h-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-0 pb-5 sm:pb-10 text-white">
                    <h1 className="text-4xl lg:text-2xl">Todo-App</h1>
                    {DisplayDate()}
                </div>
            </div>
        </nav>
    </>
}