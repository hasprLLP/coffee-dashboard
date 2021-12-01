import Logout from "@/utilities/logout";

export default function Home() {
  return (
    <div className="home">
      <div style={{ marginLeft: "5vw", width: "85%", height: "100%", marginTop: "5vw" }}>
        <div>Dashboard</div>
        <Logout />
      </div>
    </div>
  );
}
