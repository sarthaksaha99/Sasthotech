"use client";

import { Footer } from "flowbite-react";
import { BsFacebook, BsYoutube, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterSitemapLinks() {
  return (
    <Footer className="footer" bgDark>
      <div className="w-full">
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            className="text-white"
            by="Smart Hospital Bd"
            href="#"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              className="hover:text-white"
              href="#"
              icon={BsFacebook}
            />
            <Footer.Icon
              className="hover:text-white"
              href="#"
              icon={BsInstagram}
            />
            <Footer.Icon
              className="hover:text-white"
              href="#"
              icon={BsTwitter}
            />
            <Footer.Icon
              className="hover:text-white"
              href="#"
              icon={BsYoutube}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
