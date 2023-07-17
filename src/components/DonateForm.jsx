import { useWallet } from "@txnlab/use-wallet";
import { useState, useEffect } from "react";
import Button from "./Button";
import { donate } from "../algorand/donate";
import algosdk from "algosdk";


export default function DonateForm() {
  const { activeAddress, signTransactions, sendTransactions } = useWallet();
  const [txnref, setTxnRef] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const txn = await donate(activeAddress, donationAmount, "UYOKPQPYO4KPPGZLY2THPNORV45XCU6BD6PVAR65O4PWSXDWAG6JNHKYHE")
    const payload = [txn];
    const groupedTxn = algosdk.assignGroupID(payload);
    const encodedTxns = groupedTxn.map((txn) =>
      algosdk.encodeUnsignedTransaction(txn)
    );
    const signed = await signTransactions(encodedTxns);
    await sendTransactions(signed, 4);
      
   };

  return (
    <>
      <div>
        <h4 className="mb-4">Make donation</h4>
      </div>
      <div className="w-full">
        {txnref && <p className="mb-4">Txn ID: {txnref} </p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="to"
            >
              Donation amount (in Algos)
            </label>
            <input className="w-full" name="asset_amount" type="number" onChange={(e) => setDonationAmount(e.target.value)}
              value={donationAmount} style={{ color: 'black' }}/>
          </div>
          <Button label="Donate" type="submit"  />
        </form>
      </div>
    </>
  );
}
