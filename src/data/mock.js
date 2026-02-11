// Mock data for Praveen Garg's Portfolio

export const personalInfo = {
  name: "Praveen Garg",
  title: "Web Developer & Data Scientist",
  tagline: "Crafting intelligent digital solutions with code and creativity",
  email: "gargparveen.sp@gmail.com",
  phone: "+919667117347",
  linkedin: "https://www.linkedin.com/in/praveen-garg-67148228b",
  github: "#",
  location: "Delhi, India",
  bio: "Versatile and results-driven Computer Application student with a strong foundation in Web Development and Data Science. Proficient in HTML, CSS, JavaScript, PHP, Python, and WordPress, with hands-on experience in machine learning and deep learning projects. Skilled in building intelligent systems including gesture translators, personality predictors, and vehicle detectors. Passionate about crafting user-centric digital solutions, combining technical development with UI/UX design expertise.",
  resumeUrl: "/Praveen_Garg_Resume.pdf",
  pptUrl: "/Evolution-and-Vision-of-the-Internet-of-Things.pptx"
};

export const experience = [
  {
    id: 1,
    company: "Artificial Intelligence Experience Centre, IITM",
    role: "Technical Head",
    duration: "September 2024 - Present",
    type: "Leadership",
    description: "Leading technical initiatives and development projects",
    responsibilities: [
      "Designed and Developed aiec-iitm.in from scratch",
      "Leading team of developers and coordinating technical projects",
      "Implementing AI/ML solutions for various applications"
    ],
    technologies: ["WordPress", "Web Development", "Team Leadership"]
  },
  {
    id: 2,
    company: "VQMS PVT. LTD",
    role: "Web Development Intern",
    duration: "June 2024 - August 2024",
    type: "Internship",
    description: "Full-stack web development and design",
    responsibilities: [
      "Developed & designed gqmscertifications.com from scratch",
      "Revamped homepage of vqms.co.in using WordPress",
      "Designed posters and marketing materials for VQMS and OSPNL"
    ],
    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "Design"]
  }
];

export const education = [
  {
    id: 1,
    institution: "Institute of Information Technology & Management (GGSIPU)",
    degree: "Bachelor of Computer Application (BCA)",
    specialization: "Data Science",
    duration: "2023 - Present",
    cgpa: "8.4/10",
    coursework: ["C", "Python", "SQL", "JavaScript", "PHP", "HTML", "CSS", "Bootstrap"]
  },
  {
    id: 2,
    institution: "Hans Raj Smarak Senior Secondary School",
    degree: "Senior Secondary Education",
    specialization: "PCM with Computer Science",
    duration: "2018 - 2022",
    cgpa: "",
    coursework: []
  }
];

export const skills = {
  frontend: [
    { name: "HTML5", level: 70 },
    { name: "CSS3", level: 68 },
    { name: "JavaScript", level: 65 },
    { name: "WordPress", level: 72 }
  ],
  backend: [
    { name: "PHP", level: 65 },
    { name: "MySQL", level: 62 },
    { name: "Python", level: 70 }
  ],
  programming: [
    { name: "Java", level: 62 },
    { name: "C", level: 65 },
    { name: "Python", level: 70 }
  ],
  design: [
    { name: "Figma", level: 68 },
    { name: "Photoshop", level: 65 },
    { name: "UX Research", level: 62 },
    { name: "Wireframing", level: 66 }
  ],
  dataScience: [
    { name: "Machine Learning", level: 65 },
    { name: "Deep Learning", level: 62 },
    { name: "Data Analysis", level: 64 }
  ]
};

export const projects = [
  {
    id: 1,
    title: "Real-Time Hand Gesture Translator",
    category: "Machine Learning",
    description: "An intelligent system that translates hand gestures in real-time using computer vision and deep learning. Perfect for accessibility applications and human-computer interaction.",
    longDescription: "Developed a sophisticated hand gesture recognition system using OpenCV and TensorFlow. The system can detect and translate various hand gestures in real-time, making it useful for sign language translation and touchless interfaces.",
    technologies: ["Python", "OpenCV", "TensorFlow", "Deep Learning", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1593376893114-1aed528d80cf?w=800&q=80",
    github: "#",
    demo: "#",
    featured: true
  },
  {
    id: 2,
    title: "Personality Prediction Model",
    category: "Machine Learning",
    description: "ML model that predicts personality traits based on behavioral patterns and data inputs, using advanced algorithms and psychological frameworks.",
    longDescription: "Built a comprehensive personality prediction system using machine learning algorithms. The model analyzes various data points to predict personality traits based on the Big Five personality model.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Machine Learning", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    github: "#",
    demo: "#",
    featured: true
  },
  {
    id: 3,
    title: "Biological Age Estimator and Analyzer",
    category: "Data Science",
    description: "Advanced system that estimates biological age using health metrics and provides comprehensive analysis with actionable insights for better health management.",
    longDescription: "Created a data-driven application that calculates biological age based on various health parameters. The system provides detailed analysis and recommendations for improving health and longevity.",
    technologies: ["Python", "Data Science", "Statistical Analysis", "Health Analytics"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    github: "#",
    demo: "#",
    featured: true
  },
  {
    id: 4,
    title: "Vehicle Image Detection System",
    category: "Deep Learning",
    description: "Deep learning-powered vehicle detection system using convolutional neural networks for accurate identification and classification of vehicles in images.",
    longDescription: "Implemented a robust vehicle detection system using deep learning techniques. The system can identify and classify different types of vehicles with high accuracy, useful for traffic management and surveillance.",
    technologies: ["Python", "TensorFlow", "CNN", "Deep Learning", "Image Processing"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    github: "#",
    demo: "#",
    featured: false
  },
  {
    id: 5,
    title: "AIEC IITM Website",
    category: "Web Development",
    description: "Official website for Artificial Intelligence Experience Centre at IITM, featuring modern design and comprehensive information architecture.",
    longDescription: "Designed and developed the complete website for AI Experience Centre from scratch, implementing modern web technologies and user-centric design principles.",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    github: "#",
    demo: "https://aiec-iitm.in",
    featured: true
  },
  {
    id: 6,
    title: "GQMS Certification Platform",
    category: "Web Development",
    description: "Complete certification management platform built from scratch, handling user registrations, course management, and certificate generation.",
    longDescription: "Developed a full-featured certification platform for GQMS, implementing user authentication, course enrollment, progress tracking, and automated certificate generation.",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "CSS"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    github: "#",
    demo: "https://gqmscertifications.com",
    featured: false
  }
];

export const certifications = [
  {
    id: 1,
    name: "UX Design Professional Certificate",
    issuer: "Google",
    date: "2024",
    credentialUrl: "#"
  },
  {
    id: 2,
    name: "AI/ML using Python",
    issuer: "Shapemyskill Pvt. Ltd.",
    date: "2024",
    credentialUrl: "#"
  }
];

export const achievements = [
  {
    id: 1,
    title: "Runner-Up in AI Innovations",
    organization: "IITM Janakpuri",
    description: "Secured second position in the AI Innovation competition",
    date: "2024"
  },
  {
    id: 2,
    title: "Tech Fest Coordinator",
    organization: "IITM",
    description: "Coordinated Tech Fest 2025 at Institute of Information Technology & Management",
    date: "2025"
  },
  {
    id: 3,
    title: "Social Media Infographic Competition",
    organization: "IITM Janakpuri",
    description: "Participated in From Idea-to-Impact competition",
    date: "2024"
  },
  {
    id: 4,
    title: "Bharat Drone Manthan 2024",
    organization: "PHDCCI, Delhi",
    description: "Participated in national drone technology event",
    date: "2024"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Machine Learning in Python",
    excerpt: "A comprehensive guide for beginners looking to dive into the world of machine learning using Python and scikit-learn.",
    content: "Full article content here...",
    category: "Machine Learning",
    author: "Praveen Garg",
    date: "2024-12-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    tags: ["Machine Learning", "Python", "Tutorial"]
  },
  {
    id: 2,
    title: "Modern Web Development Best Practices in 2025",
    excerpt: "Exploring the latest trends and best practices in web development, from performance optimization to accessibility.",
    content: "Full article content here...",
    category: "Web Development",
    author: "Praveen Garg",
    date: "2024-12-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    tags: ["Web Development", "Best Practices", "2025"]
  },
  {
    id: 3,
    title: "Building Intelligent Systems with Deep Learning",
    excerpt: "Dive deep into neural networks and learn how to build intelligent systems that can see, understand, and make decisions.",
    content: "Full article content here...",
    category: "Deep Learning",
    author: "Praveen Garg",
    date: "2024-12-05",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["Deep Learning", "AI", "Neural Networks"]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Professor, IITM",
    company: "IITM Janakpuri",
    content: "Praveen is an exceptional student with a rare combination of technical expertise and creative problem-solving abilities. His work on AI projects has been outstanding.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Amit Sharma",
    role: "CEO",
    company: "VQMS PVT. LTD",
    content: "Working with Praveen was a pleasure. He delivered high-quality work on time and showed great initiative in improving our web presence. Highly recommended!",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Malhotra",
    role: "Project Manager",
    company: "Tech Solutions Inc.",
    content: "Praveen's attention to detail and ability to understand complex requirements makes him stand out. His technical skills combined with UX sensibility create exceptional results.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    rating: 5
  }
];