"use client";
import Calculator from "@/components/Calculator";
import Result from "@/components/Result";
import { ResultContext } from "@/Contexts/ResultContext";
import { useState, useMemo } from "react";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const clearAll = () => {
    setAmount("");
    setRate("");
    setTerm("");
    setMortgageType("");
    setSubmitted(false);
    setShowResult(false);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }
  const handleTerm = (e) => {
    setTerm(e.target.value)
  }
  const handleRate = (e) => {
    setRate(e.target.value)
  }
  const handleType = (e) => {
    setMortgageType(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setShowResult(false)

    if (
      amount === "" ||
      rate === "" ||
      term === "" ||
      mortgageType === ""
    ) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  // ✅ ---- ALL CALCULATIONS IN CONTEXT ----
  const calculations = useMemo(() => {
    if (!showResult) return null;

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

    return {
      monthlyRate,
      monthlyRepayment,
      interestOnlyMonthly,
      totalRepaid
    };
  }, [showResult]);

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
