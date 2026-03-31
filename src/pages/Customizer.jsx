import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { SketchPicker } from 'react-color';
import LogoControls from '../canvas/LogoControls';
import TextControls from '../canvas/TextControls';

const Customizer = () => {
  const snap = useSnapshot(state);

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
    <div className="h-full flex flex-col bg-gray-900/95 backdrop-blur-md border-l border-red-600/30 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Customize Your Shirt</h2>
        <p className="text-gray-400 text-sm mt-1">Upload logos, add text, choose color</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Shirt Color */}
        <div>
          <p className="text-gray-400 mb-3">Shirt Color</p>
          <SketchPicker 
            color={snap.color} 
            onChange={(color) => state.color = color.hex} 
          />
        </div>

        {/* Logo Upload & Controls */}
        <div>
          <p className="text-gray-400 mb-3">Front & Back Logos</p>
          <LogoControls />
        </div>

        {/* Text Controls */}
        <div>
          <p className="text-gray-400 mb-3">Add Text (Front / Back)</p>
          <TextControls />
        </div>
      </div>

      {/* Fixed Action Buttons at Bottom - No Scroll Needed */}
      <div className="p-6 border-t border-gray-700 bg-gray-900/95 flex flex-col gap-3">
        <button 
          onClick={downloadDesign}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-semibold text-base transition-all active:scale-95"
        >
          📥 Download Front + Back PNGs
        </button>

        <button 
          onClick={submitDesign}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold text-base transition-all active:scale-95"
        >
          ✉️ Submit Design via Email
        </button>
      </div>
    </div>
  );
};

export default Customizer;