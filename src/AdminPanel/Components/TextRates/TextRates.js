import React, { useState, useEffect } from 'react'
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from '../../Constant/Config'
import {Modal, Button} from 'react-bootstrap'
import AddTextRates from './AddTextRates'
import EditTextRates from './EditTextRates'
 
export default function TextRates() 
{
    // Get TextRates Data 
    const [TextRates, setTextRates] = useState([]);

    useEffect(() => {
        fetch("", 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => 
            {
                console.warn(response);
                if(response.status == true)
                {
                    setTextRates(response.textRates);
                }
            })
    },[]);
    console.warn(TextRates);

    // Edit TextRates Data
    const [EditModalShow, setEditModalShow] = useState(false);
    const [EditTextRatesModalData, setEditTextRatesModalData] = useState([]);

    const EditTextRatesModalClose = () => setEditModalShow(false);
    const EditTextRatesModalShow = () => setEditModalShow(true);

    const   GetTextRatesData = (id, category, sub_category) =>
    {
        let EditTextRatesModalData = [ id,category, sub_category ];
        setEditTextRatesModalData([...EditTextRatesModalData]);
        return setEditModalShow(true);
    }

    // Add TextRates Data
    const [AddModalShow, setAddModalShow] = useState(false);
    const [AddTextRatesModalData, setAddTextRatesModalData] = useState([]);

    const AddTextRatesModalClose = () => setAddModalShow(false);
    const AddTextRatesModalShow = () => setAddModalShow(true);

    const [ id, setId ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ sub_category, setSubCategory ] = useState("");

    const AddTextRatesData = () =>
    {
        setAddTextRatesModalData([...AddTextRatesModalData]);
        return setAddModalShow(true);
    }

    return (
        <div>
            <div className="nk-app-root">
                {/* main @s */}
                <div className="nk-main ">
                    {/* sidebar @s */}
                    <div className="nk-sidebar nk-sidebar-fixed is-light " data-content="sidebarMenu">
                        <Sidebar />
                    </div>
                    {/* Sidebar @e */}
                    {/* wrap @s */}
                    <div className="nk-wrap ">
                        {/* main header @s */}
                        <div className="nk-header nk-header-fixed is-light">
                            {/* Header */}
                            <Header />
                        </div>
                        {/* main header @e */}

                        {/* content @s */}
                        <div className="nk-content ">
                            <div className="container-fluid">
                                <div className="nk-content-inner">
                                    <div className="nk-content-body">
                                        <div class="components-preview">
                                            <div className="nk-block-head nk-block-head-sm card p-4" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', outline: 'none', marginTop: '20px' }}>
                                                <div className="nk-block-between">
                                                    <div className="nk-block-head-content">
                                                        <h3 className="nk-block-title page-title" style={{ color: "#398E8B" }}>Text Rates</h3>
                                                    </div>{/* .nk-block-head-content */}
                                                    <div className="nk-block-head-content">
                                                        <Button className="btn btn-primary btn-sm d-none d-md-inline-flex" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }} onClick={ AddTextRatesData } ><em className="icon ni ni-plus"/><span>Add Text Rates</span></Button>
                                                    </div>{/* .nk-block-head-content */}
                                                </div>{/* .nk-block-between */}
                                            </div>{/* .nk-block-head */}
                                            <div className="nk-block nk-block-lg mt-5">
                                                <div className="card card-preview" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', outline: 'none', marginTop: '20px' }}>
                                                    <div className="card-inner">
                                                        <table className="table table-bordered table-hover table-striped table-responsive-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr#</th>
                                                                    <th>Name</th>
                                                                    <th>Code</th>
                                                                    <th>Text Rate</th>
                                                                    <th>Type</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    TextRates.map(item =>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td>
                                                                            <Button className="btn btn-primary d-none  btn-sm d-md-inline-flex" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }} onClick={() => GetTextRatesData()}><em className="icon ni ni-edit" /><span>Edit</span></Button>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>{/* .card-preview */}
                                            </div> {/* nk-block */}

                                        </div>{/* .components-preview */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content @e */}
                        {/* Footer */}
                        <div className="nk-footer">
                            <Footer />
                        </div>
                        {/* footer @e */}
                    </div>
                    {/* wrap @e */}
                </div>
                {/* main @e */}
            </div>
            {/* nk-app-root */}

            {/* EditTextRates Modal */}
            {
                EditModalShow === true ? 
                    <Modal className="fade zoom" show={EditTextRatesModalShow} onHide={EditTextRatesModalClose} backdrop="static">
                        <Modal.Header>
                            <Modal.Title>Edit Text Rates</Modal.Title>
                            <a href="#" className="close" onClick={EditTextRatesModalClose}>
                                <em className="icon ni ni-cross" />
                            </a>
                        </Modal.Header>
                        <Modal.Body> 
                            <p>Please fill in the information below. The field labels marked with * are required input fields.</p>
                            {/* Add Text Rates */}
                            <EditTextRates closeModal={EditTextRatesModalClose} />
                        </Modal.Body>
                    </Modal>
                : ''
            }
            
            {/* AddTextRatesModal */}
            {
                AddModalShow === true ? 
                    <Modal className="fade zoom" show={AddTextRatesModalShow} onHide={AddTextRatesModalClose} backdrop="static">
                        <Modal.Header>
                            <Modal.Title>Add Text Rates</Modal.Title>
                            <a href="#" className="close" onClick={AddTextRatesModalClose}>
                                <em className="icon ni ni-cross" />
                            </a>
                        </Modal.Header>
                        <Modal.Body> 
                            <p>Please fill in the information below. The field labels marked with * are required input fields.</p>
                            {/* Add Text Rates */}
                            <AddTextRates closeModal={AddTextRatesModalClose} />
                        </Modal.Body>
                    </Modal>
                : ''
            }

        </div>
    )
}
