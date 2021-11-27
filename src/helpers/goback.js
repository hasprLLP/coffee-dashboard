import Image from "next/image";
import { useRouter } from "next/router";

const GoBack = () => {
  const router = useRouter();

  return (
    <span onClick={() => router.back()} className="driver-back">
      <Image alt="back" src="/icons/navigation/arrow-left-o.svg" layout="fixed" width={"100%"} height={"100%"} objectFit="contain" />
    </span>
  );
};

export default GoBack;
