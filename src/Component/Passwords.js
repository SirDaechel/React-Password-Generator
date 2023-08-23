const Passwords = ({ password, onDelete, onEdit }) => {

  const {id, platform, thePassword, length} = password

  return (

    <div className="saved_pwd_data" key={id}>
    
      <p className="saved_pwd_title">{platform}</p>
    
      <p className="saved_pwd_info saved_pwd_text">{thePassword}</p>
    
      <p className="saved_pwd_info saved_pwd_length">{length}</p>
    
      <div className="saved_pwd_info icons">
        <i className='bx bxs-edit editpwdicon' id={id} onClick={onEdit}></i>
        <i className='bx bx-trash deletepwdicon' id={id} onClick={onDelete}></i>
      </div>

    </div>

  )
}

export default Passwords