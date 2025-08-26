import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

// --- AnimatedPlaceholder Component ---

const AnimatedPlaceholder = ({ color }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${color} 0%, transparent 40%)`,
        }}
        animate={{
          x: ["0%", "-100%", "0%"],
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 0% 100%, ${color} 0%, transparent 40%)`,
        }}
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "-100%", "0%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
          delay: 7.5,
        }}
      />
      <div className="absolute inset-0 backdrop-blur-md bg-black/20" />
    </div>
  );
};

AnimatedPlaceholder.propTypes = {
  color: PropTypes.string.isRequired,
};

// --- Project Data ---
const projects = [
  {
    title: "A sleek portfolio built with React and Tailwind CSS",
    description:
      "A sleek portfolio built with React and Tailwind CSS to showcase your skills, projects, and experience in a modern design.",
    color: "#8f89ff",
    githubLink: "https://github.com/Sanchitasharda/sanchita-portfolio.git",
  },
  {
    title: "🚀 Dev-10",
    description:
      "A comprehensive resource hub, made specifically for all types of experienced, as well as aspiring developers, using the MERN stack.",
    color: "#4ade80",
    githubLink: "https://github.com/Sanchitasharda/dev-10.git",
  },
  {
    title: "Image Converter Chrome Extension",
    description:
      "Built a Chrome extension for fast image conversion and editing (formats + brightness/contrast/saturation) using React, TypeScript, TailwindCSS, and WXT.",
    color: "#5196fd",
    githubLink:
      "https://github.com/Sanchitasharda/image-converter-extension.git",
  },
  {
    title: "Quote Generator",
    description:
      "A Random Quote Generator that displays dynamic quotes with each click, built using JavaScript, HTML, and CSS.",
    color: "#ed649e",
    githubLink: "https://github.com/Sanchitasharda/quote-generator.git",
  },
];

// --- Main Projects Component ---
export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // This part remains unchanged
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                githubLink={project.githubLink}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

// --- Card Component (Updated) ---
function Card({
  i,
  title,
  description,
  color,
  progress,
  range,
  targetScale,
  githubLink,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          {/* MODIFIED: Image section replaced with AnimatedPlaceholder */}
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative">
            <AnimatedPlaceholder color={color} />
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          {/* Content section */}
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>
            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />
              <div className="flex items-center gap-4">
                {/* GitHub Link */}
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span
                    className="text-xs md:text-sm font-medium"
                    style={{ color }}
                  >
                    Code
                  </span>
                </motion.a>
                {/* REMOVED: The Live Link is now gone */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- PropTypes validation (Updated) ---
Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
};
