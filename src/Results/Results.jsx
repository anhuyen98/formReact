import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formActions } from '../store/form/slice'

const Results = () => {
  const { userList } = useSelector(state => state.form)
  const dispatch = useDispatch()
  return (
    <div className='rounded-lg overflow-hidden shadow-md shadow-gray-900/50'>
      {
        userList.length ? <table className='table-fixed tableCustom border-collapse leading-[40px]'>
          <thead className='border-b border-gray-800/50 bg-violet-600/30 text-violet-950'>
            <tr>
              <th className='min-w-[250px]'>Mã SV</th>
              <th className='min-w-[250px]'>Họ Tên</th>
              <th className='min-w-[250px]'>SĐT</th>
              <th className='min-w-[250px]'>Email</th>
              <th className='min-w-[250px]'>Action</th>
            </tr>
          </thead>
          <tbody className='tbody text-center'>
            {
              userList.map((user) =>
              (
                <tr key={user?.id} className='border-b border-gray-800/20'>
                  <td>{user?.id}</td>
                  <td>{user?.hoTen}</td>
                  <td>{user?.sdt}</td>
                  <td>{user?.email}</td>
                  <td className='flex justify-evenly'>
                    <button className='rounded-lg my-2 bg-green-400 font-medium text-green-950 px-6 '
                      onClick={() => { dispatch(formActions.editUser(user)) }}>Edit</button>
                    <button className='rounded-lg my-2 bg-red-400 font-medium text-red-950 px-6 '
                      onClick={() => { dispatch(formActions.deleteUser(user.id)) }}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table> : ''
      }

    </div>
  )
}

export default Results