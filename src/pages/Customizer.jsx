import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { SketchPicker } from 'react-color';
import LogoControls from '../canvas/LogoControls';
import TextControls from '../canvas/TextControls';

const Customizer = () => {
  const snap = useSnapshot(state);

  // Hide the panel during intro
  if (snap.intro) return null;

  const downloadDesign = () => {
    if (snap.frontDecalUrl) {
      const link = document.createElement('a');
      link.download = 'pawprint-front.png';
      link.href = snap.frontDecalUrl;
      link.click();
    }
    setTimeout(() => {
      if (snap.backDecalUrl) {
        const link2 = document.createElement('a');
        link2.download = 'pawprint-back.png';
        link2.href = snap.backDecalUrl;
        link2.click();
      }
    }, 300);
  };

  const submitDesign = () => {
    const subject = "My Custom PawPrint T-Shirt Design";
    const body = `Hi PawPrint America,\n\nHere is my custom t-shirt design.\nFront and back attached.\nShirt color: ${snap.color}\n\nThank you!`;
    window.location.href = `mailto:print@pawprintamerica.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="absolute top-0 right-0 z-20 w-80 h-full bg-gray-900/95 backdrop-blur-md border-l border-red-600/30 overflow-hidden flex flex-col shadow-2xl">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-700 bg-gray-800">
        <h2 className="text-xl font-bold text-white">Customize Shirt</h2>
      </div>

      {/* Scrollable Controls */}
      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        {/* Shirt Color */}
        <div>
          <p className="text-gray-400 mb-3 text-sm font-medium">Shirt Color</p>
          <SketchPicker 
            color={snap.color} 
            onChange={(color) => state.color = color.hex} 
            disableAlpha
          />
        </div>

        {/* Logos */}
        <div>
          <p className="text-gray-400 mb-3 text-sm font-medium">Front & Back Logos</p>
          <LogoControls />
        </div>

        {/* Text */}
        <div>
          <p className="text-gray-400 mb-3 text-sm font-medium">Add Text (Front / Back)</p>
          <TextControls />
        </div>
      </div>

      {/* Compact buttons */}
      <div className="p-5 border-t border-gray-700 bg-gray-900/95 flex flex-col gap-3">
        <button 
          onClick={downloadDesign}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-semibold transition-all"
        >
          📥 Download Front & Back
        </button>
        <button 
          onClick={submitDesign}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold transition-all"
        >
          ✉️ Submit to PawPrint
        </button>
      </div>
    </div>
  );
};

export default Customizer;