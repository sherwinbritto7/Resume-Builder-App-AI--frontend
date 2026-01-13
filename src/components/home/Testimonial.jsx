import React from "react";
import { BookUserIcon } from "lucide-react";
import Title from "./Title";

const Testimonial = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
      text: "The AI resume builder helped me land interviews in half the time! Templates are professional and customizable.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
      text: "I loved the AI suggestions—they made my resume stand out for every job I applied to.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordantalks",
      text: "Customizable templates and instant downloads saved me so much time. Highly recommend!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Taylor Smith",
      handle: "@taylorwrites",
      text: "AI-powered proofreading ensured my resume was error-free and professional.",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-3 items-center">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={card.image}
          alt={`${card.name} photo`}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-slate-800">{card.name}</p>

            {/* Verified Tick */}
            <span className="flex items-center justify-center w-4 h-4 bg-green-500 rounded-full">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          </div>

          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">{card.text}</p>
    </div>
  );

  return (
    <>
      <div
        id="testimonials"
        className="flex flex-col items-center my-10 scroll-mt-12"
      >
        <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-6 py-1.5 mb-4">
          <BookUserIcon className="w-4.5 h-4.5 stroke-green-500" />
          <span>Testimonials</span>
        </div>
        <Title
          title="Don't just take our word for it"
          description="Hear from users who transformed their job search with our AI Resume Builder."
        />
      </div>

      {/* Marquee carousel */}
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, i) => (
            <CreateCard key={i} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto overflow-hidden mt-6">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, i) => (
            <CreateCard key={i} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* Marquee animation */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
