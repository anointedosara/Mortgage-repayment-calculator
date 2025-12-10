"use client"
import { ResultContext } from "@/Contexts/ResultContext";
import Image from "next/image";
import React, { useContext } from "react";

function Calculator() {
  const {handleAmount, handleRate, handleTerm, handleType, mortgageType, submitted, handleSubmit, clearAll, amount, term, rate} = useContext(ResultContext)
  return (
    <div className="w-full max-w-[400px] md:max-w-full md:m-0 m-auto md:w-[50%] p-5 md:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-slate-900 font-bold text-[18px] md:text-[22px] lg:text-[25px]">
          Mortgage Calculator
        </h1>
        <button onClick={clearAll} className="text-[14px] md:text-[17px] text-slate-700 hover:text-slate-900 underline underline-offset-2 cursor-pointer transition-all">
          Clear All
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-7">
        <label htmlFor="amount" className="text-slate-700 text-[14px] md:text-[17px]">Mortgage Amount</label>
        <div className={`group ${submitted && amount === '' ? 'border-red-500' : 'border-slate-700'} flex items-stretch rounded-md border-2 mt-2 hover:border-slate-900 has-focus:border-yellow-200 transition-all`}>
          <div className={`${submitted && amount === '' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-700'} text-[18px] md:text-[20px] font-bold py-2 px-4 rounded-l-md group-has-focus:bg-yellow-200 transition-all`}>£</div>
          <input className="w-full border-0 outline-0 text-[20px] font-bold px-4 no-spinner text-slate-900" type="number" id="amount" value={amount} onChange={handleAmount} />
        </div>
        <span className={`text-red-500 text-sm ${submitted && amount === '' ? 'block' : 'hidden'}`}>This field is required</span>

        <div className="flex w-full gap-5 flex-col md:flex-row justify-between mt-6 items-center">
          <div className="w-full md:w-[50%]">
            <label className="text-slate-700 text-[14px] md:text-[17px]" htmlFor="term">Mortgage Term</label>
            <div className={`group ${submitted && term === '' ? 'border-red-500' : 'border-slate-700'} flex items-stretch rounded-md border-2 has-focus:border-yellow-200 mt-2 hover:border-slate-900 transition-all`}>
              <input className="w-full border-0 outline-0 text-[20px] font-bold px-4 no-spinner text-slate-900" type="number" id="term" value={term} onChange={handleTerm} />
              <div className={`${submitted && term === '' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-700'} transition-all group-has-focus:bg-yellow-200 text-[18px] md:text-[20px] font-bold py-2 px-4 rounded-r-md`}>years</div>
            </div>
        <span className={` text-red-500 text-sm ${submitted && term === '' ? 'block' : 'hidden'}`}>This field is required</span>
          </div>
          <div className="w-full md:w-[50%]">
            <label className="text-slate-700 text-[14px] md:text-[17px]" htmlFor="rate">Interest Rate</label>
            <div className={`group ${submitted && rate === '' ? 'border-red-500' : 'border-slate-700'} flex items-stretch rounded-md border-2 has-focus:border-yellow-200 mt-2 hover:border-slate-900 transition-all`}>
              <input className="w-full border-0 outline-0 text-[20px] font-bold px-4 no-spinner text-slate-900" type="number" id="rate" value={rate} onChange={handleRate} />
              <div className={`${submitted && rate === '' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-700'} text-[18px] transition-all group-has-focus:bg-yellow-200 md:text-[20px] font-bold py-2 px-4 rounded-r-md`}>%</div>
            </div>
        <span className={` text-red-500 text-sm ${submitted && rate === '' ? 'block' : 'hidden'}`}>This field is required</span>
          </div>
        </div>

        <fieldset className="mt-6 w-full gap-3 flex flex-col">
          <legend className="text-slate-700 text-[14px] md:text-[18px] mb-2">Mortgage Type</legend>
          <label className="w-full cursor-pointer has-focus:bg-yellow-200/20 has-checked:bg-yellow-200/20 has-focus:border-yellow-200 has-checked:border-yellow-200 font-bold text-[14px] md:text-[18px] border-2 border-slate-700 py-3 px-5 rounded-md flex items-center hover:border-yellow-200 transition-all" htmlFor="repayment">
            <input className="mr-4 size-5 appearance-auto accent-yellow-200" type="radio" id="repayment" name="mortgageType" value="repayment" onChange={handleType}/> Repayment
          </label>
          <label  className="w-full cursor-pointer font-bold text-[14px] md:text-[18px] border-2 has-focus:bg-yellow-200/20 has-checked:bg-yellow-200/20 has-focus:border-yellow-200 has-checked:border-yellow-200 border-slate-700 py-3 px-5 rounded-md flex items-center hover:border-yellow-200 transition-all" htmlFor="interest">
            <input className="mr-4 size-5 appearance-auto accent-yellow-200" type="radio" id="interest" name="mortgageType" value="interest" onChange={handleType} /> Interests Only
          </label>
        </fieldset>
        <span className={` text-red-500 text-sm ${submitted && !mortgageType ? 'block' : 'hidden'}`}>This field is required</span>

        <button className="flex cursor-pointer items-center justify-center rounded-4xl font-bold text-slate-900 p-4 text-[14px] md:text-[18px] bg-yellow-200 hover:bg-yellow-100 md:max-w-[350px] w-full mt-10 transition-all" type="submit"><Image className="w-6 mr-3" src='icon-calculator.svg' alt="" width={1000} height={1000} /> Calculate Repayments</button>
      </form>
    </div>
  );
}

export default Calculator;
