import { BsLinkedin } from "react-icons/bs";
import { GrGithub } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-primary py-8">
      <div className="container mx-auto flex justify-center items-center flex-col">
        <p className="text-white text-center">
          Copyright &copy; PhysiX 2024. All rights reserved.
        </p>
        <div className="mt-2 flex space-x-4">
          <div className="flex items-center">
            <BsLinkedin className="mr-1 text-white" />
            <a
              href="https://www.linkedin.com/in/maksym-pavliv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex items-center ">
            <GrGithub className="mr-1 text-white" />
            <a
              href="https://github.com/maksio77/PhysiX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
