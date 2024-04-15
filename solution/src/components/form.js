
import { Col, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { useState, useEffect } from 'react';
import { getLocations, isNameValid } from '../mock-api/apis';


function GetForm() {

    const [location, setLocation] = useState(['']);
    const [validName, setValidName] = useState(true);
    const [tableData, setTableData] = useState([]);

    const validateName = (event) => {
        // use debouncing here
        console.log(event.target.value);
        isNameValid(event.target.value).then(response => {
            setValidName(response);
            console.log(response, "success");
        }).catch(error => {

        });
    }

    const addTableItem = () => {
       
        const name = document.getElementById("name").value;
        const loca = document.getElementById("selectLocation").value;
    
        setTableData([...tableData,{name: name, location: loca} ]);
    }

    useEffect(() => {
        getLocations().then(response => {
            setLocation(response);
            //location = response;
            console.log(response);
        }).catch(error => {
            console.log(error)
        });
      }, []);



    return (
        < >
            <Form>
                <FormGroup row>
                    <Label for="name" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input id="name" placeholder="Enter Name" onChange={validateName} />
                    </Col>
                    {!validName && <div>Name is invalid</div>}
                </FormGroup>
                <FormGroup row>
                    <Label for="selectLocation" sm={2}>Select Location</Label>
                    <Col sm={10}>
                        <Input type="select" name="select" id="selectLocation" >
                            {location.map(data => {
                               return <option key={data}>{data}</option>
                            })}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{ size: 4, offset: 8 }} style={{ textAlign: 'right' }}>
                        <Button>Clear</Button>{" "}
                        <Button onClick={addTableItem} >Add</Button>
                    </Col>

                </FormGroup>
            </Form>

            <Table bordered responsive striped>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data,index) => 
                        (<tr key={index}>
                            <td>{data.name}</td>
                            <td>{data.location}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default GetForm;
