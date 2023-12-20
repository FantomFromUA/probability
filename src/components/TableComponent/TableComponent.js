import React from 'react';

const TableComponent = ({matrix, rowName, columnName}) => {

    return (
        <div className="flex flex-col">
            <div classNames="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden"></div> 
                        <table className='min-w-full text-center text-sm font-light'>
                            <thead className='border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800'>
                                <tr>
                                    <th></th>
                                    {matrix[0].map((el, id) => (
                                        <th id={1000000 + id} scope="col" className="px-6 py-4 text-lg">{`${columnName}${id + 1}`}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {matrix.map((el1, id) => (
                                    <tr key={10000+id} className='border-b dark:border-neutral-500'>
                                        <td className='whitespace-nowrap  px-6 py-4 font-medium text-lg'>{`${rowName}${id+1}`}</td>
                                        {el1.map((el2, id) => (
                                            <td key={id} className='whitespace-nowrap  px-6 py-4 text-lg'>{el2}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
}
 
export default TableComponent;