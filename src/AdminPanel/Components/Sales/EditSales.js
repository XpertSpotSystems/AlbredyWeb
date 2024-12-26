import React, { useState, useEffect } from 'react'
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from '../../Constant/Config'
import { Button } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function EditSales() {
    const History = useHistory();
    const NavigateTo = () => History.push('/list-sales');
    const NavigateToBackPage = () => History.goBack();

    return (
        <div>
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
                                                            <h3 className="nk-block-title page-title" style={{ color: "#398E8B" }}>Edit Sales</h3>
                                                        </div>{/* .nk-block-head-content */}
                                                        <div className="nk-block-head-content">
                                                            <Button className="btn btn-primary btn-sm d-none d-md-inline-flex" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }} onClick={NavigateTo}><em className="icon ni ni-plus" /><span>Sales List</span></Button>
                                                        </div>{/* .nk-block-head-content */}
                                                    </div>{/* .nk-block-between */}
                                                </div>{/* .nk-block-head */}
                                                <div className="nk-block nk-block-lg mt-5">
                                                    <div className="card card-preview" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', outline: 'none', marginTop: '20px' }}>
                                                        <div className='card-inner'>
                                                            <div className='row'>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Date</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <input type="datetime-local" className="form-control" name="date_time" required />
                                                                </div>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Reference No</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <input type="text" className="form-control" name="reference_no" placeholder="Enter  Reference No" required />
                                                                </div>
                                                            </div>
                                                            <div className='row mt-3'>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Biller</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <select className='form-control custom-select'>
                                                                        <option>Zouq</option>
                                                                        <option>Amber Saloon</option>
                                                                    </select>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Stores</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <select className='form-control custom-select'>
                                                                        <option>Pharmacy</option>
                                                                        <option>Utility Store</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-3'>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Customers</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <select className='form-control custom-select'>
                                                                        <option>Zouq</option>
                                                                        <option>Amber Saloon</option>
                                                                    </select>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Attach Documment</label>
                                                                    <input type="file" name="document" style={{ border: 'none', background: 'none' }} />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h3 className='text-capitalize mt-3'>order items</h3>
                                                            <div className='row mt-3'>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Order Discount</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <input type="text" className="form-control" name="order_discount" placeholder="Enter Order Discount" required />
                                                                </div>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Order Tax</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <select className='form-control custom-select'>
                                                                        <option>No Tax</option>
                                                                        <option>VAT @ 10%</option>
                                                                        <option>GST @ 6%</option>
                                                                        <option>VAT @ 20%</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-3'>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Shipping</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <input type="text" className="form-control" name="shipping" placeholder="Enter Shipping" required />
                                                                </div>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Sale Status</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <select className='form-control custom-select'>
                                                                        <option>Completed</option>
                                                                        <option>Pending</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-3'>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Payment Term</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <input type="text" className="form-control" name="payment_term" placeholder="Enter Payment Term" required />
                                                                </div>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Payment Status</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <select className='form-control custom-select'>
                                                                        <option>Pending</option>
                                                                        <option>Due</option>
                                                                        <option>Partial</option>
                                                                        <option>Paid</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-3'>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Sale Note</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                    />
                                                                </div>
                                                                <div className='col-6'>
                                                                    <label className="form-label" >Staff Note</label>
                                                                    <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="modal-footer mt-3"></div>
                                                            <div className="form-group float-right">
                                                                <button type="button" className="btn btn-sm btn-danger mr-2" onClick={NavigateToBackPage}>Cancel</button>
                                                                <button type="reset" className="btn btn-sm btn-success mr-2">Reset</button>
                                                                <button className="btn btn-sm btn-primary" style={{ backgroundColor: "#398E8B", border: "#398E8B", outline: "none", boxShadow: "none" }} >Update</button>
                                                            </div>
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
            </div>
        </div>
    )
}