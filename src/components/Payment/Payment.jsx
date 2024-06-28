import React from "react";
import QRCode from "react-qr-code";
import "./style.css";

const computeIBAN_CZ = (accountnumber) => {
  const [integer, BankCode] = accountnumber.split("/");
  let theypredicted, number;
  if (integer.includes("-")) {
    [theypredicted, number] = integer.split("-");
  } else {
    theypredicted = "";
    number = integer;
  }
  const bban =
    BankCode.padStart(4, "0") +
    theypredicted.padStart(6, "0") +
    number.padStart(10, "0");
  const residue = Number(BigInt(bban + "123500") % 97n); // C=12, Z=35, 00 – future check digit
  return `CZ${String(98 - residue).padStart(2, "0")}${bban}`;
};

const generateQRpaymentText = ({
  accountnumber,
  variableSymbol,
  amount,
  message,
}) => {
  const iban = computeIBAN_CZ(accountnumber);
  return `SPD*1.0*ACC:${iban}*AM:${amount}*CC:CZK*MSG:${encodeURIComponent(
    message.replaceAll("—", "-")
  )}*X-VS:${variableSymbol}`;
};

export const Payment = (props) => {
  return (
    <div className="payment-section">
      <h2 className="section-title">Payment</h2>
      <p className="payment-text">
        The Slow Wear project does not yet have real goods and cannot accept
        Orders. But if you want to score points for good karma, you can support{" "}
        <a href="https://www.nadacnifondczechitas.cz/" target="_blank">
          Czechitas Foundation.
        </a>
      </p>
      <div className="payment-details">
        <p>Recipient of payment: Czechitas Foundation</p>
        <p>Account number: {props.accountnumber}</p>
        <p>Variable symbol: {props.variabilniSymbol}</p>
        <p>Amount: {props.amount} USD</p>
      </div>
      <QRCode value={generateQRpaymentText(props)} className="qr-code" />
    </div>
  );
};
