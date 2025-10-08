import { dummyTestimonial } from "../../assets/assets";
import { assets } from "../../assets/assets";
const TestimonialsSection = () => {
  return (
    <div className="pb-16 px-6 md:px-0 max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          What learners say
        </h2>
        <p className="md:text-base text-gray-500 mt-3">
          Hear how our courses helped learners grow their careers and
          confidence.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col justify-between text-left"
          >
            <div className="p-6">
              <div
                className="flex items-center gap-2"
                aria-label={`Rating: ${Math.floor(
                  testimonial.rating
                )} out of 5`}
              >
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 w-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt={
                      i < Math.floor(testimonial.rating)
                        ? "filled star"
                        : "empty star"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {testimonial.feedback}
              </p>
            </div>

            <div className="px-6 pb-6 flex items-center gap-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
