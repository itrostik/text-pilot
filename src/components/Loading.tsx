import Image from "next/image";
export default function Loading() {
  return (
    <div
      className={
        "bg-black h-screen w-full flex flex-col gap-5 items-center justify-center text-white"
      }
    >
      <Image src={"/logo.svg"} width={100} height={100} alt={""} />
      <span>Загрузка...</span>
    </div>
  );
}
