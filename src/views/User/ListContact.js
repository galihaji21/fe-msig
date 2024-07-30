import React, { useState, useEffect } from 'react';
import { Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Form, Button, Table, Row, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom';
import empty from "../../assets/img/empty.jpg"
import axios from 'axios';
import Swal from 'sweetalert2'
import LoadingSpinner from '../../utils/LoadingSpinner';

function ListContact(props) {
    const [listContact, setListContact] = useState([]);
    const [postsPerPage, setpostsPerPage] = useState('10');
    const [currentPage, setcurrentPage] = useState('1');
    const [searchTerm, setsearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    useEffect(() => {
        setIsLoading(true);
        getListContact()
    }, []);


    const getListContact = () => {
        try {
            fetch(
                `${apiUrl}/contact/getListContact`, {
                method: 'POST', // Change to 'POST', 'PUT', etc. if needed
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    setListContact(json.data)
                    setIsLoading(false);

                }).finally(() => {

                });
        } catch (err) {
            console.log(err);

        }
    };


    const deleteById = (id) => {
        Swal.fire({
            title: 'Warning!',
            text: 'Yakin Akan Hapus??',
            icon: 'warning',
            showCancelButton: true,
        }).then((result) => {
            console.log("result", result.value)
            if (result.value) {
                console.log('id nya=>', id)
                Delete(id);
            }
        })
    }

    const Delete = async (id) => {
        try {
            await axios.post(`${apiUrl}/contact/deleteContact`, { id });
            Swal.fire({
                title: 'Info!',
                text: 'Berhasil Hapus Data',
                icon: 'success',
            }).then((result) => {
                console.log("result", result.value)
                if (result.value) {
                    getListContact();
                }
            });
        } catch (err) {
            console.log(err);
        }
    };


    const handleChange = async (event) => {
        let search = ''
        search = search + event.target.value
        console.log(search)
        getListByContactNumberOrName(search);
        setsearchTerm(search)
    }


    const getListByContactNumberOrName = async (word) => {
        try {
            const response = await fetch(
                `${apiUrl}/contact//getContactByNameAndNumber?param=` + word, {
                method: 'GET', // Change to 'POST', 'PUT', etc. if needed
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    console.warn('json',json)
                    setListContact(json.data)
                }).finally(() => {
                    // this.setState({ isLoading: false })
                });
            // this.setState({isLoading:false})

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (err) {
            console.log(err);

        }
    };

    const showData = () => {
        const indexOfLastPage = currentPage * postsPerPage;
        const indexOfFirstPage = indexOfLastPage - postsPerPage;
        const currentPosts = listContact.slice(indexOfFirstPage, indexOfLastPage)
        try {
            return (
                <Row>
                    <Col md="12">
                        <Card >
                            <CardHeader>
                                <CardTitle tag="h4">Master Contact</CardTitle>
                                <input
                                    placeholder="Cari nama kontak/nomor kontak"
                                    value={searchTerm}
                                    name="searchTerm"
                                    onChange={handleChange}
                                /> <i class="fas fa-search"></i>
                                <Link to="/admin/contact/tambah" className="btn btn-primary float-right" >Tambah Contact<i class="fas fa-add"></i> </Link>

                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Contact Number</th>
                                            <th>Contact Name</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {currentPosts.length > 0 ? (
                                            currentPosts.map((user, index) =>
                                                <tr key={index}>
                                                    <td>{user.contactNumber}</td>
                                                    <td>{user.contactName}</td>
                                                    <td>

                                                        <Button color="primary" outline><i className="nc-icon nc-ruler-pencil"></i><Link to={'/admin/edit-contact/' + user.id}>Edit</Link> </Button>
                                                        &nbsp;
                                                        <Button color="danger" onClick={() => deleteById(user.id)} outline  ><i className="nc-icon nc-basket"></i>delete</Button>
                                                        &nbsp;

                                                    </td>


                                                </tr>
                                            )
                                        ) : currentPosts.length === 0 ? (
                                            <tr colspan="3" align="center">
                                                <td align='center' colspan="3"><img src={empty} width="50%" backgroundColor="whitesmoke" height="20%" className="App-logo" alt="logo" /></td>
                                            </tr>
                                             
                                        ) : (
                                            <tr colspan="3" align="center" width="100%">
                                                <td>ERROR</td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                    {isLoading ? <LoadingSpinner /> : <p></p>}
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            )

        } catch (e) {
            alert(e.message)
        }
    }

    const showPagination = () => {
        const pageNumbers = [];
        const totalPosts = listContact.length;

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i)
        }

        const pagination = (pageNumbers) => {
            setcurrentPage(pageNumbers)
        }

        return (
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                            <button onClick={() => pagination(number)} className="page-link"> {number} </button>
                        </li>
                    ))}
                </ul>
            </nav>
        )

    }



    return (

        <div className="content">
            {showData()}
            <div style={{ float: 'right' }}>
                {showPagination()}
            </div>
        </div>
    );
};

export default ListContact;