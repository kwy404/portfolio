'use client';

import React from 'react';
import {
  Linkedin,
  Github,
  Mail,
  Code,
  Cpu,
  Smartphone,
} from 'lucide-react';
import { motion } from 'framer-motion';

const technologies = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'PHP',
  'Socket.IO',
  'Python',
  'Docker',
  'Kubernetes',
  'AWS',
  'CI/CD',
  'Linux',
];

export default function AboutMe() {
  return (
    <motion.section
      className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-tr from-gray-900/90 via-black/80 to-gray-900/90 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 flex flex-col md:flex-row gap-8 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      aria-label="Sobre mim"
    >
      {/* Foto menor e responsiva */}
      <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md bg-gradient-to-tr from-blue-700 via-purple-700 to-pink-700">
        <img
          src="https://scontent.ffln4-1.fna.fbcdn.net/v/t39.30808-6/512665956_2081534118999033_7735164036701826769_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMGXZciU4ALFuqiOE9Fx8UGPON5PZj-fAY843k9mP58LwFzphlC0DFjc0f7f3ltNe8jdNdDMSIue4CU3DtKYjZ&_nc_ohc=UQHLkgbxfKgQ7kNvwEYWqgp&_nc_oc=AdnAWKQTYH4cPy8B7upEXrYFEoGZmW1J5iiKjWEnZshb4N_Um8JEs2-IrBqnCs9jW6Q3egSE1cVtMdkcBSjO8onn&_nc_zt=23&_nc_ht=scontent.ffln4-1.fna&_nc_gid=oXDOM3UYyvIV_hkzBCtiGw&oh=00_AfRswaq3yd4dH_f0IwhcbHMacqLA1mOLkwAF26dMFTYXPQ&oe=687604EA"
          alt="Alexandre Silva"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 space-y-6 md:space-y-8">
        <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold uppercase border-b border-white/20 pb-3 drop-shadow-sm">
          <Code size={30} />
          Sobre Mim
        </h2>

        <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
          <p>
            Olá! Sou <strong>Alexandre Silva</strong>, desenvolvedor web freelancer focado em criar soluções elegantes e funcionais.
          </p>
          <p>
            Desenvolvo redes sociais personalizadas, plataformas de streaming e uso inteligência artificial para aprimorar experiências digitais.
          </p>
          <p>
            Trabalho com as tecnologias mais modernas, buscando sempre inovação, performance e design limpo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tecnologias */}
          <section>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-semibold border-b border-white/20 pb-2 mb-4 drop-shadow-sm">
              <Cpu size={22} />
              Tecnologias & DevOps
            </h3>
            <ul className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="bg-white/10 px-3 py-1 rounded-full text-xs md:text-sm font-semibold tracking-wide text-white backdrop-blur-sm border border-white/20 shadow-sm hover:bg-white/20 transition"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Contatos */}
          <section>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-semibold border-b border-white/20 pb-2 mb-4 drop-shadow-sm">
              <Mail size={22} />
              Contatos
            </h3>
            <div className="flex flex-col gap-4 text-white/90 text-sm md:text-base">
              <a
                href="mailto:alexandre.silva@email.com"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail size={18} /> alexandre.silva@email.com
              </a>
              <a
                href="https://www.linkedin.com/in/alexandre-silva-173687256/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Linkedin size={18} /> linkedin.com/in/alexandre-silva-173687256
              </a>
              <a
                href="https://github.com/kwy404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Github size={18} /> github.com/kwy404
              </a>
              <a
                href="https://wa.me/5547999500474"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Smartphone size={18} />
                WhatsApp: (47) 99950-0474
              </a>
            </div>
          </section>
        </div>

        <p className="text-gray-400 text-xs md:text-sm italic max-w-md drop-shadow-sm mt-4">
          Sempre aberto a novos projetos e desafios! Vamos criar algo incrível juntos.
        </p>
      </div>
    </motion.section>
  );
}
