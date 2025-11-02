import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.toLowerCase()));
      const scrollPosition = window.scrollY + 150;

      setIsScrolled(window.scrollY > 50);

      let currentSection = 'home';
      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = section.id;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = isDarkMode
    ? `bg-gray-800/70 border-gray-700/50`
    : `bg-white/70 border-slate-200/50`;

  const scrolledClasses = isScrolled ? `backdrop-blur-xl shadow-lg` : `border-transparent`;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolledClasses} ${navClasses}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <motion.div
          className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          whileHover={{ scale: 1.05 }}
        >
          LM
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`font-medium relative transition-colors duration-300 ${activeSection === link.toLowerCase() ? (isDarkMode ? 'text-emerald-400' : 'text-indigo-600') : (isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
            >
              {link}
              {activeSection === link.toLowerCase() && (
                <motion.div
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 ${isDarkMode ? 'bg-emerald-400' : 'bg-indigo-600'}`}
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </a>
          ))}
          <motion.button
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isDarkMode ?
              'bg-gray-700/80 text-white hover:bg-gray-600/80' :
              'bg-slate-100/80 text-gray-800 hover:bg-slate-200/80'
              }`}
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="text-xl block"
              key={isDarkMode ? 'sun' : 'moon'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <motion.button
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isDarkMode ?
              'bg-gray-700/80 text-white hover:bg-gray-600/80' :
              'bg-slate-100/80 text-gray-800 hover:bg-slate-200/80'
              }`}
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="text-xl block"
              key={isDarkMode ? 'sun-mobile' : 'moon-mobile'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={`flex flex-col items-center space-y-4 py-4 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-slate-200/50'}`}>
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`font-medium text-lg ${activeSection === link.toLowerCase() ? (isDarkMode ? 'text-emerald-400' : 'text-indigo-600') : (isDarkMode ? 'text-gray-300' : 'text-gray-600')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};


const HeroSection = ({ isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const heroClasses = isDarkMode ? 'bg-gray-900 text-white' : 'bg-slate-50 text-gray-900';
  const headingClasses = isDarkMode ? 'from-emerald-400 via-cyan-400 to-blue-500' : 'from-indigo-600 via-purple-600 to-pink-600';
  const textClasses = isDarkMode ? 'text-gray-300' : 'text-slate-600';
  const ctaButtonClasses = isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white shadow-emerald-500/25' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/25';
  const viewWorkButtonClasses = isDarkMode ? 'border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900' : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white';

  return (
    <motion.section
      id="home"
      className={`relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden transition-all duration-700 ${heroClasses}`}
    >
      {/* Breathing gradient background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className={`absolute inset-0 opacity-60 ${isDarkMode ?
            'bg-gradient-to-br from-emerald-900/30 via-cyan-900/30 to-blue-900/30' :
            'bg-gradient-to-br from-indigo-200/40 via-purple-200/40 to-pink-200/40'
            }`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute inset-0 opacity-40 ${isDarkMode ?
            'bg-gradient-to-tl from-blue-900/30 via-emerald-900/30 to-cyan-900/30' :
            'bg-gradient-to-tl from-pink-200/40 via-indigo-200/40 to-purple-200/40'
            }`}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating orbs with breathing effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full ${isDarkMode ?
            'bg-gradient-to-r from-emerald-400/20 to-cyan-400/20' :
            'bg-gradient-to-r from-indigo-400/30 to-purple-400/30'
            } blur-xl`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full ${isDarkMode ?
            'bg-gradient-to-r from-cyan-400/20 to-blue-400/20' :
            'bg-gradient-to-r from-purple-400/30 to-pink-400/30'
            } blur-xl`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content container */}
      <motion.div
        className={`relative z-10 flex flex-col items-center justify-center text-center p-8 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-700 ${isDarkMode ?
          'bg-gray-800/80 border border-gray-700/50' :
          'bg-white/80 border border-white/50'
          }`}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className={`rounded-full w-28 h-28 flex items-center justify-center mb-6 ${isDarkMode ?
            'bg-gradient-to-r from-gray-700 to-gray-600 shadow-lg shadow-emerald-500/10' :
            'bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg shadow-indigo-500/10'
            }`}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://placehold.co/100x100/1e293b/ffffff?text=LM"
            alt="Lekhraj Mahajan"
            className="rounded-full w-24 h-24 border-4 border-white/30 shadow-lg"
          />
        </motion.div>

        <motion.h1
          className={`text-4xl md:text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${headingClasses}`}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        >
          Lekhraj Mahajan
        </motion.h1>

        <h2 className={`text-xl md:text-2xl font-semibold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>
          Frontend Developer
        </h2>

        <p className={`text-lg md:text-xl max-w-2xl mb-8 ${textClasses} leading-relaxed`}>
          Where great design meets clean code for exceptional user experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            className={`font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center ${ctaButtonClasses}`}
            whileHover={{ y: -3, scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            whileTap={{ y: 0, scale: 0.98 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => document.getElementById('contact').scrollIntoView()}
          >
            Hire Me
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="ml-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView(); }}
            className={`font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center ${viewWorkButtonClasses}`}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ y: 0, scale: 0.98 }}
          >
            View My Work
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
};

const AboutSection = ({ isDarkMode }) => {
  const sectionClasses = isDarkMode ? 'bg-gray-800/90 text-white backdrop-blur-sm' : 'bg-white/90 text-gray-900 backdrop-blur-sm';
  const headingClasses = isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600';
  const textClasses = isDarkMode ? 'text-gray-200' : 'text-slate-700';

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="about"
      className={`p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden ${sectionClasses}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={itemVariants}
    >
      <motion.div
        className={`absolute inset-0 opacity-20 ${isDarkMode ?
          'bg-gradient-to-br from-emerald-600/20 to-cyan-600/20' :
          'bg-gradient-to-br from-indigo-400/20 to-purple-400/20'
          }`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative z-10">
        <motion.h2
          className={`text-3xl md:text-5xl font-bold mb-8 text-center ${headingClasses}`}
          style={{ backgroundSize: '200% 200%' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          About Me
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div className="flex-shrink-0" variants={itemVariants}>
            <motion.img
              src="https://placehold.co/200x200/2d3748/ffffff?text=LM"
              alt="Lekhraj Mahajan"
              className="w-48 h-48 rounded-full shadow-2xl border-4 border-white/20"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
          <motion.div className="flex-1 text-center md:text-left" variants={itemVariants}>
            <p className={`text-lg md:text-xl leading-relaxed ${textClasses}`}>
              Hi, I am a Frontend Developer with a strong foundation in JavaScript, React.js, Node.js, and Tailwind CSS. I enjoy creating responsive, scalable, and visually appealing web applications that provide smooth user experiences.
              <br /><br />
              As a fresher, I am eager to learn, take on challenging projects, and contribute to building modern web solutions. My interests also include exploring UI/UX design ideas and staying updated with the latest web development trends.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const SkillsSection = ({ isDarkMode }) => {
  const skills = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percentage: 50 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percentage: 75 },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', percentage: 85 },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg', percentage: 90 },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', percentage: 75 }
  ];

  const sectionClasses = isDarkMode ? 'bg-gray-800/90 text-white backdrop-blur-sm' : 'bg-white/90 text-gray-900 backdrop-blur-sm';
  const headingClasses = isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600';
  const textClasses = isDarkMode ? 'text-gray-300' : 'text-slate-600';
  const progressBg = isDarkMode ? 'bg-gray-700' : 'bg-slate-200';
  const progressBar = isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-gradient-to-r from-purple-500 to-indigo-500';

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="skills"
      className={`p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden ${sectionClasses}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={itemVariants}
    >
      <motion.div
        className={`absolute inset-0 opacity-20 ${isDarkMode ?
          'bg-gradient-to-br from-cyan-600/20 to-emerald-600/20' :
          'bg-gradient-to-br from-purple-400/20 to-indigo-400/20'
          }`}
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative z-10">
        <motion.h2
          className={`text-3xl md:text-5xl font-bold mb-12 text-center ${headingClasses}`}
          variants={itemVariants}
        >
          My Skills
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img src={skill.icon} alt={skill.name} className="w-6 h-6 mr-3" />
                  <span className={`font-medium ${textClasses}`}>{skill.name}</span>
                </div>
                <span className={`text-sm font-medium ${textClasses}`}>{skill.percentage}%</span>
              </div>
              <div className={`w-full ${progressBg} rounded-full h-2.5`}>
                <motion.div
                  className={`${progressBar} h-2.5 rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};


const ProjectsSection = ({ isDarkMode }) => {
  const projects = [
    {
      title: 'E-Commerce',
      description: 'A modern e-commerce platform built using HTML5, Tailwind CSS, and JavaScript, featuring a sleek and responsive user interface designed for seamless product browsing, smooth navigation, and an engaging online shopping experience across all devices.',
      image: '/image3.png',
      liveUrl: 'https://lekhrajmahajan.github.io/E-Commerce/index.html',
      githubUrl: 'https://github.com/LekhrajMahajan/E-Commerce',
    },
    {
      title: 'Construction',
      description: 'A web platform built with HTML5, Tailwind CSS, and JavaScript, designed for construction sites to track progress, manage updates, and showcase ongoing projects in a clean, responsive layout.',
      image: '/image2.png',
      liveUrl: 'https://lekhrajmahajan.github.io/Construction/',
      githubUrl: 'https://github.com/LekhrajMahajan/Construction',
    },
    {
      title: 'Condrinks',
      description: 'Built with HTML5, Tailwind CSS, and JavaScript, this responsive, mobile-first design features a smooth gradient background, interactive “Order Now” button, and a clean, minimal hero section for a modern user experience.',
      image: '/image1.png',
      liveUrl: 'https://lekhrajmahajan.github.io/Condrinks/',
      githubUrl: '#',
    },
  ];

  const sectionClasses = isDarkMode ? 'bg-gray-900/90 text-white backdrop-blur-sm' : 'bg-slate-100/90 text-gray-900 backdrop-blur-sm';
  const headingClasses = isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600';
  const cardClasses = isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white/90 border border-slate-200/50';
  const linkButtonClasses = isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white';
  const githubButtonClasses = isDarkMode ? 'border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900' : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="projects"
      className={`p-8 md:p-16 rounded-2xl shadow-2xl transition-all duration-700 relative overflow-hidden ${sectionClasses}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      {/* Background breathing gradient */}
      <motion.div
        className={`absolute inset-0 opacity-20 ${isDarkMode ?
          'bg-gradient-to-br from-purple-600/20 to-pink-600/20' :
          'bg-gradient-to-br from-purple-400/20 to-pink-400/20'
          }`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.h2
        className={`text-3xl md:text-6xl font-bold mb-10 text-center ${headingClasses}`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundSize: '100% 100%'
        }}
      >
        My Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${cardClasses}`}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02, boxShadow: isDarkMode ? "0 25px 50px -12px rgba(0, 0, 0, 0.6)" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                  {project.description}
                </p>
              </div>
              <div className="flex justify-between gap-3 mt-auto">
                <motion.a
                  href={project.liveUrl}
                  className={`flex-1 text-center font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-sm ${linkButtonClasses}`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  🚀 Live Demo
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  className={`flex-1 text-center font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-sm ${githubButtonClasses}`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const ContactSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // --- ⬇️ IMPORTANT: CONFIGURE EMAILJS TO SEND EMAILS ⬇️ ---
    // 1. Go to https://www.emailjs.com/
    // 2. Sign up for a free account.
    // 3. Add a new email service (e.g., "Gmail") and connect your lekhrajmahajan84@gmail.com account.
    // 4. Copy your "Service ID".
    // 5. Create a new email template. You can customize it, but make sure it uses variables like {{from_name}}, {{from_email}}, and {{message}}.
    // 6. Copy your "Template ID".
    // 7. Find your "Public Key" in your account settings.
    // 8. Replace the placeholder values below with your actual credentials.
    const serviceID = 'YOUR_SERVICE_ID'; // <-- PASTE YOUR SERVICE ID HERE
    const templateID = 'YOUR_TEMPLATE_ID'; // <-- PASTE YOUR TEMPLATE ID HERE
    const publicKey = 'YOUR_PUBLIC_KEY'; // <-- PASTE YOUR PUBLIC KEY HERE
    // --- ⬆️ END OF EMAILJS CONFIGURATION ⬆️ ---

    if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      console.warn("EmailJS is not configured. Simulating a successful email submission. Please follow the instructions in the code to set it up.");
      setTimeout(() => {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
        setTimeout(() => setSubmissionStatus(null), 5000);
      }, 1000);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: 'Lekhraj Mahajan',
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmissionStatus(null), 5000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setSubmissionStatus('error');
        setTimeout(() => setSubmissionStatus(null), 5000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const sectionClasses = isDarkMode ? 'bg-gray-800/90 text-white backdrop-blur-sm' : 'bg-white/90 text-gray-900 backdrop-blur-sm';
  const headingClasses = isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600';
  const inputClasses = isDarkMode ? 'bg-gray-700/80 text-white placeholder-gray-400 border-gray-600/50 focus:border-pink-400' : 'bg-slate-50/80 text-gray-900 placeholder-slate-500 border-slate-300/50 focus:border-pink-500';
  const linkClasses = isDarkMode ? 'text-gray-200' : 'text-slate-700';
  const iconLinkClasses = isDarkMode ? 'text-emerald-400 hover:text-white' : 'text-indigo-600 hover:text-black';
  const buttonClasses = isDarkMode ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white';

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="contact"
      className={`p-8 md:p-16 rounded-2xl shadow-2xl transition-all duration-700 relative overflow-hidden ${sectionClasses}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background breathing gradient */}
      <motion.div
        className={`absolute inset-0 opacity-20 ${isDarkMode ?
          'bg-gradient-to-br from-pink-600/20 to-rose-600/20' :
          'bg-gradient-to-br from-pink-400/20 to-rose-400/20'
          }`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.h2
        className={`text-3xl md:text-5xl font-bold mb-8 text-center ${headingClasses}`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      >
        Get In Touch
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        <div className="flex-1">
          <AnimatePresence>
            {submissionStatus && (
              <motion.div
                className={`p-4 mb-6 rounded-xl text-center ${submissionStatus === 'success' ?
                  (isDarkMode ? 'bg-emerald-900/80 text-emerald-200' : 'bg-emerald-100 text-emerald-800') :
                  (isDarkMode ? 'bg-rose-900/80 text-rose-200' : 'bg-rose-100 text-rose-800')
                  }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {submissionStatus === 'success' ? (
                  <strong>Success!</strong>
                ) : (
                  <strong>Error!</strong>
                )}
                {submissionStatus === 'success' ? ' Your message has been sent. Thank you!' : ' Something went wrong. Please try again.'}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.form
            className="contact-form space-y-6"
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 border backdrop-blur-sm ${inputClasses}`}
              variants={formVariants}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 border backdrop-blur-sm ${inputClasses}`}
              variants={formVariants}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className={`w-full rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 border backdrop-blur-sm resize-none ${inputClasses}`}
              variants={formVariants}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center ${buttonClasses}`}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              variants={formVariants}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <p className={`text-lg text-center leading-relaxed ${linkClasses}`}>
            Connect with me on social media or download my resume.
          </p>

          <div className="flex gap-6 text-2xl flex-wrap justify-center">
            <motion.a
              href="https://www.linkedin.com/in/lekhraj-mahajan-1212b6364/"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-all duration-300 p-3 rounded-lg ${iconLinkClasses}`}
              title="LinkedIn"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://github.com/LekhrajMahajan?tab=repositories"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-all duration-300 p-3 rounded-lg ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-black'}`}
              title="GitHub"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:lekhrajmahajan84@gmail.com"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-all duration-300 p-3 rounded-lg ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-black'}`}
              title="Email"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636C.732 21.002 0 20.27 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819C23.268 3.821 24 4.553 24 5.457z" />
              </svg>
            </motion.a>
            <motion.a
              href="/Resume.pdf"
              download="Resume.pdf"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-all duration-300 p-3 rounded-lg ${isDarkMode ? 'text-rose-400 hover:text-white' : 'text-rose-600 hover:text-black'}`}
              title="Download Resume"
            >
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const FooterSection = ({ isDarkMode }) => {
  const footerClasses = isDarkMode ? 'text-gray-400' : 'text-slate-600';
  return (
    <footer className={`text-center p-6 ${footerClasses}`}>
      <p>© {new Date().getFullYear()} Lekhraj Mahajan. All Rights Reserved.</p>
    </footer>
  );
};


// --- Main component ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(script);

    // Add smooth scrolling to the html element
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const darkModeClasses = isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900';

  return (
    <div className={`font-sans antialiased transition-all duration-700 ${darkModeClasses} min-h-screen relative overflow-x-hidden`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: isDarkMode ? [
            'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
          ] : [
            'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        <HeroSection isDarkMode={isDarkMode} />

        <main className="content-sections space-y-20 py-20">
          <AboutSection isDarkMode={isDarkMode} />
          <SkillsSection isDarkMode={isDarkMode} />
          <ProjectsSection isDarkMode={isDarkMode} />
          <ContactSection isDarkMode={isDarkMode} />
        </main>
        <FooterSection isDarkMode={isDarkMode} />
      </div>

      {/* Scroll to top button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-sm ${isDarkMode ?
          'bg-emerald-600/80 text-white hover:bg-emerald-500/80' :
          'bg-indigo-600/80 text-white hover:bg-indigo-500/80'
          }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        ↑
      </motion.button>
    </div>
  );
};

