import logo from "./logo.svg";
import logo_dark from "./logo_dark.svg";
import search_icon from "./search_icon.svg";
import cross_icon from "./cross_icon.svg";
import upload_area from "./upload_area.svg";
import sketch from "./sktech.svg";
import microsoft_logo from "./microsoft_logo.svg";
import walmart_logo from "./walmart_logo.svg";
import accenture_logo from "./accenture_logo.svg";
import adobe_logo from "./adobe_logo.svg";
import paypal_logo from "./paypal_logo.svg";
import course_1_thumbnail from "./course_1.png";
import course_2_thumbnail from "./course_2.png";
import course_3_thumbnail from "./course_3.png";
import course_4_thumbnail from "./course_4.png";
import star from "./rating_star.svg";
import star_blank from "./star_dull_icon.svg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.png";
import arrow_icon from "./arrow_icon.svg";
import down_arrow_icon from "./down_arrow_icon.svg";
import time_left_clock_icon from "./time_left_clock_icon.svg";
import time_clock_icon from "./time_clock_icon.svg";
import user_icon from "./user_icon.svg";
import home_icon from "./home_icon.svg";
import add_icon from "./add_icon.svg";
import my_course_icon from "./my_course_icon.svg";
import person_tick_icon from "./person_tick_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import file_upload_icon from "./file_upload_icon.svg";
import appointments_icon from "./appointments_icon.svg";
import earning_icon from "./earning_icon.svg";
import dropdown_icon from "./dropdown_icon.svg";
import patients_icon from "./patients_icon.svg";
import play_icon from "./play_icon.svg";
import blue_tick_icon from "./blue_tick_icon.svg";
import course_4 from "./course_4.png";
import profile_img from "./profile_img.png";
import profile_img2 from "./profile_img2.png";
import profile_img3 from "./profile_img3.png";
import lesson_icon from "./lesson_icon.svg";

export const assets = {
  logo,
  search_icon,
  sketch,
  microsoft_logo,
  walmart_logo,
  accenture_logo,
  adobe_logo,
  paypal_logo,
  course_1_thumbnail,
  course_2_thumbnail,
  course_3_thumbnail,
  course_4_thumbnail,
  star,
  star_blank,
  profile_img_1,
  profile_img_2,
  profile_img_3,
  arrow_icon,
  dropdown_icon,
  cross_icon,
  upload_area,
  logo_dark,
  down_arrow_icon,
  time_left_clock_icon,
  time_clock_icon,
  user_icon,
  home_icon,
  add_icon,
  my_course_icon,
  person_tick_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  course_4,
  file_upload_icon,
  appointments_icon,
  earning_icon,
  patients_icon,
  profile_img,
  profile_img2,
  profile_img3,
  play_icon,
  blue_tick_icon,
  lesson_icon,
};

export const dummyEducatorData = {
  _id: "675ac1512100b91a6d9b8b24",
  name: "GreatStack",
  email: "user.greatstack@gmail.com",
  imageUrl:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yclFkaDBOMmFqWnBoTTRBOXZUanZxVlo0aXYifQ",
  createdAt: "2024-12-12T10:56:17.930Z",
  updatedAt: "2024-12-12T10:56:17.930Z",
  __v: 0,
};

export const dummyTestimonial = [
  {
    name: "Donald Jackman",
    role: "SWE 1 @ Amazon",
    image: assets.profile_img_1,
    rating: 5,
    feedback:
      "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: "Richard Nelson",
    role: "SWE 2 @ Samsung",
    image: assets.profile_img_2,
    rating: 4,
    feedback:
      "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: "James Washington",
    role: "SWE 2 @ Google",
    image: assets.profile_img_3,
    rating: 4.5,
    feedback:
      "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
];

export const dummyDashboardData = {
  totalEarnings: 707.38,
  enrolledStudentsData: [
    {
      courseTitle: "Introduction to JavaScript",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
    {
      courseTitle: "Advanced Python Programming",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
    {
      courseTitle: "Web Development Bootcamp",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
    {
      courseTitle: "Data Science with Python",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
    {
      courseTitle: "Cybersecurity Basics",
      student: {
        _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
        name: "Great Stack",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
      },
    },
  ],
  totalCourses: 8,
};

export const dummyStudentEnrolled = [
  {
    student: {
      _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      name: "GreatStack",
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
    },
    courseTitle: "Introduction to JavaScript",
    purchaseDate: "2024-12-20T08:39:55.509Z",
  },
  {
    student: {
      _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      name: "GreatStack",
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
    },
    courseTitle: "Introduction to JavaScript",
    purchaseDate: "2024-12-20T08:59:49.964Z",
  },
  {
    student: {
      _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      name: "GreatStack",
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
    },
    courseTitle: "Advanced Python Programming",
    purchaseDate: "2024-12-20T11:03:42.931Z",
  },
  {
    student: {
      _id: "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      name: "GreatStack",
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ",
    },
    courseTitle: "Web Development Bootcamp",
    purchaseDate: "2024-12-20T11:04:48.798Z",
  },
];

export const dummyCourses = [
  {
    _id: "605c72efb3f1c2b1f8e4e1a1",
    courseTitle: "Introduction to JavaScript",
    courseDescription:
      "<h2>Master JavaScript Fundamentals</h2><p>Transform from beginner to confident JavaScript developer with our comprehensive course designed for aspiring web developers. JavaScript powers over 97% of websites worldwide, making it the most essential programming language for modern web development.</p><p>This course provides hands-on experience with real-world projects, interactive coding exercises, and industry best practices. You'll learn from industry experts who have built applications used by millions of users.</p><h3>What You'll Master:</h3><ul><li><strong>Core JavaScript Concepts:</strong> Variables, functions, objects, arrays, and ES6+ features</li><li><strong>DOM Manipulation:</strong> Create dynamic, interactive web pages that respond to user actions</li><li><li><strong>Asynchronous Programming:</strong> Master promises, async/await, and API integration</li><li><strong>Modern Development Tools:</strong> Webpack, Babel, and modern JavaScript workflows</li><li><strong>Real-World Projects:</strong> Build a todo app, weather dashboard, and interactive portfolio</li></ul><p><strong>Perfect for:</strong> Complete beginners, career changers, and developers looking to strengthen their JavaScript foundation. No prior programming experience required.</p>",
    coursePrice: 49.99,
    isPublished: true,
    discount: 20,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Getting Started with JavaScript",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "What is JavaScript?",
            lectureDuration: 16,
            lectureUrl: "https://youtu.be/CBWnBi-awSA",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Setting Up Your Environment",
            lectureDuration: 19,
            lectureUrl: "https://youtu.be/4l87c2aeB4I",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Variables and Data Types",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Understanding Variables",
            lectureDuration: 20,
            lectureUrl: "https://youtu.be/pZQeBJsGoDQ",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Data Types in JavaScript",
            lectureDuration: 10,
            lectureUrl: "https://youtu.be/ufHT2WEkkC4",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [
      {
        userId: "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
        rating: 5,
        _id: "6773e37360cb0ab974342314",
      },
    ],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2025-01-02T04:47:44.701Z",
    __v: 4,
    courseThumbnail: "https://img.youtube.com/vi/CBWnBi-awSA/maxresdefault.jpg",
  },
  {
    _id: "675ac1512100b91a6d9b8b24",
    courseTitle: "Advanced Python Programming",
    courseDescription:
      "<h2>Advanced Python Mastery</h2><p>Elevate your Python programming skills to expert level with our advanced course designed for developers ready to tackle complex, enterprise-level applications. Python is the fastest-growing programming language, powering everything from AI and machine learning to web development and automation.</p><p>This intensive course combines theoretical knowledge with practical implementation, featuring advanced patterns, performance optimization, and industry-standard practices used by top tech companies.</p><h3>Advanced Topics Covered:</h3><ul><li><strong>Advanced OOP:</strong> Metaclasses, descriptors, and design patterns</li><li><strong>Functional Programming:</strong> Decorators, generators, context managers, and closures</li><li><strong>Performance Optimization:</strong> Profiling, memory management, and concurrent programming</li><li><strong>Enterprise Patterns:</strong> Dependency injection, factory patterns, and architectural design</li><li><strong>Real-World Applications:</strong> Build a microservice architecture and data processing pipeline</li></ul><p><strong>Prerequisites:</strong> Intermediate Python knowledge and 6+ months of programming experience recommended.</p>",
    coursePrice: 79.99,
    isPublished: true,
    discount: 15,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Advanced Data Structures",
        chapterContent: [
          {
            lectureId: " lecture1",
            lectureTitle: "Lists and Tuples",
            lectureDuration: 720,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Dictionaries and Sets",
            lectureDuration: 850,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Object-Oriented Programming",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Classes and Objects",
            lectureDuration: 900,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Inheritance and Polymorphism",
            lectureDuration: 950,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [
      {
        userId: "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
        rating: 5,
        _id: "6776369244daad0f313d81a9",
      },
    ],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2025-01-02T06:47:54.446Z",
    __v: 3,
    courseThumbnail: "https://img.youtube.com/vi/HdLIMoQkXFA/maxresdefault.jpg",
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1ae",
    courseTitle: "Cybersecurity Basics",
    courseDescription:
      "<h2>Cybersecurity Fundamentals & Ethical Hacking</h2><p>Protect organizations from cyber threats with our comprehensive cybersecurity course designed for IT professionals and aspiring security experts. With cyber attacks increasing by 600% in recent years, cybersecurity skills are in massive demand across all industries.</p><p>Learn from certified ethical hackers and security professionals who have defended Fortune 500 companies. This hands-on course includes real-world attack simulations, penetration testing labs, and incident response scenarios.</p><h3>Security Domains Covered:</h3><ul><li><strong>Threat Analysis:</strong> Identify and assess security vulnerabilities and attack vectors</li><li><strong>Ethical Hacking:</strong> Penetration testing methodologies and tools (Kali Linux, Metasploit)</li><li><strong>Cryptography:</strong> Encryption algorithms, digital signatures, and secure communications</li><li><strong>Network Security:</strong> Firewalls, intrusion detection, and secure network architecture</li><li><strong>Incident Response:</strong> Forensic analysis, malware detection, and recovery procedures</li></ul><p><strong>Career Path:</strong> Prepare for certifications like CEH, Security+, and CISSP. Ideal for IT professionals transitioning to cybersecurity roles.</p>",
    coursePrice: 69.99,
    isPublished: true,
    discount: 15,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Introduction to Cybersecurity",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "What is Cybersecurity?",
            lectureDuration: 10,
            lectureUrl: "https://youtu.be/samplelink5",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Types of Cyber Threats",
            lectureDuration: 18,
            lectureUrl: "https://youtu.be/samplelink6",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Basic Security Practices",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Password Management",
            lectureDuration: 15,
            lectureUrl: "https://youtu.be/samplelink7",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Network Security Essentials",
            lectureDuration: 20,
            lectureUrl: "https://youtu.be/samplelink8",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [],
    createdAt: "2024-12-27T11:30:00.000Z",
    updatedAt: "2024-12-31T04:14:49.773Z",
    __v: 2,
    courseThumbnail: "https://img.youtube.com/vi/jZFaMEqEqEQ/maxresdefault.jpg",
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a7",
    courseTitle: "Web Development Bootcamp",
    courseDescription:
      "<h2>Complete Full-Stack Web Development Bootcamp</h2><p>Launch your career as a full-stack developer with our intensive bootcamp that transforms beginners into job-ready professionals in just 12 weeks. Our graduates have landed positions at Google, Microsoft, Amazon, and top startups worldwide.</p><p>This comprehensive program covers the entire web development stack with hands-on projects, code reviews, and career mentorship. You'll build 5+ portfolio projects including a full e-commerce platform and social media application.</p><h3>Complete Technology Stack:</h3><ul><li><strong>Frontend:</strong> HTML5, CSS3, JavaScript ES6+, React.js, Redux, and responsive design</li><li><strong>Backend:</strong> Node.js, Express.js, RESTful APIs, and microservices architecture</li><li><strong>Databases:</strong> MongoDB, PostgreSQL, and Redis for caching</li><li><strong>DevOps:</strong> Docker, AWS deployment, CI/CD pipelines, and cloud services</li><li><strong>Industry Tools:</strong> Git, GitHub, VS Code, Postman, and modern development workflows</li></ul><p><strong>Career Support:</strong> Includes resume building, interview prep, and job placement assistance. 95% of graduates find employment within 6 months.</p>",
    coursePrice: 99.99,
    isPublished: true,
    discount: 25,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "HTML & CSS Basics",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "Introduction to HTML",
            lectureDuration: 600,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Styling with CSS",
            lectureDuration: 720,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "JavaScript Fundamentals",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "JavaScript Basics",
            lectureDuration: 800,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "DOM Manipulation",
            lectureDuration: 850,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2024-12-31T05:31:27.290Z",
    __v: 2,
    courseThumbnail: "https://img.youtube.com/vi/lpx2zFkapIk/maxresdefault.jpg",
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1ac",
    courseTitle: "Cloud Computing Essentials",
    courseDescription:
      "<h2>Cloud Computing & AWS Mastery</h2><p>Master cloud computing fundamentals and become AWS-certified with our comprehensive course designed for IT professionals and developers. Cloud computing is the backbone of modern technology, with AWS controlling 32% of the global cloud market.</p><p>Learn from AWS-certified solutions architects who have designed cloud infrastructure for enterprise clients. This course includes hands-on labs, real-world case studies, and preparation for AWS certification exams.</p><h3>Cloud Technologies Covered:</h3><ul><li><strong>AWS Core Services:</strong> EC2, S3, RDS, Lambda, and CloudFormation</li><li><strong>Multi-Cloud Strategy:</strong> AWS, Azure, and Google Cloud Platform comparison</li><li><strong>Serverless Architecture:</strong> Microservices, API Gateway, and event-driven computing</li><li><strong>DevOps Integration:</strong> CI/CD pipelines, infrastructure as code, and monitoring</li><li><strong>Security & Compliance:</strong> IAM, encryption, compliance frameworks, and best practices</li></ul><p><strong>Certification Path:</strong> Prepare for AWS Solutions Architect Associate and Cloud Practitioner certifications.</p>",
    coursePrice: 69.99,
    isPublished: true,
    discount: 20,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Cloud Fundamentals",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "What is Cloud Computing?",
            lectureDuration: 600,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Cloud Service Models",
            lectureDuration: 720,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Exploring Cloud Platforms",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "AWS Basics",
            lectureDuration: 800,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Introduction to Google Cloud",
            lectureDuration: 850,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: ["user_2qjlgkAqIMpiR2flWIRzvWKtE0w"],
    courseRatings: [],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2024-12-31T05:32:55.357Z",
    __v: 1,
    courseThumbnail: "https://img.youtube.com/vi/0yboGn8errU/maxresdefault.jpg",
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1ad",
    courseTitle: "Data Science with Python",
    courseDescription:
      "<h2>Data Science & Analytics Mastery</h2><p>Launch your career in data science with our comprehensive course that transforms raw data into actionable business insights. Data science roles have grown 650% in the past 5 years, with average salaries exceeding $120,000 annually.</p><p>Learn from data scientists who have worked at Netflix, Spotify, and Fortune 500 companies. This hands-on course includes real datasets, industry projects, and machine learning model deployment.</p><h3>Data Science Toolkit:</h3><ul><li><strong>Python Ecosystem:</strong> Pandas, NumPy, Matplotlib, Seaborn, and Plotly for data manipulation</li><li><strong>Machine Learning:</strong> Scikit-learn, TensorFlow, and advanced algorithms</li><li><strong>Statistical Analysis:</strong> Hypothesis testing, regression analysis, and A/B testing</li><li><strong>Big Data Tools:</strong> Apache Spark, Hadoop, and cloud-based analytics platforms</li><li><strong>Business Intelligence:</strong> Tableau, Power BI, and dashboard creation</li></ul><p><strong>Real Projects:</strong> Analyze customer behavior, predict sales trends, and build recommendation systems using real industry datasets.</p>",
    coursePrice: 89.99,
    isPublished: true,
    discount: 20,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Python for Data Science",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "Python Basics",
            lectureDuration: 30,
            lectureUrl: "https://youtu.be/samplelink1",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Working with NumPy",
            lectureDuration: 25,
            lectureUrl: "https://youtu.be/samplelink2",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Data Visualization",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Introduction to Matplotlib",
            lectureDuration: 20,
            lectureUrl: "https://youtu.be/samplelink3",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Advanced Visualizations with Seaborn",
            lectureDuration: 25,
            lectureUrl: "https://youtu.be/samplelink4",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [
      {
        userId: "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
        rating: 5,
        _id: "6773acf160cb0ab974342248",
      },
    ],
    createdAt: "2024-12-27T10:00:00.000Z",
    updatedAt: "2024-12-31T09:57:48.992Z",
    __v: 3,
    courseThumbnail: "https://img.youtube.com/vi/E4znbZgUWzA/maxresdefault.jpg",
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1aa",
    courseTitle: "Data Science and Machine Learning",
    courseDescription:
      "<h2>Machine Learning & AI Fundamentals</h2><p>Master the fundamentals of machine learning and artificial intelligence with our comprehensive course designed for developers and data professionals. AI and ML are revolutionizing industries, with the global AI market projected to reach $1.8 trillion by 2030.</p><p>Learn from AI researchers and ML engineers who have built systems used by millions. This course combines theoretical foundations with practical implementation, featuring real-world projects and industry-standard tools.</p><h3>AI/ML Technologies:</h3><ul><li><strong>Core Algorithms:</strong> Linear regression, decision trees, neural networks, and ensemble methods</li><li><strong>Deep Learning:</strong> TensorFlow, PyTorch, CNNs, and RNNs for complex pattern recognition</li><li><strong>Natural Language Processing:</strong> Text analysis, sentiment analysis, and language models</li><li><strong>Computer Vision:</strong> Image recognition, object detection, and computer vision applications</li><li><strong>MLOps:</strong> Model deployment, monitoring, and production-ready ML systems</li></ul><p><strong>Industry Applications:</strong> Build recommendation systems, fraud detection models, and predictive analytics solutions.</p>",
    coursePrice: 89.99,
    isPublished: true,
    discount: 30,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Introduction to Data Science",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "What is Data Science?",
            lectureDuration: 600,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Data Collection and Cleaning",
            lectureDuration: 720,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Machine Learning Basics",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Supervised vs Unsupervised Learning",
            lectureDuration: 800,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Building Your First Model",
            lectureDuration: 850,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: ["user_2qjlgkAqIMpiR2flWIRzvWKtE0w"],
    courseRatings: [],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2025-01-02T06:53:59.753Z",
    __v: 1,
    courseThumbnail: "https://img.youtube.com/vi/631lFJdQvoo/maxresdefault.jpg",
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1ab",
    courseTitle: "Introduction to Cybersecurity",
    courseDescription:
      "<h2>Cybersecurity Essentials & Risk Management</h2><p>Build a solid foundation in cybersecurity with our comprehensive course designed for IT professionals and security enthusiasts. With cybercrime costs reaching $6 trillion annually, organizations desperately need skilled cybersecurity professionals.</p><p>Learn from certified security experts who have protected critical infrastructure and enterprise systems. This course covers threat landscape analysis, risk assessment methodologies, and practical security implementation strategies.</p><h3>Security Fundamentals:</h3><ul><li><strong>Threat Intelligence:</strong> Malware analysis, attack vectors, and threat modeling</li><li><strong>Risk Management:</strong> Security frameworks, compliance standards, and risk assessment</li><li><strong>Network Security:</strong> Firewalls, VPNs, intrusion detection, and secure protocols</li><li><strong>Identity & Access Management:</strong> Authentication, authorization, and privilege management</li><li><strong>Security Operations:</strong> Incident response, forensic analysis, and security monitoring</li></ul><p><strong>Career Preparation:</strong> Ideal for Security+, CISSP, and CISM certification preparation. Perfect for IT professionals transitioning to cybersecurity roles.</p>",
    coursePrice: 59.99,
    isPublished: true,
    discount: 15,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Cybersecurity Basics",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "Introduction to Cybersecurity",
            lectureDuration: 700,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Understanding Cyber Threats",
            lectureDuration: 750,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Network Security Fundamentals",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Securing Networks",
            lectureDuration: 800,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Firewalls and VPNs",
            lectureDuration: 850,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: ["user_2qjlgkAqIMpiR2flWIRzvWKtE0w"],
    courseRatings: [],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2025-01-02T06:56:13.208Z",
    __v: 1,
    courseThumbnail: "https://img.youtube.com/vi/WbV3zRgpw_E/maxresdefault.jpg",
  },
];
