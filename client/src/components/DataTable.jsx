import React from 'react'

import { Link } from 'react-router-dom'
import { serverUrl } from '../helpers/constants'
import { calculateExpirationsInHours } from '../helpers/utils';

function DataTable({ data }) {

    const renderTableData = () => {
        return data.map(el => {

            return (<tr key={el?._id} className='border-b text-white bg-gray-500 hover:bg-white hover:text-gray-600' >
                <td className='px-6 py-3 break-words'>
                    <Link to={el.originalUrl} target="_blank" rel='noreferrer noopener'> {el.originalUrl}</Link>
                </td>
                <td className='px-6 py-3 break-words'>
                    <Link to={`${serverUrl}/url/expand/${el.shortUrl}`} target="_blank" rel='noreferrer noopener'> {serverUrl}/url/expand/{el.shortUrl}</Link>
                </td>
                <td className='px-6 py-3 break-words text-left'>
                    {el.totalClicks}
                </td>
                <td className='px-6 py-3 break-words'>
                    <Link to={`${serverUrl}/url/expand/${el.shortUrl}`} target="_blank" rel='noreferrer noopener'> {Number(calculateExpirationsInHours(el.expirationDate)).toFixed(3)} Min</Link>
                </td>
            </tr>)
        })
    }
    return (
        <div className='container mx-auto pt-2 pb-10'>
            <div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
                <table className='w-full table-fixed text-sm text-left  rtl:text-right text-gray-500'>
                    <thead className='text-md uppercase text-gray-50 bg-gray-700'>
                        <tr>
                            <th scope="col" className='px-6 py-3 w-6/12'> Full Url</th>
                            <th scope="col" className='px-6 py-3 w-3/12'> Short url</th>
                            <th scope="col" className='px-6 py-3 '> Clicks</th>
                            <th scope="col" className='px-6 py-3'> Expireation</th>

                        </tr>
                    </thead>
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default DataTable