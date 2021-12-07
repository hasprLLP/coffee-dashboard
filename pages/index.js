import Logout from "@/utilities/logout";
import DashCard from "@/components/dashcard";
import VerifyStudent from "@/components/verifyStudent";
import CollectFee from "@/components/collectFee";

export default function Home() {
  return (
    <div className="home" style={{ backgroundColor: "var(--chakra-colors-gray-100)" }}>
      <div className="dashboard">
        <div className="dashboard-title">Dashboard</div>
        <div className="dashboard-cards">
          <DashCard title="Students" no="79" />
          <DashCard title="Bus Owners" no="5" />
          <DashCard title="Buses" no="26" />
          <DashCard title="Routes" no="18" />
          <DashCard title="Packages" no="4" />
          <DashCard title="Operators" no="24" />
          <DashCard title="Schools" no="7" />
          <DashCard title="Users" no="254" />
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="dashboard-verify">
            <div className="dashboard-subtitle">Verify Students & Assign Bus</div>
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
            <VerifyStudent />
          </div>
          <div className="dashboard-verify">
            <div className="dashboard-subtitle">Verify Fee Payment</div>
            <CollectFee />
            <CollectFee />
            <CollectFee />
            <CollectFee />
            <CollectFee />
            <CollectFee />
            <CollectFee />
          </div>
        </div>
        <div className="dashboard-subtitle">Other Settings</div>
        <Logout />
      </div>
    </div>
  );
}
