import React, { useEffect, useState } from 'react'
import FormContainer from './FormContainer'
import DataTable from './DataTable'
import { getUrlsList } from '../api/url.api'

function Container() {
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])



    const fetchTableData = async () => {
        const response = await getUrlsList()
        setData(response.data)
    }

    useEffect(() => {
        fetchTableData()
    }, [newData])
    return (
        <div className='flex-grow' >
            <FormContainer setNewData={setNewData} />
            <DataTable data={data} />
        </div>
    )
}

export default Container