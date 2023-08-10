import Image from "next/image";

import hero from "./../Images/hero.jpg";
export default function Home() {
  return (
    <div className="min-h-[100vh] ">
      <div className="App">
        <section className="hero mx-[10] gap-20 justify-center items-center flex w-full h-[70vh]">
          <div className="w-[40%] text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Manage and Oversee Your Diagnostic Center with Ease
            </h1>
            <p className="text-lg text-gray-700 my-6">
              Our comprehensive solution empowers diagnostic center owners and
              managers by providing the tools and resources needed to
              efficiently manage and oversee operations. With our user-friendly
              platform, effortlessly streamline various aspects of your
              diagnostic center, allowing you to deliver exceptional patient
              care with ease.
            </p>
            <a
              href="#"
              className="mt-8 inline-block px-8 py-4 text-lg font-semibold text-white bg-black  rounded-lg"
            >
              Get Started
            </a>
          </div>
          <Image
            className="w-[50%] h-full object-cover rounded-lg"
            src={hero}
            width={500}
            height={500}
            alt="Diagnostic Center"
          />
        </section>
        <section className="about-section mx-[10] gap-20 justify-center items-center flex w-full h-[70vh]">
          <div className="w-[40%] text-left">
            <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Efficient Solutions for Diagnostic Center Management
            </h1>
            <p className="text-lg text-gray-700">
              We are dedicated to providing efficient solutions for diagnostic
              center management, enabling healthcare professionals to streamline
              operations and maximize productivity. Our comprehensive suite of
              tools and services is specifically tailored to address challenges
              in billing, staff management, and daily summaries.
            </p>
            <a
              href="#"
              className="mt-8 inline-block px-8 py-4 text-lg font-semibold text-white bg-black rounded-lg"
            >
              Contact Us
            </a>
          </div>
          <img
            className="w-[50%] h-full object-cover rounded-lg"
            src="https://i.ibb.co/n6gxyJG/4949532-19799-1.jpg"
            alt="Diagnostic Center Management"
          />
        </section>

        <section className="about-section mx-[10] gap-20 justify-center items-center flex w-full h-[70vh]">
          <div className="w-[40%] text-left">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-700 mb-6">
              Have any questions or need assistance? Reach out to us using the
              contact form below. We will get back to you as soon as possible.
              or <br /> Email at{" "}
              <a href="mailto:sasthotech@gmail.com">
                <span className="text-blue-500 cursor-pointer font-medium">
                  sasthotech@gmail.com{" "}
                </span>
              </a>
              now.
            </p>
          </div>
          <div className="bg-white w-[50%] rounded-lg p-12 shadow-lg">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:border-black"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className=" inline-block px-6 py-3 text-lg font-semibold text-white bg-black rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </section>
        <section className="youtube-video flex justify-center bg-gray-100 py-8">
          <div className="max-w-lg text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Still Confused?
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Check out the introduction video:
            </p>
            <div
              className="relative"
              style={{ paddingBottom: "0", paddingTop: "56.25%", height: "0" }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/_w0Ikk4JY7U"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <p className="text-base text-gray-700 mt-6">
              Learn more about our services and how we can help you. Subscribe
              to our YouTube channel for updates and tutorials.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
