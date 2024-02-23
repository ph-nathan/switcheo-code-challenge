export default function GradientBlobs({ isSwitch }: { isSwitch: boolean }) {
  return isSwitch ? (
    <>
      <div
        className="bg-[#a0c1fb] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[5rem] sm:w-[68.75rem]
    dark:bg-[#676394] animate-blob"
      />
      <div
        className="bg-[#fbe2e3] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[5rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2x1:left-[-5rem]
    dark:bg-[#946263] animate-blob"
      />
    </>
  ) : (
    <>
      <div
        className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[5rem] sm:w-[68.75rem]
    dark:bg-[#946263] animate-blob"
      />
      <div
        className="bg-[#a0c1fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[5rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2x1:left-[-5rem]
    dark:bg-[#676394] animate-blob"
      />
    </>
  );
}
