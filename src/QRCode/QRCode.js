import React from 'react';
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-reader';

import { Form, FormGroup, Input, InputGroup, InputGroupAddon, Button, Modal, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
class QRCode extends React.PureComponent {
  state = {
    showQRScanner: false,
    qrCode: ''
  }

  handleScan = data => {
    if (data) {
      this.setState({
        qrCode: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <>
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

        <Row className="mt-5">
          <Col md="4">
            <Form>
              <FormGroup>
                <InputGroup>
                  <Input type="text" className="form-control" value={this.state.qrCode} onChange={(e) => this.setState({ qrCode: e.target.value })} />
                  <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={() => this.setState({ showQRScanner: true })} >Scan</Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <QRCode value={this.state.qrCode} size={256} />
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default QRCode;