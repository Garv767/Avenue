"use client";

import Link from "next/link";
import { useState } from "react";
// import { useUser, isAdmin, signOut } from "@/lib/auth";

// Temporary auth mocks until Dev A completes SYNC 1
const useUser = () => ({ user: null, loading: false });
const isAdmin = () => false;
const signOut = async () => {};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useUser();
  const admin = isAdmin(user);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Jobs", href: "/opportunities/jobs" },
    { name: "Hackathons", href: "/opportunities/hackathons" },
    { name: "Learn", href: "/learn" },
    { name: "Wall", href: "/wall" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Avenue
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-indigo-600 font-medium"
              >
                {link.name}
              </Link>
            ))}
            {admin && (
              <Link href="/admin" className="text-slate-600 hover:text-indigo-600 font-medium">
                Admin
              </Link>
            )}
            
            <div className="border-l border-slate-300 h-6 mx-2"></div>
            
            {loading ? (
              <div className="w-16 h-8 bg-slate-200 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/submit"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Submit
                </Link>
                <button
                  onClick={signOut}
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {admin && (
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
            
            <div className="border-t border-slate-200 my-2 pt-2">
              {loading ? (
                <div className="px-3 py-2">Loading...</div>
              ) : user ? (
                <>
                  <Link
                    href="/submit"
                    className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-slate-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Submit Opportunity
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
