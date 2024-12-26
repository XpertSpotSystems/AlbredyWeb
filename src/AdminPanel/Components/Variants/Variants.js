import React, { useState, useEffect } from 'react'
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from '../../Constant/Config'
import {Modal, Button} from 'react-bootstrap'
import AddVariants from './AddVariants'
import EditVariants from './EditVariants'
 
export default function Variants() 
{
    // Get Variants Data 
    const [Variants, setVariants] = useState([]);

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
                    setVariants(response.result);
                }
            })
    },[]);
    console.warn(Variants);

    // Edit Variants Data
    const [EditModalShow, setEditModalShow] = useState(false);
    const [EditVariantsModalData, setEditVariantsModalData] = useState([]);

    const EditVariantsModalClose = () => setEditModalShow(false);
    const EditVariantsModalShow = () => setEditModalShow(true);

    const GetVariantsData = (id, category, sub_category) =>
    {
        let EditVariantsModalData = [ id,category, sub_category ];
        setEditVariantsModalData([...EditVariantsModalData]);
        return setEditModalShow(true);
    }

    // Add Variants Data
    const [AddModalShow, setAddModalShow] = useState(false);
    const [AddVariantsModalData, setAddVariantsModalData] = useState([]);

    const AddVariantsModalClose = () => setAddModalShow(false);
    const AddVariantsModalShow = () => setAddModalShow(true);

    const [ id, setId ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ sub_category, setSubCategory ] = useState("");

    const AddVariantsData = () =>
    {
        setAddVariantsModalData([...AddVariantsModalData]);
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
                                                        <h3 className="nk-block-title page-title" style={{ color: "#398E8B" }}>Variants</h3>
                                                    </div>{/* .nk-block-head-content */}
                                                    <div className="nk-block-head-content">
                                                        <Button className="btn btn-primary btn-sm d-none d-md-inline-flex" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }} onClick={ AddVariantsData } ><em className="icon ni ni-plus"/><span>Add Variants</span></Button>
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
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Variants.map(item =>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td></td>
                                                                        <td>
                                                                            <Button className="btn btn-primary d-none  btn-sm d-md-inline-flex" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }} onClick={() => GetVariantsData()}><em className="icon ni ni-edit" /><span>Edit</span></Button>
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

            {/* EditVariants Modal */}
            {
                EditModalShow === true ? 
                    <Modal className="fade zoom" show={EditVariantsModalShow} onHide={EditVariantsModalClose} backdrop="static">
                        <Modal.Header>
                            <Modal.Title>Edit Variants</Modal.Title>
                            <a href="#" className="close" onClick={EditVariantsModalClose}>
                                <em className="icon ni ni-cross" />
                            </a>
                        </Modal.Header>
                        <Modal.Body> 
                            <p>Please fill in the information below. The field labels marked with * are required input fields.</p>
                            {/* Edit Variants */}
                            <EditVariants closeModal={EditVariantsModalClose} />
                        </Modal.Body>
                    </Modal>
                : ''
            }
            
            {/* AddVariantsModal */}
            {
                AddModalShow === true ? 
                    <Modal className="fade zoom" show={AddVariantsModalShow} onHide={AddVariantsModalClose} backdrop="static">
                        <Modal.Header>
                            <Modal.Title>Add Variants</Modal.Title>
                            <a href="#" className="close" onClick={AddVariantsModalClose}>
                                <em className="icon ni ni-cross" />
                            </a>
                        </Modal.Header>
                        <Modal.Body> 
                            <p>Please fill in the information below. The field labels marked with * are required input fields.</p>
                            {/* Add Variants */}
                            <AddVariants closeModal={AddVariantsModalClose} />
                        </Modal.Body>
                    </Modal>
                : ''
            }

        </div>
    )
}
