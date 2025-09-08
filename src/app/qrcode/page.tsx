"use client";

import { faCamera, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";

export default function QrcodePage() {
  const [qrCode, setQrcode] = useState<string>("");
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleScan = (detectedBarcodes: IDetectedBarcode[]) => {
    for (const data of detectedBarcodes) {
      if (data.format === "QR_CODE" && data.rawValue) {
        setQrcode(data.rawValue);
        setShowQRScanner(false);
        break;
      }
    }
  };

  const handleError = (err: unknown) => {
    console.error(err);
  };

  return (
    <Container fluid="md">
      <h1>QRCode Scanner/Creator</h1>
      <Link href="/">Home</Link>

      <Row className="mt-5">
        <Col md="4 m-auto">
          <Form>
            <FormGroup>
              <InputGroup>
                <Button
                  color="primary"
                  title="Scan"
                  onClick={() => setShowQRScanner(true)}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </Button>
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  value={qrCode}
                  onChange={(e) => setQrcode(e.target.value)}
                />
                {qrCode && (
                  <Button
                    title="Copy Code"
                    color="secondary"
                    onClick={() => {
                      inputRef.current?.select();
                      document.execCommand("copy");
                      return false;
                    }}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </Button>
                )}
              </InputGroup>
            </FormGroup>
            <QRCodeCanvas value={qrCode} size={256} />
          </Form>
        </Col>
      </Row>

      <Modal isOpen={showQRScanner} toggle={() => setShowQRScanner(false)}>
        <ModalBody>
          <Scanner onError={handleError} onScan={handleScan} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setShowQRScanner(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
