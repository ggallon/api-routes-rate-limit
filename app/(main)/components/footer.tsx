import Image from "next/image";

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/file-text.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Learn
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Examples
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to proactice.co →
      </a>
    </footer>
  );
}
