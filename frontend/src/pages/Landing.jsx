import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, TrendingUp, Shield, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold text-primary">HopeTrack</h1>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Link to="/auth">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <section className="text-center py-12 sm:py-20 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
            Tracking hopes through donations
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Bridge the trust gap between donors and NGOs with complete transparency,
            real-time tracking, and visual impact analytics.
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8">
              Start Tracking Impact
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-8 sm:py-16 px-4">
          <Card className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
            <p className="text-muted-foreground">
              See exactly where your donations go with real-time analytics and visual reports.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Full Transparency</h3>
            <p className="text-muted-foreground">
              NGOs share their expenditure data, building trust through openness and accountability.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
            <p className="text-muted-foreground">
              Join a community of donors making measurable differences in causes that matter.
            </p>
          </Card>
        </section>

        {/* Public Analytics Section */}
        <section className="py-16 text-center">
          <Link to="/public">
            <Button variant="outline" size="lg">
              View Public Analytics
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 HopeTrack. Tracking hopes through donations.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
