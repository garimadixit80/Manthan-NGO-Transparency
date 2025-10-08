import { Link } from "react-router-dom";
import { HeartIcon, TrendingUp, Shield, Users } from "lucide-react";
import ThemeSelector from "../components/ui/ThemeSelector";

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2 px-4">
            <HeartIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
              HopeTrack
            </span>
          </Link>
        </div>
        <div className="navbar-end flex gap-2 px-4">
          <Link to="/auth">
            <button className="btn btn-outline btn-sm sm:btn-md hover:scale-105 transition-transform duration-200 rounded-btn">
              Sign In
            </button>
          </Link>
          <Link to="/auth?mode=signup">
            <button className="btn btn-primary btn-sm sm:btn-md rounded-btn hover:scale-105 transition-transform duration-200">
              Get Started
            </button>
          </Link>
          <ThemeSelector />
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero min-h-[70vh] bg-base-100 text-center">
        <div className="hero-content flex-col px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">
            Tracking hopes through donations
          </h1>
          <p className="py-6 text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
            Bridge the trust gap between donors and NGOs with complete
            transparency, real-time tracking, and visual impact analytics.
          </p>
          <Link to="/auth?mode=signup">
            <button className="btn btn-primary btn-lg rounded-xl hover:scale-105 transition-transform duration-200">
              Start Tracking Impact
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl">
            <div className="card-body text-center">
              <div className="avatar placeholder mb-4">
                <div className="bg-accent/10 text-primary rounded-full w-14 h-14 flex items-center justify-center mx-auto bg-blue-300">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
              </div>
              <h2 className="card-title justify-center text-xl font-semibold">
                Track Your Impact
              </h2>
              <p className="text-base-content/70 text-sm sm:text-base">
                See exactly where your donations go with real-time analytics and
                visual reports.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl">
            <div className="card-body text-center">
              <div className="avatar placeholder mb-4">
                <div className="bg-accent/10 text-secondary rounded-full w-14 h-14 flex items-center justify-center mx-auto bg-orange-300">
                  <Shield className="h-6 w-6 text-black" />
                </div>
              </div>
              <h2 className="card-title justify-center text-xl font-semibold">
                Full Transparency
              </h2>
              <p className="text-base-content/70 text-sm sm:text-base">
                NGOs share their expenditure data, building trust through
                openness and accountability.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl">
            <div className="card-body text-center">
              <div className="avatar placeholder mb-4">
                <div className="bg-accent/10 text-accent rounded-full w-14 h-14 flex items-center justify-center mx-auto bg-red-300">
                  <Users className="h-6 w-6 text-black" />
                </div>
              </div>
              <h2 className="card-title justify-center text-xl font-semibold">
                Community Impact
              </h2>
              <p className="text-base-content/70 text-sm sm:text-base">
                Join a community of donors making measurable differences in
                causes that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Public Analytics Section */}
      <section className="text-center py-16">
        <Link to="/public">
          <button className="btn btn-outline btn-lg rounded-xl hover:scale-105 transition-transform duration-200">
            View Public Analytics
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-6 bg-base-200 text-base-content/70">
        <p>© 2025 HopeTrack — Tracking hopes through donations.</p>
      </footer>
    </div>
  );
};

export default Landing;
