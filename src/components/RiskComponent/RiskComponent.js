import React from 'react';
import { gurvichCriterion, maxmaxCriterion, minimaxCriterion, sevidzchCriterion } from './tasks/tasks';
import { Slider } from "@material-tailwind/react";

const RiskComponent = ({matrix}) => {

    const [radio, setRadio] = React.useState(false);
    const [a, setA] = React.useState(0.5);


    const [maxmax, setMaxmax] = React.useState();
    const [minimax, setMinimax] = React.useState();
    const [gurvich, setGurvich] = React.useState();
    const [sevidzch, setSevidzch] = React.useState();
    // метод для знаходження відповіді до 1 та 4 критерію
    React.useEffect(() => {
        setMaxmax(maxmaxCriterion(matrix));
        setSevidzch(sevidzchCriterion(matrix));
    }, [matrix, radio]);

    // метод для знаходження выдповіді до 2 критерію
    React.useEffect(() => {
        setMinimax(minimaxCriterion(matrix, radio))
    }, [matrix, radio]);

    //метод для знаходження выдповіді до 3 критерію
    React.useEffect(() => {
        setGurvich(gurvichCriterion(matrix, a));
    }, [matrix, a]);

    const handleRadioChange = (event) => {
        setRadio(!radio);
    };

    return (
        <div>
            <p className='text-4xl ml-8 mt-12'>Найоптимальніші варіанти за критерієм 'максимакса':</p>
            <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p className='text-3xl ml-8 my-3'>Альтернатива {maxmax?.ans}, при цьому z = {maxmax?.res}</p>

            <div className='mx-8 mt-12'>
                        <input
                            className="mr-2 mt-[0.3rem] h-5 w-10 appearance-none rounded-[0.5rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-5 before:w-5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.2rem] after:h-7 after:w-7 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[0.35rem] checked:after:ml-[1.25rem] checked:after:h-7 checked:after:w-7 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-7 focus:after:w-7 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.25rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault" 
                            onChange={handleRadioChange}    
                        />
                        <label
                            className="inline-block pl-[0.25rem] hover:cursor-pointer text-lg"
                            htmlFor="flexSwitchCheckDefault"
                        >
                            Максимізувати
                        </label>
                    </div>
            <p className='text-4xl ml-8'>Найоптимальніші варіанти за критерієм 'мінімакса':</p>
            <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p className='text-3xl ml-8 my-3'>Альтернатива {minimax?.ans}, при цьому z = {minimax?.res}</p>

            <p className='text-4xl ml-8 mt-12'>Потрібно вибрати значення а, {0} ≤ a ≤ {1}</p>
                    <div className="flex ml-8 my-3">
                        <p className='text-4xl ml-8 my-3'>a = :</p>
                        <input 
                            type="number"
                            value={a}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value) && value >= 0 && value <= 1) {
                                    setA(value);
                                }
                            }}
                            className="ml-2 px-2 py-1 border rounded-md text-4xl"
                        />
                    </div>
                    <Slider
                        defaultValue={a}
                        min={0}
                        max={1}
                        onChange={e => setA(Number(e.target.value).toFixed(2))}
                        className="blue mx-8 w-1/2"
                        barClassName="rounded-none bg-[#2ec946]"
                        thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                        trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
                    />
                    <p className='text-4xl ml-8'>Найоптимальніші варіанти за критерієм Гурвіца (alpha={a}):</p>
                    <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <p className='text-3xl ml-8 my-3'>Альтернатива {gurvich?.ans}, при цьому z = {gurvich?.res}</p>

                    <p className='text-4xl ml-8 mt-12'>Найоптимальніші варіанти за критерієм Севіджа:</p>
                    <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <p className='text-3xl ml-8 my-3'>Альтернатива {sevidzch?.ans}, при цьому z = {sevidzch?.res}</p>

        </div>    
    );
}
 
export default RiskComponent;