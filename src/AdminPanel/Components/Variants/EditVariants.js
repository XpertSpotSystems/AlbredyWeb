import React, { useState } from 'react'
import * as MyConstants from '../../Constant/Config'

export default function EditVariants({ closeModal }) 
{
    const Outline = 
    {
        boxShadow: 'none',
        borderColor: '#398E8B',
        backgroundColor: 'transparent'
    }

    const [ EditVariants, setEditVariants ] = useState(
    {
        
    });
    
    const onInputEditValue = (e) =>
    {
        setEditVariants({...EditVariants, [e.target.name]: e.target.value})
    };

    const UpdateData = () =>
    {
        fetch(MyConstants.updateVariants,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EditVariants)
        }).then((result) => 
        {
            
            result.json().then((response) => 
            {
                console.warn('hgghfhgf',response);
                if(response.status == true)
                {
                    setEditVariants(response.variants);
                    closeModal(true);
                }
            })
        })
    }

    return (
        <div>
            <form className="form-validate is-alter">
                <div className="form-group" >
                    <label className="form-label" htmlFor="name">Name</label>
                    <span style={{color: 'red', marginLeft: '2px'}}>*</span>
                    <div className="form-control-wrap">
                        <input type="text" className="form-control" name="name" placeholder="Enter Name" style={Outline} onChange={onInputEditValue} required />
                    </div>
                </div>

                <div className="modal-footer bg-white"></div>
                <div className="form-group float-right">
                    <button type="button" className="btn btn-sm btn-danger mr-2" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-sm btn-primary" onClick={UpdateData} >Update</button>
                </div>
            </form>
        </div>
    )
}
 