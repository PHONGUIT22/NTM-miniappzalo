// ProjectPage.js
import React, { useEffect } from 'react';
import { ProjectDetail } from './DetailComponents'; // Đã sửa đường dẫn
import { openChat } from "zmp-sdk/apis";

const ProjectPage = ({
  projectArticles, // This will be the filtered list from App.js
  loadingProjects,
  handleOpenLink,
  onBack,
  currentView,
  selectedArticleId,
  setCurrentView,
  scrollToSection,
  handleOpenZaloChat,
  searchTerm,
  handleSearchChange,
  handleSearchSubmit
}) => {
  useEffect(() => {
    console.log('ProjectPage rendered. Current searchTerm:', searchTerm, 'Project articles count:', projectArticles.length);
  }, [searchTerm, projectArticles]);

  if (currentView === 'projectDetail') {
    return <ProjectDetail projectId={selectedArticleId} onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800 pb-16">
      <header className="bg-white shadow-md p-4 sticky top-0 z-50 pt-8">
        <div className="container mx-auto flex flex-col items-center px-4">
          <div className="flex justify-between items-center w-full mb-2">
            <img
              src="https://i.postimg.cc/KY4qLJv3/Logo.jpg"
              alt="NTM Logo"
              className="h-10 w-auto"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/120x48/ccc/000?text=NTM+Logo`; }}
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-4">Công trình</h1>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full mt-4">
            <input
              type="text"
              placeholder="Tìm kiếm công trình..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-sm"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-blue-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 gap-4 mb-12">
          {loadingProjects ? (
            <p className="col-span-full text-center text-gray-600">Đang tải công trình...</p>
          ) : projectArticles.length > 0 ? (
            projectArticles.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden flex items-center p-4 transform transition-transform hover:scale-105">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 object-cover object-center rounded-lg mr-4 flex-shrink-0"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/ccc/000?text=Image+Error`; }}
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.date}</p>
                  <button
                    onClick={() => { console.log('View Details clicked for project ID:', project.id); handleOpenLink(project.link, 'project', project.id); }}
                    className="text-blue-600 hover:underline font-medium cursor-pointer text-sm mt-2"
                  >
                    Xem chi tiết &rarr;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-red-600">Không tìm thấy công trình nào phù hợp.</p>
          )}
        </div>
      </main>

      {/* --- BOTTOM NAVIGATION BAR (Main Navigation Links) --- */}
      // BOTTOM NAVIGATION BAR (Main Navigation Links)
{/* --- BOTTOM NAVIGATION BAR (Main Navigation Links) --- */}
          {/* --- BOTTOM NAVIGATION BAR (Main Navigation Links) --- */}
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
    </div>
  );
};

export default ProjectPage;