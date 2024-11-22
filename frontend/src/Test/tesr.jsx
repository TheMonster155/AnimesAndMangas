
import { Button, Col, Container, Row } from 'react-bootstrap'

import { useContext } from 'react'

const Footer = () => {

    return (
        <footer
            
        >
            <Container>
                <Row>
                    <Col>
                        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                            <div>
                                <h2>Book Store</h2>
                            </div>
                            {/* Add any additional footer content here */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
