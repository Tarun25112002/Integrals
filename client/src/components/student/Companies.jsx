import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="w-full py-6 px-4 sm:py-8">
      <p className="text-gray-500 text-center text-sm sm:text-base mb-4">
        Trusted by learners from
      </p>
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap opacity-70">
        <a
          href="https://www.microsoft.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Microsoft"
          className="flex-shrink-0"
        >
          <img
            src={assets.microsoft_logo}
            alt="Microsoft"
            className="h-6 sm:h-7 md:h-8 cursor-pointer hover:opacity-100 transition-opacity"
          />
        </a>
        <a
          href="https://www.walmart.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Walmart"
          className="flex-shrink-0"
        >
          <img
            src={assets.walmart_logo}
            alt="Walmart"
            className="h-6 sm:h-7 md:h-8 cursor-pointer hover:opacity-100 transition-opacity"
          />
        </a>
        <a
          href="https://www.accenture.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Accenture"
          className="flex-shrink-0"
        >
          <img
            src={assets.accenture_logo}
            alt="Accenture"
            className="h-6 sm:h-7 md:h-8 cursor-pointer hover:opacity-100 transition-opacity"
          />
        </a>
        <a
          href="https://www.adobe.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Adobe"
          className="flex-shrink-0"
        >
          <img
            src={assets.adobe_logo}
            alt="Adobe"
            className="h-6 sm:h-7 md:h-8 cursor-pointer hover:opacity-100 transition-opacity"
          />
        </a>
        <a
          href="https://www.paypal.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PayPal"
          className="flex-shrink-0"
        >
          <img
            src={assets.paypal_logo}
            alt="PayPal"
            className="h-6 sm:h-7 md:h-8 cursor-pointer hover:opacity-100 transition-opacity"
          />
        </a>
      </div>
    </div>
  );
};

export default Companies;
