import React from 'react'
import Form from '../Form/Form'
import Results from '../Results/Results'

const BackGround = () => {
  return (
    <div className='BackGround relative'>
        <div className='absolute w-3/4 -translate-x-1/2 translate-y-1/2 top-50 left-1/2'>
            <Form />
        </div>
        <div className='absolute w-fit -translate-x-1/2 translate-y-1/2 top-[550px] left-1/2'>
            <Results />
        </div>
    </div>
  )
}

export default BackGround