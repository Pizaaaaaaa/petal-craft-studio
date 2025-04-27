
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-craft-pink-100/30 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 animate-float">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4076/4076445.png" 
            alt="Not Found" 
            className="w-40 h-40 mx-auto"
          />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4 text-craft-pink-500">页面未找到</h1>
        <p className="text-xl text-foreground/80 mb-8">
          抱歉，您访问的页面不存在或已被移动
        </p>
        <a 
          href="/" 
          className="craft-button inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          <span>返回首页</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
