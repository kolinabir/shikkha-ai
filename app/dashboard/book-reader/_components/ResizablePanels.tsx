"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ResizablePanelsProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultLeftWidth?: number; // percentage
  minLeftWidth?: number; // percentage
  minRightWidth?: number; // percentage
  rightPanelVisible?: boolean;
}

export default function ResizablePanels({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 70,
  minLeftWidth = 30,
  minRightWidth = 20,
  rightPanelVisible = true,
}: ResizablePanelsProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      const clampedWidth = Math.max(
        minLeftWidth,
        Math.min(100 - minRightWidth, newLeftWidth)
      );

      setLeftWidth(clampedWidth);
    },
    [isResizing, minLeftWidth, minRightWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="flex h-full w-full relative">
      {/* Left Panel */}
      <div
        className="h-full overflow-hidden"
        style={{ width: rightPanelVisible ? `${leftWidth}%` : '100%' }}
      >
        {leftPanel}
      </div>

      {/* Resizer */}
      {rightPanelVisible && (
        <div
          onMouseDown={handleMouseDown}
          className={`relative group ${
            isResizing ? 'bg-indigo-500' : ''
          }`}
          style={{ width: '4px', minWidth: '4px' }}
        >
          <div className="absolute inset-0 bg-gray-300 hover:bg-indigo-500 cursor-col-resize transition-colors" />
          <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />
        </div>
      )}

      {/* Right Panel */}
      {rightPanelVisible && (
        <div
          className="h-full overflow-hidden bg-white border-l border-gray-200"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {rightPanel}
        </div>
      )}
    </div>
  );
}

