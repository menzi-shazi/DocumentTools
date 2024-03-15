import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import jsPDF from "jspdf";
import "./App.css";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [pdfDataUri, setPdfDataUri] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setCapturedImages([...capturedImages, imageSrc]);
  };

  const generatePdf = () => {
    const pdf = new jsPDF();
    capturedImages.forEach((image, index) => {
      if (index !== 0) {
        pdf.addPage();
      }
      const imgWidth = pdf.internal.pageSize.getWidth() * 0.9;
      const imgHeight = pdf.internal.pageSize.getHeight() * 0.9;
      pdf.addImage(image, "JPEG", 10, 10, imgWidth, imgHeight);
    });
    const dataUri = pdf.output("datauristring");
    setPdfDataUri(dataUri);
  };

  return (
    <div>
      <div className="webcam-section">
        <div className="webcam-container">
          <h1 className="webcam-heading">Take a picture</h1>
          <Webcam
            className="webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <div className="button-container">
            <button onClick={capture}>Capture</button>
            <button onClick={generatePdf}>Generate PDF</button>
            {pdfDataUri && (
              <a
                className="download-button"
                href={pdfDataUri}
                download="captured_images.pdf"
              >
                Download PDF
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="captured-images">
        {capturedImages.map((image, index) => (
          <img key={index} src={image} alt={`captured-${index}`} />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <WebcamCapture />
    </div>
  );
}

export default App;
