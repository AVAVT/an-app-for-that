import React from 'react';
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-reader';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCopy } from '@fortawesome/free-solid-svg-icons';

import { Form, FormGroup, InputGroup, InputGroupAddon, Button, Modal, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

class QRCodeApp extends React.PureComponent {
  state = {
    showQRScanner: false,
    qrCode: ''
  }

  handleScan = data => {
    if (data) {
      this.setState({
        qrCode: data,
        showQRScanner: false
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>QRCode Scanner/Creator - An App for that</title>
        </Helmet>

        <h1>QRCode Scanner/Creator</h1>
        <Link to="/">Home</Link>

        <Row className="mt-5">
          <Col md="4 m-auto">
            <Form>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button color="primary" title="Scan" onClick={() => this.setState({ showQRScanner: true })} >
                      <FontAwesomeIcon icon={faCamera} />
                    </Button>
                  </InputGroupAddon>
                  <input ref="qr-input" type="text" className="form-control" value={this.state.qrCode} onChange={(e) => this.setState({ qrCode: e.target.value })} />
                  {
                    this.state.qrCode && (
                      <InputGroupAddon addonType="append">
                        <Button
                          title="Copy Code"
                          color="primary"
                          onClick={() => {
                            this.refs['qr-input'].select();
                            document.execCommand('copy');
                            return false;
                          }} >
                          <FontAwesomeIcon icon={faCopy} />
                        </Button>
                      </InputGroupAddon>
                    )
                  }
                </InputGroup>
              </FormGroup>
              <QRCode value={this.state.qrCode} size={256} />
            </Form>
          </Col>
        </Row>

        <Modal isOpen={this.state.showQRScanner} toggle={() => this.setState({ showQRScanner: false })}>
          <ModalBody>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.setState({ showQRScanner: false })}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default QRCodeApp;