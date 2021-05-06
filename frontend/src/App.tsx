//Libraries
import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Table,
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useLazyQuery } from '@apollo/react-hooks';

//Components
import { GET_DATAS } from './graphql';
import ProfileList from './components';
import Pagination from './helper/Pagination';

const initialUserDetails = {
  name: '',
  mass: '',
  gender: '',
  height: '',
};

let limit = 10
const App: FunctionComponent = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [userDetails, setUserDetails] = useState(initialUserDetails);

  const [getPeoples, { loading, error, data }] = useLazyQuery<any>(GET_DATAS);

  useEffect(() => {
    if (page) {
      getPeoples({
        variables: { page: page, searchByName: searchValue },
      });
    }
  }, [page, searchValue]);

  const { body } = data || {};
  const { count, results } = body || [];

  if (error) return <h1>Something went wrong!</h1>;

  /*
  ---------------------------------------------------
    Function to open model and set view user details
  ---------------------------------------------------
  */
  const onView = (data: any) => {
    setUserDetails(data);
    setShow(true);
  };

  /*
  ----------------------------------------------------
    Function to close model and clear view user details
  ----------------------------------------------------
  */
  const onHandleClose = () => {
    setShow(false);
    setUserDetails(initialUserDetails);
  };

  /*
  ---------------------------------
    Function to manage pagination
  --------------------------------
  */

  const onPageChanged = (page: any) => {
    setPage(page.currentPage);
    setSkip(limit * (page.currentPage - 1));
  };

  /*
  -----------------------------------
    Function to update search state
  -----------------------------------
  */
  const onSearchChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setSearchValue(value);
  };

  /*
  -----------------------------------
    Function to reset search state
  -----------------------------------
  */
  const onReset = () => {
    setSearchValue('');
    setPage(1)
  };

  const { name = '', mass = '', gender = '', height = '' } = userDetails || {};

  return (
    <div className="App">
      <Container>
        <h1>Peoples</h1>

        {/* Search Box */}
        <Form.Row>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend></InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Search here.."
                onChange={onSearchChange}
                value={searchValue}
              />
              <InputGroup.Text onClick={() => onReset()}>
                <i className="fa fa-refresh" />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Form.Row>

        {/* People Listing */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Mass</th>
              <th>Height</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr key={1}>
                <td colSpan={6}>Loading...</td>
              </tr>
            ) : (
              <>
                {results && results.length > 0
                  ? results.map((data: any, index: any) => (
                    <ProfileList
                      list={data}
                      index={index}
                      onView={onView}
                      skip={skip}
                    />
                  ))
                  : null}
              </>
            )}
          </tbody>

        </Table>
        <div className="d-flex flex-row py-4 align-items-center">
          {!loading && count && count > 0 ? (
            <Pagination
              totalRecords={parseInt(count)}
              pageLimit={limit}
              pageNeighbours={page}
              onPageChanged={onPageChanged}
              currentPage={page}
            />
          ) : null}
        </div>

        {/* People View Details Model */}
        <Modal show={show} onHide={onHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}'s Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={12} md={8}>
                  <span className="font-weight-bold"> Name</span>
                </Col>
                <Col xs={6} md={4}>
                  {name}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={8}>
                  <span className="font-weight-bold"> Gender</span>
                </Col>
                <Col xs={6} md={4}>
                  {gender}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={8}>
                  <span className="font-weight-bold"> Mass</span>
                </Col>
                <Col xs={6} md={4}>
                  {mass}
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={8}>
                  <span className="font-weight-bold"> Height</span>
                </Col>
                <Col xs={6} md={4}>
                  {height}
                </Col>
              </Row>{' '}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHandleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>{' '}
    </div>
  );
};

export default React.memo(App);
