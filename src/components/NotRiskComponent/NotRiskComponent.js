import React from 'react';
import FileInputComponent from '../FileInputComponent/FileInputComponent';
import TableComponent from '../TableComponent/TableComponent';
import { bayesianCriterion, maximizationOfProbability, minimizationOfDispersionCriterion, modalCriterion } from './tasks/tasks';
import { Slider } from "@material-tailwind/react";

const NotRiskComponent = ({matrix}) => {

    const [probabilities, setProbabilities] = React.useState([]);

    const [a, setA] = React.useState();
    const [minA, setMinA] = React.useState();
    const [maxA, setMaxA] = React.useState();


    const [bayesian, setBayesian] = React.useState();
    const [minimization, setMinimization] = React.useState();
    const [maximization, setMaximization] = React.useState();
    const [modal, setModal] = React.useState();

    const setData = (data) => {
        let minimum = 99999999;
        let maximum = -99999999;
    
        setProbabilities(data[0]);
    
        matrix.forEach(el => {
            minimum = Math.min(minimum, ...el);
            maximum = Math.max(maximum, ...el);
        });
    
        setMinA(minimum);
        setMaxA(maximum);
    
        setA((minimum + maximum) / 2);
    };

    // метод для знаходження відповіді до 1, 2 та 4 критерію
    React.useEffect(() => {
        if(probabilities.length === 0){
            return;
        }
        console.log(probabilities);

        setBayesian(bayesianCriterion(matrix, probabilities));
        setMinimization(minimizationOfDispersionCriterion(matrix, probabilities));
        setModal(modalCriterion(matrix, probabilities));
    }, [probabilities, matrix]);

    // метод для знаходження выдповіді до 3 критерію
    React.useEffect(() => {
        if(probabilities.length === 0 || a > maxA || a < minA){
            return;
        }

        setMaximization(maximizationOfProbability(matrix, probabilities, a));
    }, [probabilities, matrix, a]);

    return (
        <div>
            <FileInputComponent 
                setMatrix={setData} 
                id={"prob"}  
            />
            {probabilities.length > 0 && 
                <>
                    <TableComponent 
                        matrix={[probabilities]}
                        rowName={'p'}
                        columnName={'p'}  
                    />

                    <p className='text-4xl ml-8 mt-12'>Найоптимальніші варіанти за критерієм Байєсса «максимізації прибутку»:</p>
                    <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <p className='text-3xl ml-8 my-3'>Альтернатива {bayesian?.ans}, при цьому z = {bayesian?.res}</p>

                    <p className='text-4xl ml-8 mt-12'>Найоптимальніші варіанти за критерієм мінімізації дисперсії (критерій найменшого відхилення від сподіваного ефекту):</p>
                    <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <p className='text-3xl ml-8 my-3'>Альтернатива {minimization?.ans}, при цьому z = {minimization?.res.toFixed(2)}</p>

                    <p className='text-4xl ml-8 mt-12'>Потрібно вибрати значення а, {minA} ≤ a ≤ {maxA}</p>
                    <div className="flex ml-8 my-3">
                        <p className='text-4xl ml-8 my-3'>a = :</p>
                        <input 
                            type="number"
                            value={a}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value) && value >= minA && value <= maxA) {
                                    setA(value);
                                }
                            }}
                            className="ml-2 px-2 py-1 border rounded-md text-4xl"
                        />
                    </div>
                    <Slider
                        defaultValue={a}
                        min={minA}
                        max={maxA}
                        onChange={e => setA(Number(e.target.value).toFixed(2))}
                        className="blue mx-8 w-1/2"
                        barClassName="rounded-none bg-[#2ec946]"
                        thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                        trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
                    />
                    <p className='text-4xl ml-8 my-3'>Найоптимальніші варіанти за критерієм максимізації ймовірності розподілу оцінок при a = {a}:</p>
                    <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <p className='text-3xl ml-8 my-3'>Альтернатива {maximization?.ans}, при цьому z = {maximization?.res.toFixed(2)}</p>

                    <p className='text-4xl ml-8 mt-12'>Найоптимальніші варіанти за модальним критерієм:</p>
                    <hr className="h-px mx-8 my-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                    {modal?.res 
                        ? <p className='text-3xl ml-8 mt-3 mb-12'>Альтернатива {modal?.ans}, при цьому z = {modal?.res.toFixed(2)}</p>
                        : <p className='text-3xl ml-8 mt-3 mb-12'>{modal?.ans}</p>
                    }
                </>
            }
        </div>
    );
}
 
export default NotRiskComponent;