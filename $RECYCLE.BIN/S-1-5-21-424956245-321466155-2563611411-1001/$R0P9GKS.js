import React from 'react'

const consentData = [
  { title: "Consent", count: 40689 },
  { title: "Active", count: 100 },
  { title: "Expired", count: 8 },
  { title: "Reconsent", count: 12 },
];

const ConsentData = () => {
  return (
    <div>
         <div className="">
        <div className=" flex flex-wrap gap-5 md:gap-5  rounded-sm">
          {consentData.map((item, index) => (
            <div
              key={index}
              className="rounded-sm p-2 sm:pl-4 sm:pt-4 w-full sm:w-[288px] h-16 sm:h-[115px] flex flex-col items-start justify-start bg-white shadow-sm transition-shadow duration-300"
            >
              <h1 className="text-xs sm:text-base font-semibold text-black/60">
                {item.title}
              </h1>

              <p className="text-xl sm:text-4xl mt-2 font-bold bg-gradient-to-tr from-[#132F5F] via-[#2B5EB9] to-[#2D61C0] text-transparent bg-clip-text">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConsentData
