import Image from "next/image";
import notFound from "./../Images/404.svg";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${notFound})` }}
      className="h-[100vh] w-full flex flex-col justify-center items-center"
    >
      <Image src={notFound} alt="Not Found Image"></Image>
      <Link href="/" className="bg-black text-white px-5 py-3 rounded-md">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
