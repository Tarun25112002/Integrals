import { assets } from "../../assets/assets";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const companies = [
  {
    name: "Microsoft",
    logo: assets.microsoft_logo,
    url: "https://www.microsoft.com",
  },
  {
    name: "Walmart",
    logo: assets.walmart_logo,
    url: "https://www.walmart.com",
  },
  {
    name: "Accenture",
    logo: assets.accenture_logo,
    url: "https://www.accenture.com",
  },
  { name: "Adobe", logo: assets.adobe_logo, url: "https://www.adobe.com" },
  { name: "PayPal", logo: assets.paypal_logo, url: "https://www.paypal.com" },
];

const Companies = () => {
  const scrollerRef = useRef(null);
  const animationRef = useRef(null);
  const duplicatedCompanies = [...companies, ...companies];

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const scrollWidth = scroller.scrollWidth / 2;

    gsap.set(scroller, { x: 0 });

    animationRef.current = gsap.to(scroller, {
      x: -scrollWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="w-full py-6 px-4 sm:py-8">
      <p className="text-gray-500 text-center text-sm sm:text-base mb-4">
        Trusted by learners from
      </p>
      <div className="w-full overflow-hidden">
        <div
          ref={scrollerRef}
          className="flex items-center gap-6 sm:gap-8 md:gap-12"
          style={{ width: "fit-content" }}
        >
          {duplicatedCompanies.map((company, index) => (
            <a
              key={index}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={company.name}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-3 sm:h-4 md:h-5 cursor-pointer object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "inline-block";
                }}
              />
              <span
                className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap"
                style={{ display: "none" }}
              >
                {company.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
