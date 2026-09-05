import PriceTicker from "@/components/dashboard/PriceTicker";
import SPRCard from "@/components/dashboard/SPRCard";
import SupplyRoutesCard from "@/components/dashboard/SupplyRoutesCard";
import RiskCard from "@/components/dashboard/RiskCard";

export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">Strategic Oil Supply Dashboard</h1>
      <PriceTicker />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SPRCard />
        <SupplyRoutesCard />
      </div>
      <RiskCard />
    </main>
  );
}
