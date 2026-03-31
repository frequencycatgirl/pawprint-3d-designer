import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { SketchPicker } from 'react-color';
import LogoControls from '../canvas/LogoControls';
import TextControls from '../canvas/TextControls';

const Customizer = () => {
  const snap = useSnapshot(state);

  // Download both front and back designs as PNGs
  const downloadDesign = () => {
    // Front
    if (snap.frontDecalUrl) {
      const link = document.createElement('a');
      link.download = 'pawprint-design-front.png';
      link.href = snap.frontDecalUrl;
      link.click();
    }

    // Back (small delay so both downloads don't overlap)
    setTimeout(() => {
      if (snap.backDecalUrl) {
        const link2 = document.createElement('a');
        link2.download = 'pawprint-design-back.png';
        link2.href = snap.backDecalUrl;
        link2.click();
      }
    }, 400);
  };

  // Open email client with pre-filled message
  const submitDesign = () => {
    const subject = "My Custom PawPrint T-Shirt Design";
    const body = `Hi PawPrint America,\n\nHere is my custom t-shirt design.\n\nFront design attached\nBack design attached\n\nShirt color: ${snap.color}\n\nThank you!`;
    window.location.href = `mailto:print@pawprintamerica.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="customizer p-6 bg-gray-900/95 backdrop-blur-md h-full overflow-y-auto text-white">
      <h2 className="text-2xl font-bold mb-6">Customize Your Shirt</h2>

      {/* Shirt Color */}
      <div className="mb-8">
        <p className="text-gray-400 mb-2">Shirt Color</p>
        <SketchPicker 
          color={snap.color} 
          onChange={(color) => state.color = color.hex} 
        />
      </div>

      {/* Logo & Text Controls */}
      <div className="space-y-10">
        <LogoControls />
        <TextControls />
      </div>

      {/* Big Action Buttons */}
      <div className="mt-12 space-y-4">
        <button 
          onClick={downloadDesign}
          className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
        >
          📥 Download Front & Back Designs
        </button>

        <button 
          onClick={submitDesign}
          className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
        >
          ✉️ Submit Design to PawPrint America
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        Download the PNG files and attach them in the email, or use the Submit button.
      </p>
    </div>
  );
};

export default Customizer;