import React from 'react'
// import SelectSearch from 'react-select-search';

export default function AddVariants({closeModal}) 
{
    const Outline = 
    {
        boxShadow: 'none',
        borderColor: '#398E8B',
        backgroundColor: 'transparent'
    }

    
    return (
        <div>
            <form className="form-validate is-alter" >
                <div className="form-group" >
                    <label className="form-label" htmlFor="name">Name</label>
                    <span style={{color: 'red', marginLeft: '2px'}}>*</span>
                    <div className="form-control-wrap">
                        <input type="text" className="form-control" name="name" placeholder="Enter Name" style={Outline} required />
                    </div>
                </div>

                <div className="modal-footer bg-white"></div>
                <div className="form-group float-right">
                    <button type="button" className="btn btn-sm btn-danger mr-2" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-sm btn-primary" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }}>Add Variant</button>
                </div>
            </form>
        </div>
    )
}
