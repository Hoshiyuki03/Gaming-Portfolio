"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    number: "01",
    title: "Katha Legends",
    type: "Open-world fantasy RPG",
    copy: "A world of ancient kingdoms, demons, relics, and choices that leave a mark on the people who live there.",
    accent: "orange",
    tags: ["Worldbuilding", "Systems", "Narrative"],
  },
  {
    number: "02",
    title: "AR Beyblade Arena",
    type: "Unity · Augmented reality",
    copy: "A mobile arena that brings spinning-top battles into the real world through responsive AR interactions.",
    accent: "purple",
    tags: ["Unity", "AR", "Mobile"],
    previewId: "1hlczcyOvccDjoH9MHij-L5IHAG14save",
    previewUrl: "https://drive.google.com/file/d/1hlczcyOvccDjoH9MHij-L5IHAG14save/view",
    cta: "View Gameplay",
  },
  {
    number: "03",
    title: "Mech Robot",
    type: "Blender · 3D art",
    copy: "A hard-surface mechanical study focused on readable forms, optimized topology, and presentation.",
    accent: "blue",
    tags: ["Blender", "Modeling", "Design"],
    previewId: "1ImTIVaxGAZHkN7J9KT4Z1vmK3GX5HHE2",
    previewUrl: "https://drive.google.com/file/d/1ImTIVaxGAZHkN7J9KT4Z1vmK3GX5HHE2/view",
    cta: "Watch Demo",
  },
];

const skills = ["Game Mechanics", "Level Design", "Quest Design", "Worldbuilding", "Narrative Design", "Gameplay Systems", "Unreal Engine", "Unity", "C / C++", "Blender"];

const process = [
  ["01", "Idea", "Start with the experience I want a player to feel."],
  ["02", "Research", "Study systems, player behavior, and what makes a moment work."],
  ["03", "Worldbuild", "Give every place, faction, and character a reason to exist."],
  ["04", "Prototype", "Turn the strongest ideas into something playable, quickly."],
  ["05", "Test & iterate", "Listen, observe, refine — and keep the best parts."],
];

const responsibilities = ["Narrative Design", "Worldbuilding", "Character Creation", "Lore Development", "Story Architecture", "Visual Direction", "Faction Design", "Setting Design"];
const themes = ["Memory & Identity", "Duty & Sacrifice", "Hope & Redemption", "Friendship & Loyalty", "Fate vs Choice", "Light & Shadow"];
const designGoals = ["Create a fantasy world with meaningful lore and history", "Blend large-scale mythology with personal character stories", "Build mysteries that encourage audience curiosity", "Design a setting that can support games, animation, novels, and future expansions", "Deliver emotional storytelling alongside epic-scale conflicts"];
const characters = [
  ["Arkiea", "A legendary protector whose past has become a mystery even to himself. His journey explores duty, sacrifice, and the search for purpose in a changing world."],
  ["Aethera", "A compassionate figure whose presence influences the fate of multiple realms. She represents hope, resilience, and the strength to protect others despite personal cost."],
  ["Erebus", "A mysterious character shaped by regret and redemption, walking the line between darkness and light."],
  ["Kael", "A loyal knight whose unwavering dedication and sense of honor make him a cornerstone of the story's emotional foundation."],
];
const featuredVisuals = [
  ["/assets/Logline.png", "Arkiea project logline"],
  ["/assets/The%20Fourteen%20Realms_%20Tower%20of%20Worlds.png", "The Fourteen Realms — Tower of Worlds"],
  ["/assets/Arkeia_%20Divine%20Guardian%20of%20Dharma.png", "Arkiea — Divine Guardian of Dharma"],
  ["/assets/Erebus%20and%20Kael_%20Destiny%E2%80%99s%20Divide.png", "Erebus and Kael — Destiny’s Divide"],
  ["/assets/Aethera%20%E2%80%93%20Goddess%20of%20Life%20%26%20Harmony.png", "Aethera — Goddess of Life & Harmony"],
];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function ProjectVideoPreview({ title, previewId, previewUrl, cta }: { title: string; previewId: string; previewUrl: string; cta: string }) {
  return (
    <div className="project-art project-media-art">
      <iframe className="project-preview-frame" src={`https://drive.google.com/file/d/${previewId}/preview`} title={`${title} video preview`} loading="lazy" allow="autoplay; encrypted-media" />
      <a className="project-preview-link" href={previewUrl} target="_blank" rel="noopener noreferrer" aria-label={`${cta}: ${title}`}>
        <span className="project-preview-shade" />
        <span className="project-preview-cta"><span className="preview-play">▶</span>{cta}</span>
      </a>
    </div>
  );
}

function RealmsParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <motion.div ref={ref} className="realms-parallax" style={{ y }}>
      <h3>The Fourteen Realms</h3>
      <p>The universe is divided into fourteen interconnected realms, each representing different philosophies, cultures, powers, and ways of life.</p>
      <p>At the center lies the mortal realm, where the choices of ordinary people influence the balance of existence itself.</p>
      <p>Ancient kingdoms, forgotten histories, and hidden mysteries shape a world where every journey uncovers another piece of a much larger story.</p>
    </motion.div>
  );
}

export default function Home() {
  const workingVideoRef = useRef<HTMLVideoElement>(null);
  const greetingVideoRef = useRef<HTMLVideoElement>(null);
  const [isGreeting, setIsGreeting] = useState(false);
  const [greetingVideoPlaying, setGreetingVideoPlaying] = useState(false);
  const [greetingAudioEnabled, setGreetingAudioEnabled] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [workingVideoFailed, setWorkingVideoFailed] = useState(false);
  const [greetingVideoFailed, setGreetingVideoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const returnToWorking = useCallback(() => {
    setIsGreeting(false);
    setGreetingVideoPlaying(false);
    setGreetingAudioEnabled(false);
    const greetingVideo = greetingVideoRef.current;
    const workingVideo = workingVideoRef.current;
    greetingVideo?.pause();
    if (workingVideo && !workingVideoFailed) {
      void workingVideo.play().catch(() => setWorkingVideoFailed(true));
    }
  }, [workingVideoFailed]);

  const useGreetingFallback = useCallback(() => {
    setGreetingVideoFailed(true);
    setGreetingVideoPlaying(false);
    window.setTimeout(returnToWorking, 3000);
  }, [returnToWorking]);

  const showGreetingImage = useCallback(() => {
    if (isGreeting) return;
    workingVideoRef.current?.pause();
    greetingVideoRef.current?.pause();
    setIsGreeting(true);
    setGreetingVideoPlaying(false);
    setGreetingAudioEnabled(false);
  }, [isGreeting]);

  const unlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    setAudioUnlocked(true);
    const greetingVideo = greetingVideoRef.current;
    if (isGreeting && greetingVideoPlaying && greetingVideo) {
      greetingVideo.muted = false;
      setGreetingAudioEnabled(true);
      void greetingVideo.play().catch(useGreetingFallback);
    }
  }, [audioUnlocked, greetingVideoPlaying, isGreeting, useGreetingFallback]);

  const startGreeting = useCallback((withAudio = false) => {
    const workingVideo = workingVideoRef.current;
    const greetingVideo = greetingVideoRef.current;
    if (isGreeting && greetingVideoPlaying) {
      if (withAudio && !greetingAudioEnabled) {
        setGreetingAudioEnabled(true);
        greetingVideo && (greetingVideo.muted = false);
        void greetingVideo?.play().catch(useGreetingFallback);
      }
      if (greetingVideo && !greetingVideoFailed) {
        return;
      }
    }
    workingVideo?.pause();
    setIsGreeting(true);
    setGreetingVideoPlaying(true);
    setGreetingAudioEnabled(withAudio);
    if (greetingVideo && !greetingVideoFailed) {
      greetingVideo.currentTime = 0;
      greetingVideo.muted = !withAudio;
      void greetingVideo.play().catch(useGreetingFallback);
    }
  }, [greetingAudioEnabled, greetingVideoFailed, greetingVideoPlaying, isGreeting, useGreetingFallback]);

  useEffect(() => {
    setMounted(true);
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) showGreetingImage();
    }, { threshold: 0.4 });
    observer.observe(contact);
    return () => observer.disconnect();
  }, [showGreetingImage]);

  return (
      <main onClickCapture={unlockAudio}>
      <nav className="nav shell" aria-label="Main navigation">
        <a href="#top" className="wordmark"><span className="wordmark-mark">AD</span><span>A. Dheeraj</span></a>
        <div className="nav-links">
          <a href="#about">About</a><a href="#work">Work</a><a href="#process">Process</a><a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="nav-cta" onClick={() => startGreeting()}>Let&apos;s talk <Arrow /></a>
      </nav>

      <section id="top" className="hero shell">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> Available for creative collaborations</div>
          <h1>I build worlds<br /><em>worth getting lost in.</em></h1>
          <p className="hero-lede">Game designer, worldbuilder, and developer crafting immersive experiences through systems, storytelling, and a little bit of magic.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <Arrow /></a><a className="text-link" href="#about">More about me <span>↓</span></a></div>
          <div className="hero-meta"><span>Scroll to explore</span><span className="line" /><span>01 / 07</span></div>
        </div>
        <div className="character-stage">
          <div className="stage-glow" />
          <div className="stage-ring" />
          <div className="stage-label"><span>Currently building</span><strong>Katha Legends</strong></div>
          <div className="character">
            <video ref={workingVideoRef} className={`character-video ${isGreeting ? "is-hidden" : ""}`} src="https://id9kponubbf6mowe.public.blob.vercel-storage.com/Working%20video.mp4" autoPlay muted playsInline loop controls={false} preload="metadata" poster="/assets/Working.png" onError={() => setWorkingVideoFailed(true)} onCanPlay={() => { const video = workingVideoRef.current; if (video && !isGreeting) void video.play().catch(() => setWorkingVideoFailed(true)); }} />
            <video ref={greetingVideoRef} className={`character-video ${isGreeting && greetingVideoPlaying && !greetingVideoFailed ? "" : "is-hidden"}`} src="https://id9kponubbf6mowe.public.blob.vercel-storage.com/Greeting%20video.mp4" muted={!greetingAudioEnabled} playsInline controls={false} loop={false} preload="auto" poster="/assets/Greeting.png" onEnded={returnToWorking} onError={useGreetingFallback} />
            {workingVideoFailed && !isGreeting && <img className="character-fallback" src="/assets/Working.png" alt="A. Dheeraj at his game development desk" />}
            {isGreeting && (!greetingVideoPlaying || greetingVideoFailed) && <img className="character-fallback" src="/assets/Greeting.png" alt="A. Dheeraj greeting visitors" />}
          </div>
          <div className="desk-light" />
        </div>
        <div className="hero-corner">Elyria / 001</div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track"><span>WORLD DESIGN</span><i>✦</i><span>PLAYER CHOICE</span><i>✦</i><span>STORY SYSTEMS</span><i>✦</i><span>WORLD DESIGN</span><i>✦</i><span>PLAYER CHOICE</span><i>✦</i><span>STORY SYSTEMS</span></div></div>

      <section id="about" className="section shell about-section">
        <Reveal className="section-intro"><span className="section-number">01 — About</span><h2>Designing for the<br /><em>feeling after.</em></h2></Reveal>
        <div className="about-grid"><Reveal delay={0.08}><p className="large-copy">I&apos;m A. Dheeraj, a game design student drawn to the moments players remember long after they put the controller down.</p></Reveal><Reveal delay={0.16}><div className="about-body"><p>I care about the quiet discovery behind a hidden door, the uneasy choice between two imperfect paths, and the friendship that forms when a team solves something together.</p><p>My work sits at the intersection of worldbuilding, gameplay systems, and interactive storytelling. Right now, I&apos;m developing <span className="highlight">Katha Legends</span> — an original fantasy RPG set in the world of Elyria.</p><a className="text-link" href="#process">How I work <Arrow /></a></div></Reveal></div>
      </section>

      <section className="section shell skills-section"><Reveal><div className="section-intro compact"><span className="section-number">02 — Toolkit</span><h2>Curious by nature.<br /><em>Systematic by craft.</em></h2></div></Reveal><div className="skills-list">{skills.map((skill, i) => <motion.div key={skill} className="skill" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.035 }}><span>0{i + 1}</span>{skill}<Arrow /></motion.div>)}</div></section>

      <section id="work" className="section shell work-section"><Reveal className="work-heading"><span className="section-number">03 — Selected work</span><h2>Small pieces of<br /><em>larger worlds.</em></h2><p>Projects that explore how mechanics, atmosphere, and narrative can make a world feel alive.</p></Reveal><div className="project-list">{projects.map((project, i) => <Reveal key={project.title} delay={i * 0.08}><article className={`project-card ${project.accent}`}><div className="project-number">{project.number}</div>{project.previewId && project.previewUrl && project.cta ? <ProjectVideoPreview title={project.title} previewId={project.previewId} previewUrl={project.previewUrl} cta={project.cta} /> : <div className="project-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="project-glyph">✦</div></div>}<div className="project-info"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.copy}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><Arrow /></article></Reveal>)}</div></section>

      <section className="katha-section shell"><Reveal className="katha-card"><div className="katha-glow" aria-hidden="true" /><div className="katha-content"><span className="section-number">04 — Katha Legends</span><h2>Katha <em>Legends</em></h2><p className="katha-status">Currently in Development</p><div className="katha-copy"><p>Some stories are not ready to be told.</p><p>Katha Legends remains in active development, with its world, characters, and mysteries still taking shape.</p><p>More will be revealed when the time is right.</p></div></div></Reveal></section>

      <section id="original-ip" className="section shell original-ip-section"><Reveal className="original-ip-heading"><span className="section-number">04 — ORIGINAL IP</span><h2>Arkiea — The Fourteen Realms</h2><p>An original mythology-inspired fantasy universe exploring memory, destiny, sacrifice, and the balance between light and shadow.</p></Reveal><div className="original-ip-overview"><Reveal><span className="eyebrow">Project Overview</span><div className="original-ip-copy"><p>Arkiea is an original fantasy narrative universe designed for games, animation, and interactive storytelling.</p><p>Set across fourteen interconnected realms, the story follows a forgotten protector who awakens in a world standing at the edge of change.</p><p>Ancient mysteries, powerful kingdoms, and long-forgotten truths shape a journey where every choice carries weight.</p><p>The project focuses on worldbuilding, character-driven storytelling, emotional themes, and long-form narrative design.</p></div></Reveal><Reveal delay={0.08}><div className="featured-visuals"><span className="eyebrow">Featured Visuals</span><div className="visual-gallery">{featuredVisuals.map(([src, alt], i) => <motion.div key={src} className={"visual-frame visual-frame-" + (i + 1)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: i * 0.06 }}><img src={src} alt={alt} loading="lazy" /></motion.div>)}</div></div></Reveal></div><div className="original-ip-grid"><Reveal><div className="ip-panel responsibilities-panel"><span className="eyebrow">My Responsibilities</span><div className="responsibility-grid">{responsibilities.map((responsibility, i) => <motion.div key={responsibility} className="responsibility-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.45, delay: i * 0.055 }}>{responsibility}</motion.div>)}</div></div></Reveal><Reveal delay={0.08}><div className="ip-panel themes-panel"><span className="eyebrow">Core Themes</span><div className="theme-tags">{themes.map((theme, i) => <motion.span key={theme} whileHover={{ y: -3 }} transition={{ duration: 0.2 }} style={{ transitionDelay: (i * 20) + "ms" }}>{theme}</motion.span>)}</div></div></Reveal></div><RealmsParallax /><div className="character-section"><Reveal><span className="eyebrow">Key Characters</span></Reveal><div className="character-grid">{characters.map(([name, copy], i) => <Reveal key={name} delay={i * 0.07}><article className="ip-character-card"><span className="character-index">0{i + 1}</span><h3>{name}</h3><p>{copy}</p></article></Reveal>)}</div></div><div className="design-goals"><Reveal><span className="eyebrow">Design Goals</span></Reveal><div className="goal-list">{designGoals.map((goal, i) => <motion.div key={goal} className="goal-card" initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.45, delay: i * 0.065 }}><span>✓</span>{goal}</motion.div>)}</div></div></section>

      <section id="process" className="section shell process-section"><Reveal className="section-intro"><span className="section-number">05 — Process</span><h2>From first spark<br /><em>to playable story.</em></h2></Reveal><div className="process-list">{process.map(([number, title, copy], i) => <Reveal key={number} delay={i * 0.07}><div className="process-row"><span className="process-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="process-arrow">↗</span></div></Reveal>)}</div></section>

      <section id="contact" className="contact-section shell"><div className="contact-orb" /><Reveal><span className="section-number">06 — Contact</span><h2>Have a world<br /><em>in mind?</em></h2><p>Whether it&apos;s game design, worldbuilding, or a strange new idea — I&apos;d love to hear about it.</p><a className="button button-primary" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=dheerajkumar862973@gmail.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => startGreeting(audioUnlocked)} onTouchStart={() => startGreeting(audioUnlocked)}>Start a conversation <Arrow /></a></Reveal><div className="contact-footer"><span>© 2026 A. Dheeraj</span><span>Game Designer · Worldbuilder · Developer</span><a href="#top">Back to top ↑</a></div></section>
      {!mounted && <span className="sr-only">Loading portfolio</span>}
    </main>
  );
}
