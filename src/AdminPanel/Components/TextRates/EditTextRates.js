import React, { useState } from 'react'

export default function EditTextRates({ closeModal }) 
{
    const Outline = 
    {
        boxShadow: 'none',
        borderColor: '#398E8B',
        backgroundColor: 'transparent'
    }

    const [ EditTextRates, setEditTextRates ] = useState(
    {
        id: ""
    });
    
    const onInputEditValue = (e) =>
    {
        setEditTextRates({...EditTextRates, [e.target.name]: e.target.value})
    };

    return (
        <div>
            <form className="form-validate is-alter">
                <div className="form-group" >
                    <label className="form-label" htmlFor="name">Name</label>
                    <span style={{color: 'red', marginLeft: '2px'}}>*</span>
                    <div className="form-control-wrap">
                        <input type="text" className="form-control" name="name" placeholder="Enter Name" style={Outline} required />
                    </div>
                </div> 

                <div className="form-group" >
                    <label className="form-label" htmlFor="code">Code</label>
                    <span style={{color: 'red', marginLeft: '2px'}}>*</span>
                    <div className="form-control-wrap">
                        <input type="text" className="form-control" name="code" placeholder="Enter Code" style={Outline} required />
                    </div>
                </div>

                <div className="form-group" >
                    <label className="form-label" htmlFor="rate">Rate</label>
                    <span style={{color: 'red', marginLeft: '2px'}}>*</span>
                    <div className="form-control-wrap">
                        <input type="text" className="form-control" name="rate" placeholder="Enter rate" style={Outline} required />
                    </div>
                </div>
                
                <div className="form-group" >
                    <label className="form-label" htmlFor="type">Type</label>
                    <div className="form-control-wrap">
                        <select class="form-select form-control custom-select" style={Outline}>
                            <option>Percentage</option>
                            <option>Fixed</option>
                        </select>
                    </div>
                </div>

                <div className="modal-footer bg-white"></div>
                <div className="form-group float-right">
                    <button type="button" className="btn btn-sm btn-danger mr-2" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-sm btn-primary" >Update</button>
                </div>
            </form>
        </div>
    )
}
 