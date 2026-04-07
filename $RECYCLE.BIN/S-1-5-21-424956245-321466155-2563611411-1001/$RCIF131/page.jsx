import React from 'react'

function page() {
  return (
    <div className="md:max-w-[83vw] max-w-7xl mx-auto border-l border-r border-[#b9b8b8]">
      <div className="w-[75%] mx-24 mb-10">
        <h1 className="text-[30px] font-semibold my-8">Getting Started</h1>
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-[#f1f5fc] hover:bg-[#d6e8ff] w-[370px] h-[220px] p-6 flex flex-col gap-4"
              >
                <div>
                  <Image
                    src={guide.image}
                    height={100}
                    width={100}
                    alt={guide.title}
                    className="w-[45px] h-[45px]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl">{guide.title}</h1>
                  <p className="text-sm">{guide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page
