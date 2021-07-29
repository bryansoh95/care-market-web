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
        <Card className='footerRow1Card' style={{borderLeft: '0px', borderTop: '0px', borderRight: '0px'}}>
          <CardBody style={{padding: '0px'}}>
            <Row>
              <Col sm='6' xs='3'>
                <div style={{display: 'flex'}}>
                  {
                    company.map(com => (
                      <Card key={com.name} style={{border: '0px', marginTop: '10px'}}>
                        <CardImg className='footerImage' style={{height: '150px', width: '150px', objectFit: 'contain', marginLeft: '0px'}} src={com.image} />
                      </Card>
                    ))
                  }
                </div>
              </Col>
              <Col sm='6' xs='9'>
                <div style={{float: 'right', display: 'flex'}}>
                  {
                    partnersToRender.map(partner => (
                      <Card key={partner.id} style={{border: '0px', margin: '10px'}}>
                        <CardImg className='footerImage' style={{height:'150px', width: '100px', objectFit: 'contain'}} src={partner.image} />
                      </Card>
                    ))
                  }
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card style={{border: '0px'}}>
          <Row className='footerRow2' style={{paddingTop: '40px'}}>
            <Col sm='6'>
              <div style={{display: 'flex'}}>
                <div style={{textAlign: 'center', marginRight: '80px'}}>
                  <NavLink to='#'><p style={{color: 'gray', fontSize: '14px'}}>Disclaimer</p></NavLink>
                </div>
                <div style={{textAlign: 'center', marginRight: '80px'}}>
                  <NavLink to='#'><p style={{color: 'gray', fontSize: '14px'}}>Privacy</p></NavLink>
                </div>
                <div style={{textAlign: 'center', marginRight: '80px'}}>
                  <NavLink to='#'><p style={{color: 'gray', fontSize: '14px'}}>Terms of Use</p></NavLink>
                </div>
                <div style={{textAlign: 'center', marginRight: '80px'}}>
                  <NavLink to='#'><p style={{color: 'gray', fontSize: '14px'}}>Site Map</p></NavLink>
                </div>
              </div>
            </Col>
            <Col sm='6'>
              <div style={{textAlign: 'right'}}>
                <p style={{color: 'gray', fontSize: '14px'}}>copyright</p>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Footer;