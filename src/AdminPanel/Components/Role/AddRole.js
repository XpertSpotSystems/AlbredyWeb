import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import * as MyConstants from '../../Constant/Config'
import swal from 'sweetalert'

export default function AddRole({closeModal, RoleData}) 
{
    const Outline = 
    {
        boxShadow: 'none',
        borderColor: '#398E8B',
        backgroundColor: 'transparent'
    }

    const [ Role, setRole ] = useState("");

    const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));
  
    const Email = LoginUser.email;
    const Token = LoginUser.token;

    // AddRole
    const AddRole = () => 
    {
        let data = {"role": Role, "email":  Email, "token": Token};
        fetch(MyConstants.addRole,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => 
        {
            result.json().then((response) => 
            {
                if(response.status == true)
                {
                    closeModal(true);
                    RoleData();
                    swal({
                        title: "Success!",
                        text: "New Role has been addedd successfully!",
                        icon: "success",
                        button: "Ok",
                    });
                }
            })
        })
    }

    
    return (
        <div>
            <div className="form-group" >
                <label className="form-label" htmlFor="Role">Role</label>
                <span style={{color: 'red', marginLeft: '2px'}}>*</span>
                <div className="form-control-wrap">
                    <input type="text" className="form-control" name="role" placeholder="Enter Role" style={Outline} onChange={ (e)=>setRole(e.target.value) } required />
                </div>
            </div>

            <div className="modal-footer bg-white"></div>
            <div className="form-group float-right">
                <button className="btn btn-sm btn-danger mr-2" onClick={closeModal}>Cancel</button>
                <button className="btn btn-sm btn-primary" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }} onClick={AddRole}>Add Role</button>
            </div>
        </div>
    )
}
