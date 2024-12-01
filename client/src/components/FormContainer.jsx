import React, { useState } from 'react'
import { createShortUrl } from '../api/url.api'

function FormContainer({ setNewData }) {

    const [fullUrl, setFullUrl] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await createShortUrl(fullUrl)
            setNewData(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-2'>
            <div className='bg-banner my-8 rounded-xl bg-cover '>
                <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50'>
                    <h2 className='text-white text-4xl text-center pb-4'>URL Shorter</h2>
                    <p className='text-white text-center pb-2 text-xl font-extralight'>  paste your undtidy link to get your short link</p>
                    <p className='text-white text-center pb-4 text-sm font-thin'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur et ullam, ab porro voluptate nihil unde repudiandae consequuntur </p>
                    <form onSubmit={handleSubmit}>
                        <div className='flex'>
                            <div className='relative w-full'>
                                <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800 '>
                                    urlshortner.link /
                                </div>
                                <input value={fullUrl} onChange={(e) => setFullUrl(e.target.value)} type='text' placeholder='Add your link' required className='block ps-32 w-full p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500' />
                                <button type="submit" className='absolute top-0 end-0 font-medium h-full text-white p-2.5 text-sm bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:ring-blue-300' > short url</button>

                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormContainer