import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import '../../stylesheets/css/bootstrap.css';
import '../../stylesheets/main.css';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardImg,
    CardTitle,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from 'reactstrap';

function Footer() {
  const [company, setCompany] = useState([]);
  // let [partners, setPartners] = useState([]);
  const [partnersToRender, setPartnersToRender] = useState([]);

  useEffect(() => {
    setCompany([]);
    // setPartners([]);
    setPartnersToRender([]);

    axios.get(`http://localhost:5000/company`)
    .then(res => {
      const company = res.data;
      axios.get(`http://localhost:5000/assets/${company.image}`, {
        responseType: 'blob'
      })
      .then(res => {
        const file = new File([res.data], {type: 'image/png'})
        const image = URL.createObjectURL(file);

        const companyToRender = {
          name: company.name,
          image: image
        };

        setCompany(current => [...current, companyToRender]);
      });
    });

    axios.get(`http://localhost:5000/partners`)
    .then(res => {
      const partners = res.data;
      // setPartners([...partners, res.data])
      for (const partner in partners) {
        axios.get(`http://localhost:5000/assets/${partners[partner].image}`, {
          responseType: 'blob'
        })
        .then(res => {
          const file = new File([res.data], {type: 'image/png'})
          const image = URL.createObjectURL(file);
  
          const partnerToRender = {
            id: partners[partner].id,
            name: partners[partner].name,
            email: partners[partner].email,
            url: partners[partner].url,
            image: image
          };
  
          // setPartnersToRender([...partnersToRender, partnerToRender])
          setPartnersToRender(current => [...current, partnerToRender]);
          // partnersToRender.push(partnerToRender);
        })
      }
    });
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm='6' xs='6'>
                    <div style={{float: 'left', display: 'flex'}}>
                      {
                        company.map(com => (
                          <Card key={com.name} style={{border: '0px', margin: '10px'}}>
                            <CardImg style={{height:'100px', width: '100px', objectFit: 'contain'}} src={com.image} />
                          </Card>
                        ))
                      }
                    </div>
                  </Col>
                  <Col sm='6' xs='6'>
                    <div style={{float: 'right', display: 'flex'}}>
                      {
                        partnersToRender.map(partner => (
                          <Card key={partner.id} style={{border: '0px', margin: '10px'}}>
                            <CardImg style={{height:'100px', width: '100px', objectFit: 'contain'}} src={partner.image} />
                          </Card>
                        ))
                      }
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;