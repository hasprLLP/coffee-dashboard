import { Input, InputGroup, InputAddon, InputLeftAddon, InputRightAddon, InputElement, InputLeftElement, InputRightElement } from "@chakra-ui/input";

export default function Home() {
  return (
    <div style={{ height: "100vh" }} id="view-main">
      <div style={{ display: "flex", height: "150vh", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="invert">
        <div style={{ fontSize: "1.5vw", fontWeight: "400" }}>Bus Karo</div>
        <div style={{ fontSize: "2.5vw", fontWeight: "500" }}>Online Bus Services</div>
        <div style={{ fontSize: "3.5vw", fontWeight: "600" }}>Work Started Finishing Soon</div>
        <div style={{ width: "50vw", height: "50vh"}}>
          <Input size="sm" marginBottom="1rem" placeholder="A simple placeholder" />
          <Input size="md" marginBottom="1rem" placeholder="A simple placeholder" />
        </div>
      </div>
    </div>
  );
}
