import React, { useState, useEffect } from 'react';
import zmp from 'zmp-sdk';
import { openChat } from 'zmp-sdk/apis';

// --- MOCK DATA ---
const MOCK_NEWS_DATA = [
  {
    id: 1,
    image: 'https://placehold.co/400x250/A3E635/1F2937?text=Tin+tuc+1',
    title: 'Tăng cường bảo mật với công nghệ AI tiên tiến',
    description: 'Khám phá cách trí tuệ nhân tạo đang cách mạng hóa các giải pháp bảo mật mạng, từ phát hiện mối đe dọa đến phòng ngừa tấn công mạng.',
    date: '25/06/2025',
    link: '#',
    content: '<p>Đây là nội dung chi tiết của bài viết số 1. Nó sẽ được hiển thị khi người dùng nhấp vào "Đọc thêm". Nội dung này có thể bao gồm nhiều đoạn văn, hình ảnh, và các yếu tố khác.</p><p>Công nghệ AI đang ngày càng trở nên quan trọng trong lĩnh vực bảo mật, giúp phát hiện và ngăn chặn các cuộc tấn công mạng một cách hiệu quả hơn. <a href="https://external-link.com/news1">Xem thêm về bảo mật AI</a></p><p>Website: Xem Thêm</p><p>&#9654;</p><p>&#9654;</p><img src="https://congnghentm.com/wp-content/uploads/2023/12/z4942911762112_fb305c44154c14777d174786766461a3.jpg" alt="Example Wide Image" style="width: 1200px; height: auto;"><p>Email: info@congnghentm.com</p>'
  },
  {
    id: 2,
    image: 'https://placehold.co/400x250/22D3EE/1F2937?text=Tin+tuc+2',
    title: 'Điện toán đám mây: Xu hướng và cơ hội phát triển',
    description: 'Tìm hiểu về những lợi ích và thách thức khi triển khai các dịch vụ điện toán đám mây trong kỷ nguyên số hóa.',
    date: '24/06/2025',
    link: '#',
    content: '<p>Điện toán đám mây mang lại nhiều lợi ích như khả năng mở rộng, tiết kiệm chi phí và linh hoạt trong quản lý tài nguyên. Tuy nhiên, cũng có những thách thức về bảo mật và quản lý dữ liệu cần được quan tâm. <a href="https://external-link.com/cloud">Tìm hiểu thêm</a></p>'
  },
  {
    id: 3,
    image: 'https://placehold.co/400x250/FACC15/1F2937?text=Tin+tuc+3',
    description: 'Tổng quan về React Native và cách nó giúp các nhà phát triển tạo ra ứng dụng hiệu quả cho cả iOS và Android.',
    date: '23/06/2025',
    link: '#',
    content: '<p>React Native cho phép các nhà phát triển xây dựng ứng dụng di động bằng JavaScript, giúp tiết kiệm thời gian và công sức so với việc phát triển ứng dụng riêng biệt cho từng nền tảng.</p>'
  },
  {
    id: 4,
    image: 'https://placehold.co/400x250/C084FC/1F2937?text=Tin+tuc+4',
    title: 'Thực tế ảo tăng cường (AR) trong giáo dục và đào tạo',
    description: 'Xem xét tiềm năng của công nghệ thực tế ảo trong việc biến đổi trải nghiệm học tập và đào tạo.',
    date: '22/06/2025',
    link: '#',
    content: '<p>AR có thể tạo ra các môi trường học tập tương tác và sống động, giúp học sinh và sinh viên tiếp thu kiến thức một cách hiệu quả hơn. Công nghệ này cũng có tiềm năng lớn trong đào tạo nghề và mô phỏng thực tế.</p>'
  },
  {
    id: 5,
    image: 'https://placehold.co/400x250/FB923C/1F2937?text=Tin+tuc+5',
    title: 'Blockchain: Hơn cả tiền điện tử',
    description: 'Khám khám phá các ứng dụng đa dạng của công nghệ blockchain ngoài lĩnh vực tiền tệ, bao gồm quản lý chuỗi cung ứng và bỏ phiếu điện tử.',
    date: '21/06/2025',
    link: '#',
    content: '<p>Blockchain không chỉ giới hạn trong tiền điện tử. Khả năng ghi lại giao dịch an toàn và minh bạch của nó đang được áp dụng trong nhiều lĩnh vực như quản lý chuỗi cung ứng, y tế, và bỏ phiếu điện tử, mang lại sự tin cậy và hiệu quả.</p>'
  },
  {
    id: 6,
    image: 'https://placehold.co/400x250/BEF264/1F2937?text=Tin+tuc+6',
    title: 'Big Data và phân tích dữ liệu lớn trong kinh doanh',
    description: 'Tầm quan trọng của dữ liệu lớn và các công cụ phân tích để đưa ra quyết định kinh doanh thông minh hơn.',
    date: '20/06/2025',
    link: '#',
    content: '<p>Big Data và phân tích dữ liệu lớn đang trở thành yếu tố then chốt giúp các doanh nghiệp đưa ra quyết định dựa trên dữ liệu, tối ưu hóa hoạt động và khám phá những cơ hội mới trên thị trường cạnh tranh. <a href="https://external-link.com/bigdata">Đọc thêm về Big Data</a></p>'
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
    content: '<p>Dự án này tập trung vào việc tích hợp các hệ thống điện thông minh hiện đại vào biệt thự cao cấp, bao gồm điều khiển ánh sáng tự động, hệ thống điều hòa nhiệt độ thông minh, và giải pháp an ninh toàn diện. <a href="https://external-link.com/project1">Xem thêm dự án này</a></p><p>Website: Xem Thêm</p><p>&#9654; </p><p>&#9654; </p><img src="https://congnghentm.com/wp-content/uploads/2023/12/z4942911762112_fb305c44154c14777d174786766461a3.jpg" alt="Example Wide Image" style="width: 1200px; height: auto;"><p>Email: info@congnghentm.com</p>'
  },
  {
    id: 102,
    image: 'https://placehold.co/400x250/34D399/1F2937?text=Du+An+2',
    title: 'Lắp đặt hạ tầng mạng cho Tòa nhà văn phòng hiện đại',
    description: 'Cung cấp và triển khai hệ thống mạng LAN/WAN hiệu suất cao, đảm bảo kết nối ổn định cho hàng trăm người dùng.',
    date: '10/05/2025',
    link: '#',
    content: '<p>Chúng tôi đã triển khai một hạ tầng mạng robust và hiệu suất cao cho tòa nhà văn phòng, đảm bảo kết nối internet ổn định và nhanh chóng cho tất cả các phòng ban và nhân viên, hỗ trợ hiệu quả các hoạt động kinh doanh.</p>'
  },
  {
    id: 103,
    image: 'https://placehold.co/400x250/FBBF24/1F2937?text=Du+An+3',
    title: 'Triển khai giải pháp camera an ninh AI cho Chuỗi cửa hàng',
    description: 'Hệ thống camera tích hợp AI nhận diện khuôn mặt, phát hiện chuyển động bất thường, tăng cường bảo mật.',
    date: '01/05/2025',
    link: '#',
    content: '<p>Giải pháp camera an ninh tích hợp trí tuệ nhân tạo đã được triển khai cho chuỗi cửa hàng, giúp tăng cường khả năng giám sát, phát hiện sớm các hành vi đáng ngờ và cung cấp dữ liệu quan trọng cho việc phân tích an ninh. <a href="https://external-link.com/project3">Chi tiết về giải pháp</a></p>'
  },
];

// --- API FUNCTIONS ---
const WORDPRESS_BASE_URL = 'https://congnghentm.com/wp-json/wp/v2';

const fetchSinglePost = async (postId) => {
  try {
    const response = await fetch(`${WORDPRESS_BASE_URL}/posts/${postId}?_embed`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const post = await response.json();

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    let imageUrl = `https://placehold.co/800x450/ccc/000?text=${encodeURIComponent(post.title.rendered)}`; // Default placeholder

    if (featuredMedia?.media_details?.sizes) {
      // Ưu tiên các kích thước nhỏ hơn và phù hợp với di động hơn
      if (featuredMedia.media_details.sizes.medium_large) {
        imageUrl = featuredMedia.media_details.sizes.medium_large.source_url;
      } else if (featuredMedia.media_details.sizes.medium) {
        imageUrl = featuredMedia.media_details.sizes.medium.source_url;
      } else if (featuredMedia.media_details.sizes.thumbnail) {
        imageUrl = featuredMedia.media_details.sizes.thumbnail.source_url;
      } else if (featuredMedia.media_details.sizes.large) {
        // Fallback to large if smaller sizes are not available but avoid using full size unless necessary
        imageUrl = featuredMedia.media_details.sizes.large.source_url;
      } else {
        // Fallback to full size if no specific sizes are found
        imageUrl = featuredMedia.source_url;
      }
    } else if (featuredMedia?.source_url) {
      imageUrl = featuredMedia.source_url;
    }

    return {
      id: post.id,
      image: imageUrl,
      title: post.title.rendered,
      date: new Date(post.date).toLocaleDateString('vi-VN'),
      content: post.content.rendered,
      link: post.link
    };
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    return null;
  }
};

/**
 * Removes all <a> (anchor) tags from an HTML string and their content.
 * This function is crucial for preventing external links from being rendered.
 * @param {string} htmlString The HTML string to process.
 * @returns {string} The HTML string with all <a> tags and their content removed.
 */
const removeAnchorTags = (htmlString) => {
  if (!htmlString) {
    return '';
  }
  // This regex matches any <a> tag and its content (non-greedy) and removes the entire match.
  // It handles cases where <a> tags might wrap other elements or contain text.
  return htmlString.replace(/<a\b[^>]*>.*?<\/a>/gi, '');
};

/**
 * Removes specific unwanted text patterns and HTML entities from an HTML string.
 * Targets "Website:", "Xem Thêm", triangular bullet points (&#9654; hoặc ▶),
 * email addresses, và bất kỳ thẻ paragraph rỗng nào còn lại.
 * @param {string} htmlString The HTML string to process.
 * @returns {string} The HTML string with unwanted content removed.
 */
const removeUnwantedContent = (htmlString) => {
  if (!htmlString) {
    return '';
  }

  let cleanedHtml = htmlString;

  // 1. Remove "Website:" (case-insensitive, handles various whitespace)
  cleanedHtml = cleanedHtml.replace(/Website\s*:/gi, '');

  // 2. Remove standalone "Xem Thêm" in various contexts
  cleanedHtml = cleanedHtml.replace(/<p[^>]*>\s*(?:Xem\s*Thêm)\s*<\/p>|<span[^>]*>\s*(?:Xem\s*Thêm)\s*<\/span>|\bXem\s*Thêm\b/gi, '');

  // 3. Remove triangular bullet points (&#9654; hoặc ▶) - Cập nhật để mạnh mẽ hơn
  // Regex này sẽ bắt các biến thể của ký tự mũi tên, bao gồm cả khoảng trắng xung quanh.
  cleanedHtml = cleanedHtml.replace(/\s*(?:&#9654;|\u25B6|➤)\s*|<span[^>]*>\s*(?:&#9654;|\u25B6|➤)\s*<\/span>/g, '');

  // 4. Remove email addresses, specifically "Email: info@congnghentm.com" or just "info@congnghentm.com"
  cleanedHtml = cleanedHtml.replace(/Email\s*:\s*info@congnghentm\.com/gi, '');
  cleanedHtml = cleanedHtml.replace(/info@congnghentm\.com/gi, '');

  // 5. Remove any empty paragraph tags that might be left behind after other removals
  cleanedHtml = cleanedHtml.replace(/<p[^>]*>\s*(?:&nbsp;|\u00A0)?\s*<\/p>/gi, '');

  return cleanedHtml;
};

// NewsDetail Component
export const NewsDetail = ({ newsId, onBack }) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set navigation bar title when news data is available
  useEffect(() => {
    if (news && news.title && zmp.setNavigationBarTitle) {
      zmp.setNavigationBarTitle({ title: news.title });
    }
  }, [news]);

  // Fetch news data based on newsId
  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      let foundNews = MOCK_NEWS_DATA.find(n => n.id === newsId);

      // If not found in mock data, try fetching from WordPress API
      if (!foundNews) {
        foundNews = await fetchSinglePost(newsId);
      }

      if (foundNews) {
        // Process content to remove external links and unwanted text
        let processedContent = removeAnchorTags(foundNews.content);
        processedContent = removeUnwantedContent(processedContent);

        setNews({
          ...foundNews,
          content: processedContent
        });
      } else {
        setError("Không tìm thấy tin tức này.");
      }
      setLoading(false);
    };
    getNews();
  }, [newsId]); // Re-run effect if newsId changes

  // Loading state
  if (loading) {
    return <div className="text-center p-8">Đang tải chi tiết tin tức...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  // No news found state (should be covered by error, but as a fallback)
  if (!news) {
    return <div className="text-center p-8 text-gray-600">Không tìm thấy dữ liệu tin tức.</div>;
  }

  return (
    <div className="bg-white p-4 md:p-8 shadow-lg rounded-lg mx-auto my-4 max-w-4xl">
      <button
        onClick={onBack} // Call onBack function passed from parent to navigate back
        className="mb-4 text-blue-600 hover:underline flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Quay lại
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Ngày đăng: {news.date}</p>
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          // Thêm class cho hình ảnh chính để đảm bảo responsive và giới hạn chiều cao
          className="w-full h-auto max-w-full object-contain rounded-lg mb-6"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x450/ccc/000?text=Image+Error`; }} // Fallback for broken images
        />
      )}
      {/* Render processed HTML content directly in the Mini App */}
      {/* Thêm style để xử lý hình ảnh bên trong nội dung HTML */}
      <style>{`
        .prose img {
          max-width: 100% !important; /* Đảm bảo override các style inline hoặc từ nguồn khác */
          height: auto !important;
          display: block; /* Loại bỏ khoảng trắng thừa bên dưới ảnh */
          margin-left: auto;
          margin-right: auto;
        }
        .prose video {
            max-width: 100% !important;
            height: auto !important;
        }
      `}</style>
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: news.content }}></div>
    </div>
  );
};

// Project Detail Component (similar logic to NewsDetail)
export const ProjectDetail = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set navigation bar title when project data is available
  useEffect(() => {
    if (project && project.title && zmp.setNavigationBarTitle) {
      zmp.setNavigationBarTitle({ title: project.title });
    }
  }, [project]);

  // Fetch project data based on projectId
  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      setError(null);
      let foundProject = MOCK_PROJECT_DATA.find(p => p.id === projectId);

      // If not found in mock data, try fetching from WordPress API
      if (!foundProject) {
        foundProject = await fetchSinglePost(projectId);
      }

      if (foundProject) {
        // Process content to remove external links and unwanted text
        let processedContent = removeAnchorTags(foundProject.content);
        processedContent = removeUnwantedContent(processedContent);

        setProject({
          ...foundProject,
          content: processedContent
        });
      } else {
        setError("Không tìm thấy công trình này.");
      }
      setLoading(false);
    };
    getProject();
  }, [projectId]); // Re-run effect if projectId changes

  // Loading state
  if (loading) {
    return <div className="text-center p-8">Đang tải chi tiết công trình...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  // No project found state (should be covered by error, but as a fallback)
  if (!project) {
    return <div className="text-center p-8 text-gray-600">Không tìm thấy dữ liệu công trình.</div>;
  }

  return (
    <div className="bg-white p-4 md:p-8 shadow-lg rounded-lg mx-auto my-4 max-w-4xl">
      <button
        onClick={onBack} // Call onBack function passed from parent to navigate back
        className="mb-4 text-blue-600 hover:underline flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Quay lại
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Ngày đăng: {project.date}</p>
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          // Thêm class cho hình ảnh chính để đảm bảo responsive và giới hạn chiều cao
          className="w-full h-auto max-w-full object-contain rounded-lg mb-6"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x450/ccc/000?text=Image+Error`; }} // Fallback for broken images
        />
      )}
      {/* Render processed HTML content directly in the Mini App */}
      {/* Thêm style để xử lý hình ảnh bên trong nội dung HTML */}
      <style>{`
        .prose img {
          max-width: 100% !important; /* Đảm bảo override các style inline hoặc từ nguồn khác */
          height: auto !important;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .prose video {
            max-width: 100% !important;
            height: auto !important;
        }
      `}</style>
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.content }}></div>
    </div>
  );
};