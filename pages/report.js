import TotalFee from "@/tables/feereport";
import InvoiceReport from "@/tables/invoicereport";
import IncomeReport from "@/tables/incomereport";
import RedeemReport from "@/tables/redeemreport";
import DropDown from "@/components/dropdown";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;

export default function Report() {
  const [report, setReport] = useState("Fee");

  return (
    <div className="home">
      <div style={{ marginLeft: "5vw", width: "85%", height: "100%", marginTop: "5vw" }}>
        <RadioGroup onChange={setReport} value={report}>
          <Stack direction="row">
            <Radio value="Fee" colorScheme="teal" pr="6">
              Fees Report
            </Radio>
            <Radio value="Invoice" colorScheme="teal" pr="6">
              Invoice Report
            </Radio>
            <Radio value="Income" colorScheme="teal" pr="6">
              Income Report
            </Radio>
            <Radio value="Redeem" colorScheme="teal" pr="6">
              Redeem Report
            </Radio>
          </Stack>
        </RadioGroup>
        <div style={{ paddingBottom: "2vw", paddingTop: "2vw" }}>
          {report === "Fee" ? (
            <TotalFee />
          ) : report === "Invoice" ? (
            <InvoiceReport />
          ) : report === "Income" ? (
            <IncomeReport />
          ) : report === "Redeem" ? (
            <RedeemReport />
          ) : null}
        </div>
      </div>
    </div>
  );
}
