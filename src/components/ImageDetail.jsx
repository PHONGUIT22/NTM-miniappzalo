import React, { useState } from 'react';

const ImageDetail = ({ imageUrls, onBack, currentView, setCurrentView, handleOpenZaloChat }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [initialDistance, setInitialDistance] = useState(0);
    const [initialZoom, setInitialZoom] = useState(1);

    const handleOpenImage = (url) => {
        setSelectedImage(url);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const handleStart = (e) => {
        e.preventDefault();
        if (e.touches && e.touches.length === 2) { 
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            setInitialDistance(distance);
            setInitialZoom(zoomLevel);
        } else if (e.touches && e.touches.length === 1) { 
            setIsPanning(true);
            setStartPoint({ x: e.touches[0].clientX - panPosition.x, y: e.touches[0].clientY - panPosition.y });
        } else if (e.button === 0) { 
            setIsPanning(true);
            setStartPoint({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
        }
    };

    const handleMove = (e) => {
        if (e.touches && e.touches.length === 2) { 
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const newDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            let newZoom = (newDistance / initialDistance) * initialZoom;
            newZoom = Math.max(1, Math.min(newZoom, 3)); 
            setZoomLevel(newZoom);
        } else if (isPanning) { 
            e.preventDefault();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            setPanPosition({
                x: clientX - startPoint.x,
                y: clientY - startPoint.y,
            });
        }
    };

    const handleEnd = () => {
        setIsPanning(false);
    };

    if (selectedImage) {
        return (
            <>
                <div 
                    className="min-h-screen bg-gray-900 flex flex-col items-center relative overflow-hidden"
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                >
                    <header className="w-full flex justify-start p-4 bg-gray-800 shadow-md z-10 sticky top-0 pt-8">
                        <button onClick={handleCloseImage} className="text-blue-400 font-semibold text-lg">
                            &larr; Quay lại
                        </button>
                    </header>
                    <div className="flex-grow w-full h-full relative flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="Bảng giá chi tiết"
                            style={{
                                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                                touchAction: 'none'
                            }}
                            className="transition-transform duration-100 ease-in-out cursor-grab active:cursor-grabbing max-w-full max-h-full"
                        />
                    </div>
                </div>
               
            </>
        );
    }
    
    return (
        <>
            <div className="min-h-screen bg-gray-900 flex flex-col items-center">
                <header className="w-full flex justify-start p-4 bg-gray-800 shadow-md z-10 sticky top-0 pt-8">
                    <button onClick={onBack} className="text-blue-400 font-semibold text-lg">
                        &larr; Quay lại
                    </button>
                </header>
                <div className="w-full flex flex-col items-center flex-grow p-2">
                    {imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Bảng giá chi tiết trang ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg shadow-xl mb-4 cursor-pointer"
                            onClick={() => handleOpenImage(url)}
                        />
                    ))}
                </div>
            </div>
            
        </>
    );
};

export default ImageDetail;