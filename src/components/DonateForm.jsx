import { useWallet } from "@txnlab/use-wallet";
import { useState } from "react";
import Button from "./Button";
import algosdk from "algosdk";
import { getAlgodClient } from "@/clients";


export default function DonateForm() {
  const { activeAddress, signTransactions, sendTransactions } = useWallet();
  const [txnref, setTxnRef] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const algodClient = getAlgodClient(process.env.NEXT_PUBLIC_NETWORK);

    const suggestedParams = await algodClient.getTransactionParams().do();

    let txn = algosdk.makePaymentTxnWithSuggestedParams(
      activeAddress,
      "UYOKPQPYO4KPPGZLY2THPNORV45XCU6BD6PVAR65O4PWSXDWAG6JNHKYHE",
      donationAmount * 1e6,
      undefined,
      undefined,
      suggestedParams
    );
  
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
