"use client";
import Calculator from "@/components/Calculator";
import Result from "@/components/Result";
import { ResultContext } from "@/Contexts/ResultContext";
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [calculations, setCalculations] = useState(null);

  const clearAll = () => {
    setAmount("");
    setRate("");
    setTerm("");
    setMortgageType("");
    setSubmitted(false);
    setShowResult(false);
    setCalculations(null);
  };

  const handleAmount = e => setAmount(e.target.value);
  const handleTerm = e => setTerm(e.target.value);
  const handleRate = e => setRate(e.target.value);
 const handleType = e => {
  setMortgageType(e.target.value);
  setSubmitted(false);
};

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setShowResult(false);

    if (
      amount === "" ||
      rate === "" ||
      term === "" ||
      mortgageType === ""
    ) {
      setCalculations(null);
      return;
    }

    // ✅ ---- RUN CALCULATION ONLY HERE ----
    const principal = Number(amount);
    const years = Number(term);
    const annualRate = Number(rate);

    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    const monthlyRepayment =
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalRepaid = monthlyRepayment * totalMonths;
    const interestOnlyMonthly = principal * monthlyRate;

    setCalculations({
      monthlyRate,
      monthlyRepayment,
      interestOnlyMonthly,
      totalRepaid
    }); // ✅ SAVE RESULTS

    setShowResult(true); // ✅ Show result ONLY after calculation
  };

  return (
    <ResultContext.Provider
      value={{
        handleAmount,
        handleRate,
        handleTerm,
        handleType,
        clearAll,
        handleSubmit,
        submitted,
        showResult,
        amount,
        term,
        rate,
        mortgageType,
        calculations
      }}
    >
      <main className="flex md:items-center md:justify-center max-w-[1440px] m-auto h-screen md:p-5">
        <section className="flex items-stretch justify-between gap-5 md:gap-0 flex-col md:flex-row max-w-[1100px] w-full bg-white md:rounded-3xl">
          <Calculator />
          <Result />
        </section>
      </main>
    </ResultContext.Provider>
  );
}
