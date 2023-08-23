import { useState, useEffect } from "react";

const Alert = ({ type, msg, removeAlert, passwordsAll }) => {

    useEffect(() => {

        const timeOut = setTimeout(() => {

            removeAlert()
            
        }, 3000)

    }, [passwordsAll])
    
  return (
    <p className={`alert ${type}`}>{msg}</p>
  )
}

export default Alert