import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
      <div className="text-center p-8 bg-base-100 rounded-3xl shadow-2xl border border-base-200 max-w-md">
        <h1 className="text-8xl font-extrabold text-error mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-base-content">
          Page Not Found
        </h2>
        <p className="text-md text-muted-foreground mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button className="btn-primary border btn-lg px-6 py-3 hover:scale-105 transition-transform duration-300 text-primary">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
