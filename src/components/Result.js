import { ResultContext } from '@/Contexts/ResultContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Result() {
  const {
    showResult,
    mortgageType,
    calculations
  } = useContext(ResultContext)

  const format = num =>
    num.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    })

  return (
    <div className='bg-slate-900 md:rounded-3xl md:rounded-bl-[90px] md:rounded-tl-none w-full max-w-screen md:max-w-full md:m-0 m-auto md:w-[50%] px-5 py-8 md:p-10'>
      {
        !showResult ? 
        <div className='flex flex-col items-center justify-center h-full text-center w-full max-w-[400px] m-auto'>
          <Image className='size-40 md:size-54' src="illustration-empty.svg" alt='' width={1000} height={1000} />
          <h2 className='text-[22px] md:text-[27px] font-bold text-slate-100 my-5'>Results shown here</h2>
          <p className='text-[16px] md:text-[18px] font-medium text-slate-300'>
            Complete the form and click "calculate repayments" to see what your monthly repayments would be.
          </p>
        </div>
        : 
        <div className=' w-full max-w-[400px] m-auto'>
          <h2 className="text-[20px] md:text-[23px] text-slate-100 font-bold mb-4">Your results</h2>
          <p className="text-slate-300 text-[17px] md:text-[18px] mb-5 md:mb-8">
            Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again
          </p>

          <div className="bg-yellow-200 pt-1 rounded-md">
            <div className='bg-slate-800 rounded-md px-5 md:px-8'>
              <div className='py-6 md:py-8'>
              <p className="text-[15px] md:text-[16px] mb-2 md:mb-3 text-slate-400">
                {mortgageType === "repayment"
                  ? "Your monthly repayments"
                  : "Your monthly interest"}
              </p>

              <p className="text-yellow-200 text-5xl md:text-6xl font-medium">
                {mortgageType === "repayment"
                  ? format(calculations.monthlyRepayment)
                  : format(calculations.interestOnlyMonthly)}
              </p>
              </div>

              <div className="py-6 md:py-8 border-t border-slate-700">
                <p className="text-[15px] md:text-[16px] mb-2 md:mb-3 text-slate-400">Total you'll repay over the term</p>
                <p className="text-3xl font-bold text-slate-100">
                  {format(calculations.totalRepaid)}
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Result
