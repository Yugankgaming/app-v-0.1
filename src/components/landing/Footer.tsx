import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Brain, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              to="/"
              className="font-bold text-xl flex items-center mb-4 text-black"
            >
              <Brain className="h-5 w-5 mr-2 text-black" />
              Study Yugank
            </Link>
            <p className="text-gray-600 mb-4">
              A comprehensive study assistance app that helps students track
              their subject-wise study time and improve performance.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-600 hover:text-black"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-600 hover:text-black"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-600 hover:text-black"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-black">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Subject Timers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Performance Tracking
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Formula Repository
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Smart Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-black">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Study Tips
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-black">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Study Yugank. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-gray-600 hover:text-black">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-gray-600 hover:text-black">
              Terms
            </Link>
            <Link to="#" className="text-sm text-gray-600 hover:text-black">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
