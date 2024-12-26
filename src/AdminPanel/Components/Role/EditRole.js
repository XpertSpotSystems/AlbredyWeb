import React, { useState } from 'react'
import * as MyConstants from '../../Constant/Config'
import swal from 'sweetalert'

export default function EditRole({ closeModal, id, Role, RoleData }) 
{
    const Outline = 
    {
        boxShadow: 'none',
        borderColor: '#398E8B',
        backgroundColor: 'transparent'
    }

    const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));
  
    const Email = LoginUser.email;
    const Token = LoginUser.token;

    const [ EditRole, setEditRole ] = useState(
    {
        id: id,
        role: Role,
        email: Email,
        token: Token
    });
    
    const onInputEditValue = (e) =>
    {
        setEditRole({...EditRole, [e.target.name]: e.target.value})
    };

    const UpdateData = () =>
    {
        fetch(MyConstants.updateRole,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EditRole)
        }).then((result) => 
        {
            
            result.json().then((response) => 
            {
                console.warn('Update Role ===',response);
                if(response.status == true)
                {
                    closeModal(true);
                    RoleData();
                    swal({
                        title: "Success!",
                        text: "Role has been updated successfully!",
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
                    <input type="text" className="form-control" name="role" placeholder="Enter Role" defaultValue={Role} onChange={onInputEditValue} style={Outline} required />
                </div>
            </div>

            <div className="modal-footer bg-white"></div>
            <div className="form-group float-right">
                <button type="button" className="btn btn-sm btn-danger mr-2" onClick={closeModal}>Cancel</button>
                <button className="btn btn-sm btn-primary" onClick={UpdateData} >Update</button>
            </div>
        </div>
    )
}
 