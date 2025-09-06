import React from 'react';

const priceItems = [
    
    {
        id: 2,
        title: "BẢNG GIÁ CÔNG TẮC Ổ CẮM OBRIA",
        images: [
            "https://i.postimg.cc/D0XXDTjZ/BANG-GIA-OBRIA-LEGRAND-VN-page-0001.jpg",
            "https://i.postimg.cc/s2T7GKGV/BANG-GIA-OBRIA-LEGRAND-VN-page-0002.jpg",
            "https://i.postimg.cc/vBD9r955/BANG-GIA-OBRIA-LEGRAND-VN-page-0003.jpg",
            "https://i.postimg.cc/tTf62Tzw/BANG-GIA-OBRIA-LEGRAND-VN-page-0004.jpg",
            "https://i.postimg.cc/XX6C6zmg/BANG-GIA-OBRIA-LEGRAND-VN-page-0005.jpg",
            "https://i.postimg.cc/NG5ZNjt4/BANG-GIA-OBRIA-LEGRAND-VN-page-0006.jpg",
            "https://i.postimg.cc/bYWW4fNj/BANG-GIA-OBRIA-LEGRAND-VN-page-0007.jpg",
            "https://i.postimg.cc/VLtp8Zd0/BANG-GIA-OBRIA-LEGRAND-VN-page-0008.jpg",
            "https://i.postimg.cc/wjcrtt56/BANG-GIA-OBRIA-LEGRAND-VN-page-0009.jpg",
            "https://i.postimg.cc/3xH6JjvS/BANG-GIA-OBRIA-LEGRAND-VN-page-0010.jpg",
        ]
    },
    {
        id: 3,
        title: "BẢNG GIÁ CÔNG TẮC Ổ CẮM ELOE",
        images: [ 
            "https://i.postimg.cc/WzJh1ckk/BANG-GIA-LEGRAND-ELOE-LEGRAND-VN-page-0001.jpg",
            "https://i.postimg.cc/FR6YvH7v/BANG-GIA-LEGRAND-ELOE-LEGRAND-VN-page-0002.jpg"
            
        ]
    },
    {
        id: 4,
        title: "BẢNG GIÁ CÔNG TẮC Ổ CẮM LIVING NOW",
        images: [ 
            "https://i.postimg.cc/Kztt0T0V/lvingnow-page-0001.jpg",
            "https://i.postimg.cc/0jxDFN3N/lvingnow-page-0002.jpg",
            "https://i.postimg.cc/PqgmbyQY/lvingnow-page-0003.jpg",
            "https://i.postimg.cc/0NMYJFD9/lvingnow-page-0004.jpg",
            "https://i.postimg.cc/MHDVSS2m/lvingnow-page-0005.jpg",
            "https://i.postimg.cc/J7cbJbDH/lvingnow-page-0006.jpg",
            "https://i.postimg.cc/qMJ2Gzyb/lvingnow-page-0007.jpg",
            "https://i.postimg.cc/X7sd14gV/lvingnow-page-0008.jpg",
            "https://i.postimg.cc/FHqcmpq8/lvingnow-page-0009.jpg",
            "https://i.postimg.cc/nhM76gdq/lvingnow-page-0010.jpg",
        ]
    },
    {
        id: 1,
        title: "Bảng giá công tắc ổ cắm Mallia Senses Legrand",
        images: [ 
            "https://i.postimg.cc/qRHGMrzG/BANG-GIA-MALLIA-SENSES-LEGRAND-VN-page-0001.jpg",
            "https://i.postimg.cc/j564D1fY/BANG-GIA-MALLIA-SENSES-LEGRAND-VN-page-0002.jpg",
            "https://i.postimg.cc/1X9cwK0n/BANG-GIA-MALLIA-SENSES-LEGRAND-VN-page-0003.jpg"
            
        ]
    },
    {
        id: 5,
        title: "Bảng giá công tắc ổ cắm BELANKO",
        images: [ 
            "https://i.postimg.cc/k4ZqtjPw/BANG-GIA-BELANKO-S-LEGRAND-VN-page-0001.jpg",
            "https://i.postimg.cc/V5PwKd6C/BANG-GIA-BELANKO-S-LEGRAND-VN-page-0002.jpg",
            "https://i.postimg.cc/kGb9NxnC/BANG-GIA-BELANKO-S-LEGRAND-VN-page-0003.jpg",
            "https://i.postimg.cc/BZL17kbS/BANG-GIA-BELANKO-S-LEGRAND-VN-page-0004.jpg"
            
        ]
    },
    {
        id: 6,
        title: "Bảng giá công tắc ổ cắm GALION",
        images: [ 
            "https://i.postimg.cc/3rSDt7Yb/BANG-GIA-GALION-LEGRAND-VN-page-0001.jpg",
            "https://i.postimg.cc/bNZSMMvY/BANG-GIA-GALION-LEGRAND-VN-page-0002.jpg",
            "https://i.postimg.cc/P5ZpfwZB/BANG-GIA-GALION-LEGRAND-VN-page-0003.jpg",
            "https://i.postimg.cc/15bVZHgG/BANG-GIA-GALION-LEGRAND-VN-page-0004.jpg",
            "https://i.postimg.cc/9fYDZHLb/BANG-GIA-GALION-LEGRAND-VN-page-0005.jpg"
            
        ]
    },
    
];

const PricePage =  ({ onOpenImage, onBack, currentView, setCurrentView, handleOpenZaloChat }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4 pb-20">
                <header className="flex justify-between items-center mb-6">
                    
                    <div></div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {priceItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => onOpenImage(item.images)}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className="w-full h-48 object-cover object-top"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Thêm đoạn mã navbar vào đây */}
            {/* --- BOTTOM NAVIGATION BAR (Main Navigation Links) --- */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around items-center z-50 border-t border-gray-200 md:hidden">
                <button
                    onClick={() => setCurrentView('home')}
                    className={`flex flex-col items-center font-medium text-xs sm:text-sm px-1 py-1 rounded-md transition-colors duration-200 flex-1 ${
                        currentView === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Trang chủ
                </button>                            
                {/* Button for Price Page */}
                <button
                    onClick={() => setCurrentView('price')}
                    className={`flex flex-col items-center font-medium text-xs sm:text-sm px-1 py-1 rounded-md transition-colors duration-200 flex-1 ${
                        currentView === 'price' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth={2}
       strokeLinecap="round" strokeLinejoin="round"
       className="h-6 w-6 mb-1" aria-hidden="true">
    <path d="M6 6h15l-1.5 9h-11z" />
    <path d="M6 6L4 2H2" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </svg>
                    Bảng giá
                </button>
                <button
                    onClick={() => setCurrentView('projects')}
                    className={`flex flex-col items-center font-medium text-xs sm:text-sm px-1 py-1 rounded-md transition-colors duration-200 flex-1 ${
                        currentView === 'projects' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v1m12 0v1m-3-1v1m-3-1v1" />
                    </svg>
                    Công trình
                </button>
                <button
                    onClick={() => setCurrentView('news')}
                    className={`flex flex-col items-center font-medium text-xs sm:text-sm px-1 py-1 rounded-md transition-colors duration-200 flex-1 ${
                        currentView === 'news' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m-3 4H7m6 0H7m6 0v-4m0 0H7m6 0V6" />
                    </svg>
                    Tin tức
                </button>
                {/* Button Zalo Chat */}
                <button
                    onClick={handleOpenZaloChat}
                    className="flex flex-col items-center text-gray-700 hover:text-blue-600 font-medium text-xs sm:text-sm px-1 py-1 rounded-md transition-colors duration-200 flex-1"
                >
                    <img
                        src="https://i.postimg.cc/yYX3R9zq/images.png"
                        alt="Zalo Chat"
                        className="h-6 w-6 mb-1 object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/24x24/ccc/000?text=Zalo`; }}
                    />
                    Zalo Chat
                </button>
            </nav>
        </>
    );
};

export default PricePage;