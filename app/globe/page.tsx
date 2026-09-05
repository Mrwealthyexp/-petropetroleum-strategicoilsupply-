import GlobeScene from "@/components/globe/GlobeScene";

export default function GlobePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">Global Supply Map</h1>
      <GlobeScene className="h-[600px] w-full" />
    </main>
  );
}
