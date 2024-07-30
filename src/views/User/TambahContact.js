import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Form, Button, Row } from 'reactstrap'
import { swalAlert } from '../../utils/swal';
import Swal from 'sweetalert2'

function TambahContact(props) {
    const [contactName, setContactName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;


    const handleSimpan = async () => {
        try {

            if (contactName.length > 0 && contactNumber.length > 0) {
                const response = await fetch(`${apiUrl}/contact`, {
                     method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ contactName, contactNumber}),

                });
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data)
                    if(data.status === '200'){
                        Swal.fire({
                            title: 'Sukses!',
                            text: 'Sukses Tambah Kontak',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            console.log("result", result.value)
                            if (result.value) {
                                navigate('/admin/contact');
                            }
                        })
                    }else{
                        swalAlert('Gagal Simpan')
                    }
                   
                } else {
                    swalAlert('Gagal Simpan')
                   
                }
            } else {
                swalAlert('Gagal Simpan Data Harus Lengkap')
            }

        } catch (error) {
            console.error('An error occurred:', error);
        }

    };


    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader tag="h4">
                            Tambah kontak
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label>
                                        Nama Kontak</Label>
                                    <Input
                                        name="contactName"
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        type="text"

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        Nomor Kontak
                                    </Label>    
                                        <Input
                                            type="contactNumber"
                                            name="contactNumber"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                        />
                                </FormGroup>
                                <Button color="danger" onClick={handleSimpan}>Simpan</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>

    );
};

export default TambahContact;