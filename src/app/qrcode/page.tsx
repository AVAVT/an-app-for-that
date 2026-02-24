"use client";

import { faCamera, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useRef, useState } from "react";
import { Button, cn, Input, Modal } from "vat-ui";

export default function QrcodePage() {
  const [qrCode, setQrcode] = useState<string>("");
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleScan = useCallback((detectedBarcodes: IDetectedBarcode[]) => {
    for (const data of detectedBarcodes) {
      if (data.rawValue) {
        setQrcode(data.rawValue);
        setShowQRScanner(false);
        break;
      }
    }
  }, []);

  const handleError = (err: unknown) => {
    console.error(err);
  };

  return (
    <article className="container-space">
      <h1>QRCode Scanner/Creator</h1>
      <Link href="/">Home</Link>

      <div className="mt-5 flex flex-col items-center gap-4">
        <div className="flex items-stretch">
          <Button
            variant="solid"
            color="primary"
            className="relative rounded-r-none z-1"
            title="Scan"
            onClick={() => setShowQRScanner(true)}
          >
            <FontAwesomeIcon icon={faCamera} />
          </Button>
          <Input
            ref={inputRef}
            type="text"
            color="primary"
            className={cn("rounded-l-none border-l-0 w-[30rem]", qrCode ? "rounded-r-none border-r-0" : "")}
            value={qrCode}
            onChange={(e) => setQrcode(e.target.value)}
          />
          {qrCode && (
            <Button
              title="Copy Code"
              variant="outline"
              color="primary"
              className="relative rounded-l-none z-1"
              onClick={() => {
                inputRef.current?.select();
                document.execCommand("copy");
                return false;
              }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </Button>
          )}
        </div>

        <QRCodeCanvas value={qrCode} size={256} />
      </div>

      <Modal show={showQRScanner} onClose={() => setShowQRScanner(false)} hasCloseButton clickOutsideToClose>
        <Scanner onError={handleError} onScan={handleScan} />
      </Modal>
    </article>
  );
}
