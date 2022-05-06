import React from 'react'
import useStore from '../../context/useStore'

const InputField = ({label,labelTitle,img,type,value,handleFunc}) => {
	const {theme, setTheme,user} = useStore()
	const inputTextStyles = ` border text-black border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `
	const labelStyles = `block mb-2 text-sm font-medium capitalize`
	const iconStyles = `absolute text-black inset-y-0 left-0 flex items-center pl-3 pointer-events-none`

	return (
	<div>
<label htmlFor={label} className={labelStyles}>{labelTitle}</label>
<div className="relative">
  <div className={iconStyles}>
  <img src={img} alt={label}/>
  </div>
  <input type={type} id={label}
   className={inputTextStyles} placeholder={user[label]} onChange={handleFunc} value={value} />
		</div>
		</div>
	)
}

export default InputField