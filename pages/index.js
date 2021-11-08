import { Input, Button } from "@chakra-ui/react";
import Header from "@/blocks/header";

export default function Home() {
  return (
    <div className="home" id="view-main">
      {/* //$ Header */}
      <Header />
      <div className="driver">
        <div style={{ fontSize: "1.65vw", fontWeight: "500", marginBottom: "3.5vw" }}>Create Driver</div>
        <div style={{ width: "70vw", height: "40vh", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>{" "}
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>{" "}
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>{" "}
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>{" "}
          <div style={{ width: "20vw" }}>
            <div style={{ fontFamily: "Gilroy", fontSize: "0.75vw", fontWeight: "500" }}>Name</div>
            <Input
              size="md"
              bg="rgba(242, 242, 242, 0.4)"
              focusBorderColor="#38B2AC"
              marginBottom="1rem"
              marginTop="0.5rem"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <Button colorScheme="teal">Save</Button>
      </div>
    </div>
  );
}
