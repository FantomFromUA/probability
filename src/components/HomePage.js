import React from 'react';
import FileInputComponent from './FileInputComponent/FileInputComponent';
import TableComponent from './TableComponent/TableComponent';
import NotRiskComponent from './NotRiskComponent/NotRiskComponent';
import RiskComponent from './RiskComponent/RiskComponent';

const HomePage = () => {

    const [data, setData] = React.useState([]);
    const [radio, setRadio] = React.useState(false);

    const handleRadioChange = (event) => {
        setRadio(!radio);
    };

    return (
        <>
            <FileInputComponent 
                setMatrix={setData} 
                id={"matrix"} 
            />
            {data.length > 0 && 
                <>
                    <h2 className="text-center text-7xl font-bold">Таблиця з данними</h2>
                    <TableComponent 
                        matrix={data}
                        rowName={"x"}
                        columnName={"y"}
                    />
                    <div className='m-8'>
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
                            {radio ? "В умовах ризику" : "В умовах невизначеності"}
                        </label>
                    </div>

                    { radio
                        ? <NotRiskComponent matrix={data}/> 
                        : <RiskComponent matrix={data}/>
                    }
                </>
            }
        </>
    );
}
 
export default HomePage;
