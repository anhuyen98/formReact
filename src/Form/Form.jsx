import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formActions } from '../store/form/slice'
const Form = () => {
  const [formValue, setFormValue] = useState()
  const [formError, setFormError] = useState()
  const { userEdit } = useSelector(state => state.form)
  const dispatch = useDispatch()
  const validate = (element) => {
    const { validity, minLength, title, value } = element
    const { valueMissing, tooShort, patternMismatch } = validity

    let mess = ''
    if (valueMissing) {
      mess = `Vui lòng nhập ${title}`
    } else if (tooShort || value.length < minLength) {
      mess = `Vui lòng nhập tối thiểu ${minLength} ký tự`
    } else if (patternMismatch) {
      mess = `Vui lòng nhập đúng định dạng ${title}`
    }
    return mess
  }

  // currying function
  const handleFormValue = () => (event) => {
    // validity trong event.target để required (valueMissing = true là sai)
    const { name, value } = event.target
    let mess = validate(event.target)
    setFormError({
      ...formError,
      [name]: mess
    })


    setFormValue({
      ...formValue,
      [name]: value
    })

  }

  useEffect(() => {
    if (!userEdit) return
    setFormValue(userEdit)
  }, [userEdit])
  return (
    <div className='bgForm'>
      <div className='p-10'>
        <form action="" noValidate onSubmit={(e) => {
          e.preventDefault();

          const elements = document.querySelectorAll('form input')

          let errors = {}
          elements.forEach((ele) => {
            const { name } = ele
            errors[name] = validate(ele)
          })

          setFormError(errors)

          let isFlag = false
          for (let key in errors) {
            if (errors[key]) {
              isFlag = true;
              break;
            }
          }
          if (isFlag) return
          if (!userEdit) {
            // HandleEvent click button Create 
            dispatch(formActions.addUser(formValue))
          } else {
            // HandleEvent click button Update
            dispatch(formActions.updateUser(formValue))
          }
        }}>
          <h1 className='header mb-5 ml-5'>
            Thông tin sinh viên
          </h1>
          <div className='grid-rows-2 grid gap-5 grid-flow-col mb-5'>
            <div className='px-6'>
              <label htmlFor="">Mã Sinh Viên</label>
              <input
                required
                className='px-3 my-1 leading-8 border-gray-500 bg-black border rounded w-full'
                type="text"
                placeholder=''
                name='id'
                title='MSSV'
                disabled={!!userEdit}
                value={formValue?.id || ''}
                minLength={5}
                maxLength={8}
                onChange={handleFormValue()} />
              {formError?.id && <p className='text-red-400'>{formError.id}</p>}

            </div>
            <div className='px-6'>
              <label htmlFor="">Họ tên</label>
              <input
                required
                className='px-3 my-1 leading-8 border-gray-500 bg-black border rounded w-full'
                type="text"
                placeholder=''
                name='hoTen'
                title='Họ & Tên'
                value={formValue?.hoTen || ''}
                onChange={handleFormValue()} />
              {formError?.hoTen && <p className='text-red-400'>{formError.hoTen}</p>}
            </div>
            <div className='px-6'>
              <label htmlFor="">Số điện thoại</label>
              <input
                required
                className='px-3 my-1 leading-8 border-gray-500 bg-black border rounded w-full'
                type="text"
                placeholder=''
                name='sdt'
                title='số điện thoại'
                pattern='^[0-9]+$'
                value={formValue?.sdt || ''}
                onChange={handleFormValue()} />
              {formError?.sdt && <p className='text-red-400'>{formError.sdt}</p>}

            </div>
            <div className='px-6'>
              <label htmlFor="">Email</label>
              <input
                required
                className='px-3 my-1 leading-8 border-gray-500 bg-black border rounded w-full'
                type="text"
                placeholder=''
                name='email'
                title='Email'
                pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$"
                value={formValue?.email || ''}
                onChange={handleFormValue()} />
              {formError?.email && <p className='text-red-400'>{formError.email}</p>}

            </div>
          </div>
          <div className='text-right mt-4 mr-6'>
            {
              userEdit ? (
                <button className='rounded bg-violet-600/80 font-medium text-white px-6 py-2'>Cập nhật sinh viên</button>
              ) : (
                <button className='rounded bg-cyan-600/80 font-medium text-white px-6 py-2'>Thêm sinh viên</button>
              )
            }
            {/* <button className='rounded bg-red-600/80 font-medium text-white px-6 py-2 ml-4'>Hủy</button> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form