/* =============================================
   PROJECTS DATA
   To add or edit projects, modify this array.
   Each project object supports:
     - title:       string
     - description: string
     - image:       path to image (e.g. "assets/project1.jpg") or null for placeholder
     - imageFit:   "cover" (default, crops to fill) or "contain" (shows full image, no crop)
     - tags:        array of strings (tech stack labels)
     - link:        URL to open when card is clicked (use "#" as placeholder)
   ============================================= */
const projects = [
  {
    title: "Crave | Full-Stack Food Ordering Platform",
    description:
      "Developed a secure, production-ready ordering platform with JWT authentication, role-based access control, and Stripe payment integration, backed by scalable RESTful APIs and relational schemas deployed on AWS.",
    image: null,
    tags: ["Java", "Spring Boot", "React", "AWS", ],
    link: "#",
  },
  {
    title: "Java Web App CI/CD Pipeline",
    description:
      "Designed a fully automated CI/CD workflow with AWS CodePipeline and CloudFormation, enabling zero-downtime Java app deployments, secure dependency management, and robust rollback capabilities.",
    image: "images/cicdZ150.jpg",
    imageFit: "contain",
    tags: ["AWS CodePipeline", "CodeBuild", "EC2", "CodeArtifact", "CloudFormation", "Java"],
    link: "#",
  },
  {
    title: "Enterprise RAG-based Chatbot",
    description:
      "Engineered a secure, RAG-powered AI assistant on AWS that indexes SOPs, delivers hallucination-free answers, while maintaining data privacy and mitigating prompt injection risks with serverless Lambda orchestration.",
    image: "images/AI-RAG.jpg",
    imageFit: "cover",
    tags: ["AWS Bedrock", "EC2", "Lambda", "S3", "IAM", "Claude", "Python"],
    link: "#",
  },
  {
    title: "Lorem Ipsum Project Delta",
    description:
      "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum.",
    image: null,
    tags: ["LangChain", "OpenAI", "AWS Bedrock"],
    link: "#",
  },
  {
    title: "Athena | AI SaaS Platform",
    description:
      "Developed a SaaS platform integrating AI-powered content generation with Next.js App Router, Clerk-based authentication, and protected API routing, while implementing Stripe for subscription billing with tiered plans, usage tracking, and webhook-driven lifecycle automation.",
    image: null,
    tags: ["Tailwind", "React", "Next.js", "Node.js"],
    link: "#",
  },
  {
    title: "Cloud-Native Smart Inbox with Sentiment Analysis",
    description:
      "Built a real-time, serverless pipeline that analyzes message sentiment with Comprehend and dynamically routes critical requests via SQS for fast, fault-tolerant response handling.",
    image: "images/Sentiment.jpg",
    imageFit: "contain",
    tags: ["AWS Lambda", "S3", "SQS", "Comprehend", "CloudFront"],
    link: "#",
  },
];

/* =============================================
   RENDER PROJECT CARDS
   ============================================= */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project, index) => `
    <article
      class="project-card reveal reveal-delay-${(index % 3) + 1}"
      role="link"
      tabindex="0"
      aria-label="View ${project.title}"
      data-link="${project.link}"
    >
      <div class="project-card__image-wrap">
        ${
          project.image
            ? `<img src="${project.image}" alt="${project.title}" loading="lazy" style="object-fit:${project.imageFit || 'cover'}" />`
            : `<div class="project-card__image-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                <span>Image Placeholder</span>
              </div>`
        }
        <div class="project-card__overlay"></div>
      </div>
      <div class="project-card__body">
        <div class="project-card__tags">
          ${project.tags.map((t) => `<span class="project-card__tag">${t}</span>`).join("")}
        </div>
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__desc">${project.description}</p>
      </div>
      <div class="project-card__footer">
        <span class="project-card__link">View Project <span>→</span></span>
      </div>
    </article>
  `
    )
    .join("");

  // Make cards clickable
  document.querySelectorAll(".project-card").forEach((card) => {
    const navigate = () => {
      const link = card.dataset.link;
      if (link && link !== "#") window.open(link, "_blank", "noopener,noreferrer");
    };
    card.addEventListener("click", navigate);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(); }
    });
  });
}

/* =============================================
   SCROLL-TRIGGERED REVEAL
   ============================================= */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* =============================================
   STICKY NAV SHADOW
   ============================================= */
function initNav() {
  const nav = document.getElementById("navbar");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* =============================================
   THEME TOGGLE
   ============================================= */
function initTheme() {
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

/* =============================================
   FOOTER YEAR
   ============================================= */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initReveal();
  initNav();
  initTheme();
  setYear();
});
