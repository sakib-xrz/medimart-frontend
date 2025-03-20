import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Container from "./container";
import Logo from "@/public/logo.svg";

export function Footer() {
  return (
    <footer className="bg-muted/40 print:hidden">
      <Container className="px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src={Logo} alt="Medi Mart Logo" className="w-40" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted online pharmacy for all your healthcare needs.
              Quality medicines delivered to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#categories"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Prescription Medicines
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Over-the-Counter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Health Supplements
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Medical Devices
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  123 Health Street, Medical District, City, Country
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  support@medimart.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Medi Mart. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
