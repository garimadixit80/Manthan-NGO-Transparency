import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("user");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, userType);
      toast.success("Welcome back!");
      navigate(userType === "admin" ? "/admin" : "/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name, userType);
      toast.success("Account created successfully!");
      navigate(userType === "admin" ? "/admin" : "/dashboard");
    } catch {
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-base-200 to-base-300 p-6">
      <div className="backdrop-blur-xl bg-base-100/80 shadow-2xl rounded-2xl w-full max-w-md border border-base-300 transition-all duration-300 hover:shadow-primary/30">
        <div className="p-8">
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-6">
            <button className="btn btn-ghost btn-circle mb-3 border border-base-300 hover:border-primary/60 transition">
              <Heart className="h-7 w-7 text-primary" />
            </button>
            <h2 className="text-3xl font-bold tracking-tight">HopeTrack</h2>
            <p className="text-base-content/60 text-sm">
              Tracking hopes through donations
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 bg-base-200 rounded-xl p-1">
            <button
              onClick={() => setMode("signin")}
              className={`w-1/2 py-2 rounded-lg transition ${
                mode === "signin"
                  ? "text-base-content shadow btn btn-primary"
                  : "hover:bg-base-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`w-1/2 py-2 rounded-lg transition ${
                mode === "signup"
                  ? "text-base-content shadow btn btn-primary"
                  : "hover:bg-base-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="donor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <Label>Account Type</Label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="user"
                      checked={userType === "user"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="radio radio-primary"
                    />
                    Donor
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="admin"
                      checked={userType === "admin"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="radio radio-primary"
                    />
                    NGO Admin
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                className="btn btn-primary text-base-content w-full rounded-lg text-lg font-medium mt-2 hover:bg-base-300"
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="donor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <Label>Account Type</Label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="user"
                      checked={userType === "user"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="radio radio-primary"
                    />
                    Donor
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="admin"
                      checked={userType === "admin"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="radio radio-primary"
                    />
                    NGO Admin
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                className="btn btn-primary text-base-content w-full rounded-lg text-lg font-medium mt-2 hover:bg-base-300"
              >
                Create Account
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
