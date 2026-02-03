import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4
              className="text-xl font-bold bg-gradient-to-r 
               from-cyan-600 via-blue-100 to-gray-100
               bg-clip-text text-transparent mb-4 flex items-center gap-2"
            >
              <FiShoppingCart className="text-cyan-400" /> POS System
            </h4>

            <p className="text-sm">
              Modern point of sale for modern businesses
            </p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Product</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 POS System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
