import React, { useState, useEffect } from 'react';
import zmp from 'zmp-sdk';
import ReactDOM from 'react-dom/client';
import { NewsDetail, ProjectDetail } from '../components/DetailComponents';
import { openChat } from "zmp-sdk/apis";
import NewsPage from '../components/NewsPage';
import ProjectPage from '../components/ProjectPage';
import { followOA } from "zmp-sdk/apis";

import PricePage from '../components/PricePage'; 
import ImageDetail from '../components/ImageDetail';

// --- MOCK DATA & BANNERS ---
const MOCK_NEWS_DATA = [
  {
    id: 1,
    image: 'https://placehold.co/400x250/A3E635/1F2937?text=Tin+tuc+1',
    title: 'Tăng cường bảo mật với công nghệ AI tiên tiến',
    description: 'Khám phá cách trí tuệ nhân tạo đang cách mạng hóa các giải pháp bảo mật mạng, từ phát hiện mối đe dọa đến phòng ngừa tấn công mạng.',
    date: '25/06/2025',
    link: '#',
    content: '<p>Đây là nội dung chi tiết của bài viết số 1. Nó sẽ được hiển thị khi người dùng nhấp vào "Đọc thêm". Nội dung này có thể bao gồm nhiều đoạn văn, hình ảnh, và các yếu tố khác.</p><p>Công nghệ AI đang ngày càng trở nên quan trọng trong lĩnh vực bảo mật, giúp phát hiện và ngăn chặn các cuộc tấn công mạng một cách hiệu quả hơn.</p>'
  },
  {
    id: 2,
    image: 'https://placehold.co/400x250/22D3EE/1F2937?text=Tin+tuc+2',
    title: 'Điện toán đám mây: Xu hướng và cơ hội phát triển',
    description: 'Tìm hiểu về những lợi ích và thách thức khi triển khai các dịch vụ điện toán đám mây trong kỷ nguyên số hóa.',
    date: '24/06/2025',
    link: '#',
    content: '<p>Điện toán đám mây mang lại nhiều lợi ích như khả năng mở rộng, tiết kiệm chi phí và linh hoạt trong quản lý tài nguyên. Tuy nhiên, cũng có những thách thức về bảo mật và quản lý dữ liệu cần được quan tâm.</p>'
  },
];

const MOCK_PROJECT_DATA = [
  {
    id: 101,
    image: 'https://placehold.co/400x250/60A5FA/1F2937?text=Du+An+1',
    title: 'Thiết kế hệ thống điện thông minh cho Biệt thự cao cấp',
    description: 'Giải pháp tổng thể về điện thông minh, điều khiển ánh sáng, nhiệt độ, an ninh tự động hóa.',
    date: '15/05/2025',
    link: '#',
    content: '<p>Dự án này tập trung vào việc tích hợp các hệ thống điện thông minh hiện đại vào biệt thự cao cấp, bao gồm điều khiển ánh sáng tự động, hệ thống điều hòa nhiệt độ thông minh, và giải pháp an ninh toàn diện.</p>'
  },
];

const BANNERS = [
  'https://i.postimg.cc/zfGHvhBB/BANNER-NTM-1.webp',
  'https://i.postimg.cc/ydJJXz0C/BANNER-NTM-2.webp',
  'https://i.postimg.cc/TwZKtHcL/BANNER-NTM-3.webp',
];

// --- API FUNCTIONS ---
const WORDPRESS_BASE_URL = 'https://congnghentm.com/wp-json/wp/v2';
const getCongTrinhCategoryId = async () => {
  try {
    const response = await fetch(`${WORDPRESS_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} fetching categories or CORS issue.`);
    }
    const categories = await response.json();
    const congTrinhCategory = categories.find(cat => cat.slug === 'cong-trinh');
    if (congTrinhCategory) {
      console.log("Found 'Công trình' category ID:", congTrinhCategory.id);
      return congTrinhCategory.id;
    } else {
      console.warn("Category 'cong-trinh' not found on WordPress API. Please check the slug or create the category.");
      return 'NOT_FOUND';
    }
  } catch (error) {
      console.error("Error fetching categories:", error);
      console.warn("Falling back for projects due to category fetch error.");
      return 'FETCH_FAILED';
  }
};

const fetchNewsData = async (setNewsArticles, setFilteredNewsArticles, setLoadingNews, MOCK_NEWS_DATA) => {
  setLoadingNews(true);
  try {
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts?_embed&per_page=6`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} or CORS issue.`);
    }
    const data = await response.json();
    const formattedNews = data.map(post => ({
      id: post.id,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://placehold.co/400x250/ccc/000?text=${encodeURIComponent(post.title.rendered)}`,
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      date: new Date(post.date).toLocaleDateString('vi-VN'),
      link: post.link,
      content: post.content.rendered
    }));
    setNewsArticles(formattedNews);
    setFilteredNewsArticles(formattedNews);
    console.log("Successfully fetched news from WordPress API.");
  } catch (error) {
    console.error("Error fetching news from WordPress API:", error);
    console.warn("Falling back to mock data for news.");
    setNewsArticles(MOCK_NEWS_DATA);
    setFilteredNewsArticles(MOCK_NEWS_DATA);
  } finally {
    setLoadingNews(false);
  }
};

const fetchProjectsData = async (categoryId, setProjectArticles, setFilteredProjectArticles, setLoadingProjects, MOCK_PROJECT_DATA) => {
  setLoadingProjects(true);
  let apiUrl = '';
  if (typeof categoryId === 'number') {
    apiUrl = `${WORDPRESS_BASE_URL}/posts?categories=${categoryId}&_embed&per_page=6`;
    console.log("Fetching projects using category ID:", categoryId);
  } else {
    console.warn("Could not determine 'Công trình' category ID, using mock project data directly for projects.");
    setProjectArticles(MOCK_PROJECT_DATA);
    setFilteredProjectArticles(MOCK_PROJECT_DATA);
    setLoadingProjects(false);
    return;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} from project API or CORS issue.`);
    }
    const data = await response.json();
    const formattedProjects = data.map(post => ({
      id: post.id,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://placehold.co/400x250/ccc/000?text=${encodeURIComponent(post.title.rendered)}`,
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      date: new Date(post.date).toLocaleDateString('vi-VN'),
      link: post.link,
      content: post.content.rendered
    }));
    setProjectArticles(formattedProjects);
    setFilteredProjectArticles(formattedProjects);
    console.log("Successfully fetched project data with specific category.");
  } catch (error) {
    console.error("Error fetching project data:", error);
    console.warn("Falling back to mock data for projects due to API fetch error (e.g., CORS policy).");
    setProjectArticles(MOCK_PROJECT_DATA);
    setFilteredProjectArticles(MOCK_PROJECT_DATA);
  } finally {
    setLoadingProjects(false);
  }
};

// Main App component
const App = () => {
    // --- STATES ---
    const [newsArticles, setNewsArticles] = useState([]);
    const [filteredNewsArticles, setFilteredNewsArticles] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    const [projectArticles, setProjectArticles] = useState([]);
    const [filteredProjectArticles, setFilteredProjectArticles] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    const [congTrinhCategoryId, setCongTrinhCategoryId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [currentView, setCurrentView] = useState('home'); 
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [selectedArticleType, setSelectedArticleType] = useState(null);
    const [previousListView, setPreviousListView] = useState('home');
    const [loadingFollow, setLoadingFollow] = useState(false);
    const [isFollowingOA, setIsFollowingOA] = useState(false);
    
    // ĐOẠN 1: state cho việc hiển thị ảnh
    const [selectedImage, setSelectedImage] = useState(null);

    // --- HANDLERS & UTILITY FUNCTIONS ---
    const nextBanner = () => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    };

    const prevBanner = () => {
        setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + BANNERS.length) % BANNERS.length);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterArticles = () => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if (!lowerCaseSearchTerm) {
            setFilteredNewsArticles(newsArticles);
            setFilteredProjectArticles(projectArticles);
            return;
        }

        const filteredNews = newsArticles.filter(article =>
            article.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            article.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredNewsArticles(filteredNews);

        const filteredProjects = projectArticles.filter(project =>
            project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            project.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredProjectArticles(filteredProjects);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        filterArticles();
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleOpenLink = (url, type = 'external', id = null) => {
        if (type === 'external' || url.includes('zalo.me')) {
            if (zmp && zmp.openWebview) {
                zmp.openWebview({ url: url });
            } else {
                window.open(url, '_blank');
                console.warn("ZMP.openWebview not available, falling back to window.open.");
            }
        } else if (type === 'news' || type === 'project') {
            setPreviousListView(currentView);
            setCurrentView(`${type}Detail`);
            setSelectedArticleId(id);
            setSelectedArticleType(type);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentView === 'priceDetail') {
            setCurrentView('price');
        } else {
            setCurrentView(previousListView);
        }
        setSelectedArticleId(null);
        setSelectedArticleType(null);
        if (zmp && zmp.setNavigationBarTitle) {
            let title = "Công Nghệ NTM";
            if (previousListView === 'news') {
                title = "Tin tức";
            } else if (previousListView === 'projects') {
                title = "Công trình";
            } else if (previousListView === 'price') {
                title = "Bảng giá";
            }
            zmp.setNavigationBarTitle({ title: title });
        }
    };
    
    // MODIFIED: handleBackToHome now uses previousListView
  const handleBackToHome = () => {
    setCurrentView(previousListView); // Go back to the previously stored list view
    setSelectedArticleId(null);
    setSelectedArticleType(null);
    if (zmp && zmp.setNavigationBarTitle) {
      // Set title based on previousListView
      let title = "Công Nghệ NTM";
      if (previousListView === 'news') {
        title = "Tin tức";
      } else if (previousListView === 'projects') {
        title = "Công trình";
      }
      zmp.setNavigationBarTitle({ title: title });
    }
  };

    const handleOpenZaloChat = async () => {
        try {
            await openChat({
                type: "oa",
                id: "3476907513037791885",
                message: `Xin chào NTM`,
            });
        } catch (error) {
            console.error("Lỗi khi mở chat Zalo từ thanh điều hướng:", error);
        }
    };

    const handleFollowOA = async () => {
        if (isFollowingOA || loadingFollow) return;
        setLoadingFollow(true);

        try {
            followOA({
                id: "3476907513037791885",
                success: (res) => {
                    console.log("Yêu cầu quan tâm OA thành công!", res);
                    setIsFollowingOA(true);
                },
                fail: (err) => {
                    console.error("Yêu cầu quan tâm OA thất bại:", err);
                },
                complete: () => {
                    setLoadingFollow(false);
                }
            });
        } catch (error) {
            console.error("Lỗi khi gọi API followOA:", error);
            setLoadingFollow(false);
        }
    };

    const handleManageOAFollow = () => {
        try {
            openChat({
                type: "oa",
                id: "3476907513037791885",
                message: `Xin chào NTM`,
            });
        } catch (error) {
            console.error("Lỗi khi mở chat với OA:", error);
        }
    };

    // ĐOẠN 2: Hàm xử lý khi mở ảnh
    const handleOpenImage = (imageUrls) => {
      setPreviousListView(currentView);
      setCurrentView('imageDetail');
      setSelectedImage(imageUrls);
      window.scrollTo(0, 0);
    };

    // --- EFFECTS ---
    useEffect(() => {
        const interval = setInterval(nextBanner, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        zmp.getSetting({
            success: (data) => {
                if (data.authSetting['scope.notification']) {
                    setIsFollowingOA(true);
                }
            },
            fail: (error) => {
                console.log("Không thể kiểm tra cài đặt:", error);
            }
        });
    }, []);

    useEffect(() => {
        getCongTrinhCategoryId().then(id => setCongTrinhCategoryId(id));
        fetchNewsData(setNewsArticles, setFilteredNewsArticles, setLoadingNews, MOCK_NEWS_DATA);
    }, []);

    useEffect(() => {
        if (congTrinhCategoryId !== null) {
            if (typeof congTrinhCategoryId === 'number') {
                fetchProjectsData(congTrinhCategoryId, setProjectArticles, setFilteredProjectArticles, setLoadingProjects, MOCK_PROJECT_DATA);
            } else {
                setProjectArticles(MOCK_PROJECT_DATA);
                setFilteredProjectArticles(MOCK_PROJECT_DATA);
                setLoadingProjects(false);
            }
        }
    }, [congTrinhCategoryId]);

    useEffect(() => {
        filterArticles();
    }, [searchTerm, newsArticles, projectArticles]);

    useEffect(() => {
        if (searchTerm && currentView === 'home') {
            if (filteredNewsArticles.length > 0) {
                scrollToSection('news-section');
            } else if (filteredProjectArticles.length > 0) {
                scrollToSection('projects-section');
            }
        }
    }, [filteredNewsArticles, filteredProjectArticles, searchTerm, currentView]);

    useEffect(() => {
        if (zmp && zmp.setNavigationBarTitle) {
            if (currentView === 'home') {
                zmp.setNavigationBarTitle({ title: "Công Nghệ NTM" });
            } else if (currentView === 'news') {
                zmp.setNavigationBarTitle({ title: "Tin tức" });
            } else if (currentView === 'projects') {
                zmp.setNavigationBarTitle({ title: "Công trình" });
            } else if (currentView === 'price') {
                zmp.setNavigationBarTitle({ title: "Bảng giá" });
            }
        }
    }, [currentView]);

    // Conditional Rendering for different pages
    if (currentView === 'newsDetail') {
        return <NewsDetail newsId={selectedArticleId} onBack={handleBackToHome} />;
    }

    if (currentView === 'projectDetail') {
        return <ProjectDetail projectId={selectedArticleId} onBack={handleBackToHome} />;
    }

    if (currentView === 'news') {
        return (
            <NewsPage
                newsArticles={filteredNewsArticles}
                loadingNews={loadingNews}
                handleOpenLink={handleOpenLink}
                onBack={handleBackToHome}
                currentView={currentView}
                selectedArticleId={selectedArticleId}
                setCurrentView={setCurrentView}
                scrollToSection={scrollToSection}
                handleOpenZaloChat={handleOpenZaloChat}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
            />
        );
    }

    if (currentView === 'projects') {
        return (
            <ProjectPage
                projectArticles={filteredProjectArticles}
                loadingProjects={loadingProjects}
                handleOpenLink={handleOpenLink}
                onBack={handleBackToHome}
                currentView={currentView}
                selectedArticleId={selectedArticleId}
                setCurrentView={setCurrentView}
                scrollToSection={scrollToSection}
                handleOpenZaloChat={handleOpenZaloChat}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
            />
        );
    }
    
    // ĐOẠN 3: Logic render trang Bảng giá và xem ảnh
    if (currentView === 'price') {
        return <PricePage 
    onOpenImage={handleOpenImage} 
    onBack={handleBack}  
    currentView={currentView} 
    setCurrentView={setCurrentView}
    handleOpenZaloChat={handleOpenZaloChat}/>;
    }

    if (currentView === 'imageDetail') {
        return <ImageDetail 
    imageUrls={selectedImage} 
    onBack={handleBack} 
    currentView={currentView} 
    setCurrentView={setCurrentView}
    handleOpenZaloChat={handleOpenZaloChat}/>;
    }
  
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800 pb-16">
            {/* --- TOP BAR SECTION (Logo and Search Bar) --- */}
            <header className="bg-white shadow-md p-4 sticky top-0 z-50 pt-8 ">
                <div className="container mx-auto flex flex-col items-center px-4">
                    <div className="flex justify-between items-center w-full mb-2">
                        <img
                            src="https://i.postimg.cc/KY4qLJv3/Logo.jpg"
                            alt="NTM Logo"
                            className="h-10 w-auto"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/120x48/ccc/000?text=NTM+Logo`; }}
                        />
                    </div>
                </div>
            </header>
        
            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-grow container mx-auto p-4 md:p-8">
                {/* Banner Carousel Section */}
                <section className="relative w-full mx-auto overflow-hidden mb-8 rounded-lg shadow-lg">
                    <div className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}>
                        {BANNERS.map((banner, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <img
                                    src={banner}
                                    alt={`Banner ${index + 1}`}
                                    className="w-full h-auto max-h-[44rem] lg:max-h-[56rem] object-cover rounded-lg"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1200x600/ccc/000?text=Image+Error`; }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevBanner}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md hover:bg-opacity-75 transition-colors focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextBanner}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-md hover:bg-opacity-75 transition-colors focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {BANNERS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentBannerIndex(index)}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                    currentBannerIndex === index ? 'bg-white' : 'bg-gray-400'
                                }`}
                            ></button>
                        ))}
                    </div>
                </section>

                {/* Secondary Navigation Bar (Service Grid) */}
                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <div className="container mx-auto flex flex-wrap justify-around items-center text-center">
                        <div className="flex flex-col items-center p-2 w-1/2 md:w-1/4">
                            <img
                                src="https://i.postimg.cc/htRQVjDL/1.png"
                                alt="Giao Hàng"
                                className="h-12 w-12 mb-2"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/ccc/000?text=Icon`; }}
                            />
                            <span className="text-blue-600 font-semibold text-sm md:text-base">Giao Hàng Toàn Quốc</span>
                            <span className="text-gray-500 text-xs md:text-sm">Ưu đãi Phí vận chuyển</span>
                        </div>
                        <div className="flex flex-col items-center p-2 w-1/2 md:w-1/4">
                            <img
                                src="https://i.postimg.cc/FHbdp4z2/2.png"
                                alt="Hỗ trợ tư vấn"
                                className="h-12 w-12 mb-2"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/ccc/000?text=Icon`; }}
                            />
                            <span className="text-blue-600 font-semibold text-sm md:text-base">Hỗ trợ tư vấn</span>
                            <span className="text-gray-500 text-xs md:text-sm">(028) 6685 3655</span>
                        </div>
                        <div className="flex flex-col items-center p-2 w-1/2 md:w-1/4">
                            <img
                                src="https://i.postimg.cc/nLHswPQM/3.png"
                                alt="Liên hệ"
                                className="h-12 w-12 mb-2"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/ccc/000?text=Icon`; }}
                            />
                            <span className="text-blue-600 font-semibold text-sm md:text-base">Liên hệ với chúng tôi</span>
                            <span className="text-gray-500 text-xs md:text-sm">Trả lời trong vòng 1-2h</span>
                        </div>
                        <div className="flex flex-col items-center p-2 w-1/2 md:w-1/4">
                            <img
                                src="https://i.postimg.cc/bvCQ0hFq/4.png"
                                alt="Nhận hàng"
                                className="h-12 w-12 mb-2"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/ccc/000?text=Icon`; }}
                            />
                            <span className="text-blue-600 font-semibold text-sm md:text-base">Nhận hàng</span>
                            <span className="text-gray-500 text-xs md:text-sm">Thanh toán</span>
                        </div>
                    </div>
                </section>
                {/* --- KHU VỰC QUAN TÂM OA --- */}
                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <p className="text-sm text-gray-500 mb-4">OA chính thức của chúng tôi</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src="https://i.postimg.cc/KY4qLJv3/Logo.jpg"
                                alt="OA Logo"
                                className="h-12 w-13"
                            />
                            <div className="ml-4">
                                <p className="font-semibold text-gray-900">Giải Pháp Công Nghệ NTM</p>
                                <p className="text-xs text-gray-500">Official Account</p>
                            </div>
                        </div>

                        {isFollowingOA ? (
                            <button
                                onClick={handleManageOAFollow}
                                className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg text-sm border border-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                Đã quan tâm
                            </button>
                        ) : (
                            <button
                                onClick={handleFollowOA}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                            >
                                Quan tâm
                            </button>
                        )}
                    </div>
                </section>
                {/* About Us Section (New Section) */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 id="about-us-section" className="text-3xl font-bold text-gray-900 mb-6 text-center scroll-mt-20">Về chúng tôi</h2>
                    <div className="text-gray-700 leading-relaxed text-base">
                        <p className="mb-4">
                            Công Ty Giải Pháp Công Nghệ NTM được thành lập ngày 12/11/2014 là đơn vị chuyên nghiệp trong lĩnh vực nhập khẩu và phân phối các thiết bị điện cao cấp ứng dụng trong dân dụng, công nghiệp và thương mại.
                        </p>
                        <p className="mb-4">
                            Hiện đang hợp tác với các nhà sản xuất và nhập khẩu thiết bị điện hàng đầu tại Việt Nam. Chúng tôi chuyên cung cấp các thiết bị điện cao cấp Legrand tại Việt Nam.
                        </p>
                        <p>
                            Với phương châm đem đến cho Quý đại lý, quý khách hàng những sản phẩm tốt, giá cả cạnh tranh, dịch vụ giao hàng và bảo hành chu đáo.
                        </p>
                    </div>
                </section>
            </main>

            {/* --- FOOTER SECTION - Contact Information --- */}
            <footer id="footer-section" className="bg-gray-800 text-white py-8 scroll-mt-20">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-4">Công Nghệ NTM</h4>
                        <p className="text-gray-400 text-sm">
                            Công nghệ NTM là nhà cung cấp thiết bị điện dân dụng và công nghiệp – Hiện đang hợp tác với các nhà sản xuất và nhập khẩu thiết bị điện hàng đầu tại Việt Nam. Chuyên cung cấp các thiết bị điện cao cấp Legrand tại Việt Nam.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-4">Thông tin liên hệ</h4>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li>
                                <strong className="text-white">Địa chỉ:</strong> Số 04 Bình Lợi, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh
                            </li>
                            <li>
                                <strong className="text-white">Điện thoại:</strong>  (84) 028 6685 3655
                            </li>
                            <li>
                                <strong className="text-white">Email:</strong> info@congnghentm.com
                            </li>
                            <li>
                                <strong className="text-white">Giờ làm việc:</strong> T2 - T7: 8:30 AM - 6:00 PM
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
                    © 2025 Công Nghệ NTM. Bảo lưu mọi quyền.
                </div>
            </footer>

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
                >   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
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

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}

export default App;