import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className='w-full'>        
        {
            [...Array(5)].map((_,idx) => (
                <div className="w-full px-3 py-4">
                    <div className="flex animate-pulse space-x-4">
                        <div className="size-16 rounded-full bg-gray-200"></div>
                        <div className="flex-1 space-y-7 py-1">
                            <div className="h-3 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                </div>
                                <div className="h-2 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }        
        </div>
    )
}

export default Loading