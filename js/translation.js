const translations = {
    en: {
        "Programmer | Graphic Designer | Multimedia": "Programmer | Graphic Designer | Multimedia",
        "Coding and Creativity": "Coding and Creativity",
        "hero-description": "<strong>Aspiring Computer Science student</strong> passionate about technology, design, and problem-solving. studied at <strong>Vanier College</strong> with a focus on <strong>web development</strong>, <strong>programming</strong>, and <strong>digital design</strong>. I design and build <strong>responsive</strong>, <strong>user-friendly websites</strong> using <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>, while strengthening my programming skills in <strong>Python</strong> and <strong>Java</strong>. I also create interface designs and visual content using tools like <strong>Photoshop</strong>, <strong>Illustrator</strong>, and <strong>Canva</strong> —believing that strong design plays a key role in creating impactful digital experiences. My goal is to merge clean, purposeful design with <strong>functional</strong>, <strong>efficient code</strong> to build innovative, user-centered solutions. Above all, I have a deep love for <strong>programming</strong> and am always eager to <strong>learn</strong> and <strong>grow</strong>.",
        "Technical Skills": "Technical Skills",
        "Web Development": "Web Development",
        "Programming": "Programming",
        "Design Tools": "Design Tools",
        "View Projects": "View Projects",
        "About Me": "About Me",
        "My Work": "My Work",
        "Graphic Design": "Graphic Design",
        "Let's Connect": "Let's Connect",
        "contact-text": "Whether you're interested in collaborating on a project, have a new idea in mind, or just want to chat, I'm always open to new opportunities. I'm currently available for select freelance work and would love to discuss how we can bring your vision to life.",
        "About": "About",
        "Work": "Work",
        "Contact": "Contact",
        "Resume": "Resume",
        "All": "All",
        "Web": "Web",
        "Design": "Design",
        "projects": "projects",
        "Responsive Website": "Responsive Website",
        "Web Design": "Web Design",
        "Java Application": "Java Application",
        "Python Script": "Python Script",
        "Design System": "Design System",
        "Logo & Branding": "Logo & Branding",
        "All rights reserved": "All rights reserved"
    },
    fr: {
        "Programmer | Graphic Designer | Multimedia": "Programmeur | Graphiste | Multimédia",
        "Coding and Creativity": "Codage et Créativité",
        "hero-description": "<strong>Étudiant en informatique</strong> passionné par la technologie, le design et la résolution de problèmes. J'étudie au <strong>Collège Vanier</strong> avec une spécialisation en <strong>développement web</strong>, <strong>programmation</strong> et <strong>design numérique</strong>. Je conçois et construis des <strong>sites web réactifs</strong> et <strong>conviviaux</strong> en utilisant <strong>HTML</strong>, <strong>CSS</strong> et <strong>JavaScript</strong>, tout en perfectionnant mes compétences en programmation avec <strong>Python</strong> et <strong>Java</strong>. Je crée également des interfaces et des contenus visuels avec des outils comme <strong>Photoshop</strong>, <strong>Illustrator</strong> et <strong>Canva</strong>, convaincu qu'un bon design joue un rôle clé dans la création d'expériences numériques marquantes. Mon objectif est d'allier un design épuré et intentionnel à un code <strong>fonctionnel</strong> et <strong>efficace</strong> pour construire des solutions innovantes centrées sur l'utilisateur. Par-dessus tout, j'ai une passion profonde pour la <strong>programmation</strong> et je suis toujours impatient d'<strong>apprendre</strong> et de <strong>progresser</strong>.",
        "Technical Skills": "Compétences Techniques",
        "Web Development": "Développement Web",
        "Programming": "Programmation",
        "Design Tools": "Outils de Conception",
        "View Projects": "Voir les Projets",
        "About Me": "À Propos de Moi",
        "My Work": "Mes Travaux",
        "Graphic Design": "Design Graphique",
        "Let's Connect": "Contactez-moi",
        "contact-text": "Que vous soyez intéressé par une collaboration sur un projet, que vous ayez une nouvelle idée en tête ou que vous souhaitiez simplement discuter, je suis toujours ouvert aux nouvelles opportunités. Je suis actuellement disponible pour certains travaux indépendants et j'adorerais discuter de la façon dont nous pouvons concrétiser votre vision.",
        "About": "À Propos",
        "Work": "Travaux",
        "Contact": "Contact",
        "Resume": "CV",
        "All": "Tous",
        "Web": "Web",
        "Design": "Design",
        "projects": "projets",
        "Responsive Website": "Site Web Réactif",
        "Web Design": "Conception Web",
        "Java Application": "Application Java",
        "Python Script": "Script Python",
        "Design System": "Système de Design",
        "Logo & Branding": "Logo et Identité",
        "All rights reserved": "Tous droits réservés"
    }
};

// Language switching functionality
function setupLanguageSwitching() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    
    // Set initial language from localStorage or default to English
    const currentLang = localStorage.getItem('language') || 'en';
    htmlElement.lang = currentLang;
    
    // Update button states
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Translate the page
    translatePage(currentLang);
    
    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const newLang = this.dataset.lang;
            const currentLang = document.documentElement.lang;
            if (newLang === currentLang) return;
            
            // Update UI
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Save preference
            localStorage.setItem('language', newLang);
            htmlElement.lang = newLang;
            
            // Translate the page
            translatePage(newLang);
        });
    });
}

function translatePage(lang) {
    // Get all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Special cases for elements without data-translate
    const specialElements = {
        '.hero-subtitle': 'Programmer | Graphic Designer | Multimedia',
        '.hero-title': 'Coding and Creativity',
        '.hero-description': 'hero-description',
        '.skills-container h3': 'Technical Skills',
        '.skill-category h4': ['Web Development', 'Programming', 'Design Tools'],
        '.btn': 'View Projects',
        '.section-title': ['About Me', 'My Work', 'Let\'s Connect'],
        '.category-title': ['Web Development', 'Programming', 'Graphic Design'],
        '.contact-text': 'contact-text',
        '.nav-link': ['About', 'Work', 'Contact', 'Resume'],
        '.filter-btn span': ['All', 'Web', 'Programming', 'Design'],
        '.filter-counter span:last-child': 'projects'
    };
    
    // Handle these special cases
    for (const selector in specialElements) {
        const elements = document.querySelectorAll(selector);
        const translationKey = specialElements[selector];
        
        elements.forEach((el, index) => {
            let key;
            if (Array.isArray(translationKey)) {
                key = translationKey[index];
            } else {
                key = translationKey;
            }
            
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }
}

// Call this when DOM is loaded
document.addEventListener('DOMContentLoaded', setupLanguageSwitching);