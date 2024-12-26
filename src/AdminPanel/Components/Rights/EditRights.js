import React, { useState } from 'react'
import * as MyConstants from '../../Constant/Config' 
import swal from 'sweetalert'

export default function EditRights({ closeModal, id, rights, RightsData }) 
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

    const [ EditRights, setEditRights ] = useState(
    {
        id: id,
        right: rights,
        email: Email,
        token: Token
    });
    
    const onInputEditValue = (e) =>
    {
        setEditRights({...EditRights, [e.target.name]: e.target.value})
    };

    const UpdateData = () =>
    {
        fetch(MyConstants.updateRights,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EditRights)
        }).then((result) => 
        {
            
            result.json().then((response) => 
            {
                console.warn('Update Rights ===',response);
                if(response.status == true)
                {
                    closeModal(true);
                    RightsData();
                    swal({
                        title: "Success!",
                        text: "Rights has been updated successfully!",
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
                <label className="form-label" htmlFor="rights">Rights</label>
                <span style={{color: 'red', marginLeft: '2px'}}>*</span>
                <div className="form-control-wrap">
                    <input type="text" className="form-control" name="right" placeholder="Enter Rights" defaultValue={rights} onChange={onInputEditValue} style={Outline} required />
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
 