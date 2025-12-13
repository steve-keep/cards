"use client";

import { useRef, useState } from 'react';
import { BarcodeScanner } from 'react-barcode-scanner';
import "react-barcode-scanner/polyfill";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [scannedBarcodes, setScannedBarcodes] = useState<string[]>([]);

  const handlePlusButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleScan = (data: string | null) => {
    if (data && !scannedBarcodes.includes(data)) {
      setScannedBarcodes((prevBarcodes) => [...prevBarcodes, data]);
    }
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Barcode Scanner</h1>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <button
        onClick={handlePlusButtonClick}
        className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {selectedImage && (
        <div className="mt-4">
          <p>Selected image: {selectedImage.name}</p>
          <BarcodeScanner
            onScan={handleScan}
            src={URL.createObjectURL(selectedImage)}
          />
        </div>
      )}
      {scannedBarcodes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Scanned Barcodes:</h2>
          <ul className="list-disc list-inside mt-2">
            {scannedBarcodes.map((barcode, index) => (
              <li key={index} className="p-2 bg-gray-800 rounded mb-2">{barcode}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
