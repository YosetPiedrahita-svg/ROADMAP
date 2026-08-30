import { Mail } from "lucide-react";

//* footer para todas las paginas autenticadas
const FooterHome = () => {
  return (
    <div className="flex flex-row justify-start text-white">
      <div className="flex flex-row w-1/3 justify-evenly font-semibold text-xl items-center">
        <h1>CONTACT ME:</h1>
        <a
          href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlFDbHnDntPltJbjwhxbJQWTLnDlFJnTVfKNwrSpzspGPSsDstFzZVmNTNRsWTLJLxkjXq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </a>
      </div>
    </div>
  );
};

export default FooterHome;
