import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Function to generate QR code
  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to download the QR code as an image
  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qr-code.png';
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      <h1>QR Code Generator</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button style={styles.button} onClick={generateQRCode}>
        Generate QR Code
      </button>

      {qrCodeUrl && (
        <div style={styles.qrContainer}>
          <img src={qrCodeUrl} alt="QR Code" style={styles.qrCode} />
          <button style={styles.button} onClick={downloadQRCode}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  input: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    margin: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
  },
  qrContainer: {
    marginTop: '20px',
  },
  qrCode: {
    width: '200px',
    height: '200px',
    marginBottom: '10px',
  },
};

export default QRCodeGenerator;

