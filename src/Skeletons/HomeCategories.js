import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomeCategories() {
    return (
        <div className='ml-3'>
            <Skeleton height={300} width={400} count={1} />
            <div className='mt-3'>
                <Skeleton count={1} className="p-3" width={400}/>
            </div>
        </div>
    );
};