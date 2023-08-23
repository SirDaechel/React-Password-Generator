import { useState, useEffect } from "react";
import Passwords from "./Component/Passwords";
import Alert from "./Component/Alert";

const getPasswordFromLocalStorag = () => {
  let passwordList = localStorage.getItem("Passwords");
  if(passwordList) {
    return JSON.parse(localStorage.getItem("Passwords"))
  } else {
    return []
  }
}

const App = () => {

  const [upperCase, setUpperCase] = useState(["A", "B", "C", "D", "E", "F", "G", "H", 
  "I", "J", "K", "L", "M", "N", "O", "P", 
  "Q",  "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);

  const [lowerCase, setLowerCase] = useState(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
  "u", "v", "w", "x", "y", "z"]);

  const [numbers, setNumbers] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  const [symbols, setSymbols] = useState(["!", "@", "#", "$", "%", "^", "&", "*"]);

  const [passwordString, setPasswordString] = useState([]);

  let [passwordText, setPasswordText] = useState("");

  const [passwordData, setPasswordData] = useState(getPasswordFromLocalStorag());

  let [platform, setPlatform] = useState("");

  const [isChecked1, setIsChecked1] = useState(false);

  const [isChecked2, setIsChecked2] = useState(false);

  const [isChecked3, setIsChecked3] = useState(false);

  const [isChecked4, setIsChecked4] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  let [length, setLength] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editID, setEditID] = useState(null)

  const [showAlert, setShowAlert] = useState({ show: false, msg:"", type:"" });


  //generate cases

  const upperCaseGenerate = (e) => {

    setIsChecked1(!isChecked1)

    if(!isChecked1){

      let randomUpper = Math.floor((Math.random() * upperCase.length));

      let upperCaseString = upperCase[randomUpper];

      setPasswordString([...passwordString, upperCaseString])

      return upperCaseString

    } 

  }

  const lowerCaseGenerate = () => {

    setIsChecked2(!isChecked2)

    if(!isChecked2){

      let randomLower = Math.floor((Math.random() * lowerCase.length));

      let lowerCaseString = lowerCase[randomLower];

      setPasswordString([...passwordString, lowerCaseString])

      return lowerCaseString

    }

  }

  const numCaseGenerate = () => {

    setIsChecked3(!isChecked3)
    
    if(!isChecked3){

      let randomNum = Math.floor((Math.random() * numbers.length));

      let numCaseString = numbers[randomNum];

      setPasswordString([...passwordString, numCaseString])

      return numCaseString

    }

  }

  const symbolCaseGenerate = () => {

    setIsChecked4(!isChecked4)

    if(!isChecked4) {

      let randomSymbol = Math.floor((Math.random() * symbols.length));

      let symbolCaseString = symbols[randomSymbol];

      setPasswordString([...passwordString, symbolCaseString])
    
      return symbolCaseString

    }

  }


  //generate the password

  const generatePassword = () => {

    if(!platform || !length) {

      setShowAlert({ show: true, msg: "Please enter a platform or increment length above 0!", type: "alert_red" })

      return ""

    } else if(platform && isEditing) {

      setPasswordData(passwordData.map((password) => {

        if(password.id === editID) {
          return {...password, thePassword: passwordText, length: passwordText.length}
        }
        setShowAlert({ show: true, msg: "Password edited!", type: "alert_success" })
        return password
      }))

      setIsDisabled(false)
      setPlatform("");
      setPasswordText("");
      setLength("");
      setIsEditing(false);

    } else {

      let theLength = parseInt(length)
      
      for(let i = 0; i < theLength; i++) {
        
        let string = passwordString[Math.floor((Math.random() * passwordString.length))];
  
        setPasswordText(passwordText += string)
  
      }
  
      setPasswordData([...passwordData, {id: new Date().getTime(), platform: platform, thePassword: passwordText, length: length}])
  
      setIsChecked1(false);
      setIsChecked2(false);
      setIsChecked3(false);
      setIsChecked4(false);
  
      setPasswordText("");
      setLength(4);
      setPlatform("");
      setPasswordString([]);
  
      setShowAlert({ show: true, msg: "Password generated!", type: "alert_success" })
      console.log(passwordText);

    }

  }

  //edit password

  const editPassword = (id) => {

    const specificPassword = passwordData.find((password) => {

      if(password.id === id) {

        setIsEditing(true)

        setEditID(id)

        setPlatform(platform = password.platform)

        setPasswordText(passwordText = password.thePassword)

        setLength(length = password.length)

        setIsDisabled(true)

      }


    })

  }

  //remove alert

  const removeAlert = () => {
    setShowAlert({ show: false, msg: "", type: "" })
  }


  //delete password

  const deletePassword = (id) => {

    setPasswordData(passwordData.filter((password) => password.id !== id));

    setShowAlert({ show: true, msg: "Password deleted!", type: "alert_red" })

  }


  //save passwords to localstorage

  useEffect(() => {

    localStorage.setItem("Passwords", JSON.stringify(passwordData))

  }, [passwordData])


  return (
    <>

      <div className="container">

        <div className="cont_body">

          {showAlert.show && <Alert 

              {...showAlert} 
              removeAlert={removeAlert} 
              passwordsAll={passwordData} 
            
            />
          
          }

          <div className="input_area">

            <div className="pwd_label">
              <p>Platform:</p>
              <input type="text" className="pwd_name" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g instagram" disabled={isDisabled} />
            </div>

            <div className="generated_pwd">
              <p>Password:</p>
              <input type="text" className="input_box" value={passwordText} onChange={(e) => setPasswordText(e.target.value)} placeholder="Generated Password" />
            </div>

            <div className="pwd_length">
              <p>Length:</p>
              <input type="number" className="pwd_num" value={length} onChange={(e) => setLength(e.target.value)} min="4" max="15" placeholder="0" disabled={isDisabled} />
            </div>

          </div>

          <div className="includes_body">

            <div className= {isDisabled ? "reduce_checkbox_opacity" : "includes"} >
              <input type="checkbox" className="check_box" checked={isChecked1} onChange={() => upperCaseGenerate()} disabled={isDisabled} />
              <p className="include_txt uppercase">Must include uppercase</p>
            </div>

            <div className= {isDisabled && "reduce_checkbox_opacity" || "includes"}>
              <input type="checkbox" className="check_box" checked={isChecked2} onChange={() => lowerCaseGenerate()} disabled={isDisabled} />
              <p className="include_txt lowercase">Must include lowercase</p>
            </div>

            <div className= {isDisabled && "reduce_checkbox_opacity" || "includes"}>
              <input type="checkbox" className="check_box" checked={isChecked3} onChange={() => numCaseGenerate()} disabled={isDisabled} />
              <p className="include_txt number">Must include number(s)</p>
            </div>

            <div className= {isDisabled && "reduce_checkbox_opacity" || "includes"}>
              <input type="checkbox" className="check_box" checked={isChecked4} onChange={() => symbolCaseGenerate()} disabled={isDisabled} />
              <p className="include_txt symbols">Must include symbols</p>
            </div>

          </div>

          <button className="generate_btn" onClick={() => generatePassword()}>{isEditing ? "Edit Password" : "Generate Password"}</button>

            <div className="saved_pwd">

              <div className="saved_pwd_header">

                <p className="header_title">Platform</p>

                <p className="header_text">Password</p>

                <p className="header_length">Length</p>

                <p className="header_Delete">Edit/Delete</p>

              </div>

              <div className="saved_pwd_cont">

                {passwordData.map((password)=> {

                  return <Passwords
                    key={password.id}
                    password={password}
                    onEdit={() => editPassword(password.id)}
                    onDelete={() => deletePassword(password.id)}
                  />

                })}

                
              </div>

            </div>

        </div>

      </div>

      <footer>
        <div className="copy">
          &copy; Developed With ReactJS By Sir Daechel
        </div>
      </footer>
     
    </>
  );
}

export default App;
