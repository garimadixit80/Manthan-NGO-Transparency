const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="text-center max-w-lg">
        <h1 className="mb-4 text-5xl font-extrabold text-primary sm:text-6xl">
          Welcome to HopeTrack
        </h1>
        <p className="mb-6 text-lg sm:text-xl text-muted-foreground">
          Track donations, support NGOs, and make an impact in your community.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/auth"
            className="rounded-md bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition"
          >
            Get Started
          </a>
          <a
            href="/dashboard"
            className="rounded-md border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/10 transition"
          >
            Explore Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
