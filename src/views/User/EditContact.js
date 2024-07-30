import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Form, Button, Row } from 'reactstrap'
import { swalAlert } from '../../utils/swal';
import Swal from 'sweetalert2'

function EditContact(props) {
    const [contactName, setContactName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;


    useEffect(() => {
        getUserById(id)
    }, []);

    const getUserById = (id) => {
        try {

            fetch(
                `${apiUrl}/contact/getContactById?id=` + id, {
                method: 'GET', // Change to 'POST', 'PUT', etc. if needed
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    setContactName(json.data.contactName)
                    setContactNumber(json.data.contactNumber)

                }).finally(() => {
                    //this.setState({ isLoading: false })
                });
            // this.setState({isLoading:false})
        } catch (err) {
        }
    }


    const handleSimpan = async () => {
        try {

            if (contactName.length > 0 && contactNumber.length > 0) {
                const response = await fetch(`${apiUrl}/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id,contactName, contactNumber}),

                });

                if (response.status === 200) {
                    const data = await response.json();
                    Swal.fire({
                        title: 'Sukses!',
                        text: 'Sukses Tambah User',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.value) {
                            navigate('/admin/contact');

                        }
                    })
                } else {
                    // Handle failed login, e.g., display error message
                    swalAlert('Gagal Simpan')
                }
            } else {
                swalAlert('Gagal Simpan Data Harus Lengkap')
            }

        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader tag="h4">
                            Edit User
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
                                        <Input
                                            type="contactNumber"
                                            name="contactNumber"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                        />
                                    </Label>
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

export default EditContact;