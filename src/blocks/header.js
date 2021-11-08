import Image from "next/image";

export default function Header() {
  return (
    <div className="header">
      <Image alt="header" src="/static/svg/tmpHeader.svg" layout="fill" objectFit="contain" />
    </div>
  );
}
