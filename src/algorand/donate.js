import { getAlgodClient } from "../clients/index.js";
import algosdk from "algosdk";

const donate = async (fromAddr, price, toAddr) => {
  const algodClient = getAlgodClient(process.env.NEXT_PUBLIC_NETWORK);

  const suggestedParams = await algodClient.getTransactionParams().do();

  let txn = algosdk.makePaymentTxnWithSuggestedParams(
    fromAddr,
    toAddr,
    price * 1e6,
    undefined,
    undefined,
    suggestedParams
  );
  return txn;
};

export { donate };
