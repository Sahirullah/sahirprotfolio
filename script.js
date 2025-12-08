const defaultConfig = {
      background_color_light: "#ffffff",
      background_color_dark: "#0f172a",
      text_color_light: "#1a1a1a",
      text_color_dark: "#f1f5f9",
      primary_action_color: "#3b82f6",
      font_family: "Inter",
      font_size: 16,
      logo_text: "Sahirullah",
      resume_button_text: "Resume",
      hero_greeting: "Hello, I'm",
      hero_title: "Sahirullah a skilled web app developer",
      hero_description: "Full Stack Web Developer & Graphic Designer creating beautiful digital experiences with modern technologies and creative solutions",
      about_title: "About Me",
      about_subtitle: "Passionate creator blending code and design",
      about_intro_title: "Who I Am",
      about_intro_text: "I'm Sahirullah, a versatile Full Stack Web Developer and Graphic Designer with a passion for creating beautiful, functional digital experiences. I believe great design and clean code go hand in hand.",
      skill_dev_title: "Full Stack Development",
      skill_dev_text: "Building robust web applications with modern frameworks and technologies. From frontend to backend, I create seamless digital solutions.",
      skill_design_title: "Graphic Design",
      skill_design_text: "Crafting eye-catching visuals and brand identities. I transform ideas into stunning designs that communicate and inspire."
    };

    // Theme toggle functionality
    let currentTheme = 'dark';

    function toggleTheme() {
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
      
      if (currentTheme === 'dark') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
        currentTheme = 'light';
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '🌙';
        currentTheme = 'dark';
      }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
      const navLinks = document.getElementById('nav-links');
      navLinks.classList.toggle('active');
    }

    // Project Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects with animation
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // Typing animation with loop
    let typingText = defaultConfig.hero_title;
    let typingIndex = 0;
    let typingElement = null;
    let isDeleting = false;

    function typeText() {
      if (!typingElement) {
        typingElement = document.getElementById('typing-text');
      }
      
      if (!isDeleting && typingIndex < typingText.length) {
        // Typing forward
        typingElement.textContent = typingText.substring(0, typingIndex + 1);
        typingIndex++;
        setTimeout(typeText, 80);
      } else if (!isDeleting && typingIndex === typingText.length) {
        // Pause at end before deleting
        isDeleting = true;
        setTimeout(typeText, 2000);
      } else if (isDeleting && typingIndex > 0) {
        // Deleting backward
        typingElement.textContent = typingText.substring(0, typingIndex - 1);
        typingIndex--;
        setTimeout(typeText, 50);
      } else if (isDeleting && typingIndex === 0) {
        // Pause before typing again
        isDeleting = false;
        setTimeout(typeText, 500);
      }
    }

    // Start typing animation when page loads
    setTimeout(typeText, 500);

    // // Image hover effect for smile
    // const imageOne = document.querySelector('.image-one');
    // const emojiOne = document.querySelector('.emoji-one');
    
    // imageOne.addEventListener('mouseenter', () => {
    //   emojiOne.textContent = '😊';
    // });
    
    // imageOne.addEventListener('mouseleave', () => {
    //   emojiOne.textContent = '👨‍💻';
    // });

    // Scroll to top functionality
    const topBtn = document.getElementById('top-btn');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        topBtn.classList.remove('hidden');
      } else {
        topBtn.classList.add('hidden');
      }
    });
    
    topBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          const navLinks = document.getElementById('nav-links');
          navLinks.classList.remove('active');
          
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Project buttons functionality
    document.querySelectorAll('.project-btn').forEach(button => {
      button.addEventListener('click', function() {
        const projectTitle = this.closest('.project-card').querySelector('.project-title').textContent;
        alert(`Opening project: ${projectTitle}\n\nThis would typically open a detailed project page or modal.`);
      });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
      const message = contactForm.querySelector('textarea').value;
      
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields before submitting.');
        return;
      }
      
      // Show success message
      submitBtn.innerHTML = '<span class="submit-btn-icon">✅</span> Message Sent!';
      submitBtn.style.backgroundColor = '#10b981';
      
      // Reset form
      setTimeout(() => {
        contactForm.querySelectorAll('input').forEach(input => input.value = '');
        contactForm.querySelector('textarea').value = '';
        submitBtn.innerHTML = '<span class="submit-btn-icon">🚀</span> Send Message';
        submitBtn.style.backgroundColor = '';
      }, 2000);
    });

    // Event listeners
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('mobile-toggle').addEventListener('click', toggleMobileMenu);

    // Element SDK integration
    async function onConfigChange(config) {
      const fontFamily = config.font_family || defaultConfig.font_family;
      const fontSize = config.font_size || defaultConfig.font_size;
      const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;

      // Apply font
      const fontStack = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      document.body.style.fontFamily = fontStack;

      // Apply font sizes
      document.querySelector('.logo').style.fontSize = `${fontSize * 1.5}px`;
      document.querySelectorAll('.nav-links a').forEach(el => el.style.fontSize = `${fontSize}px`);
      document.querySelector('.resume-btn').style.fontSize = `${fontSize * 0.9375}px`;
      document.querySelector('.hero-greeting').style.fontSize = `${fontSize * 1.5}px`;
      document.querySelector('.hero-title').style.fontSize = `${fontSize * 3.5}px`;
      document.querySelector('.hero-description').style.fontSize = `${fontSize * 1.25}px`;
      document.querySelectorAll('.section-title').forEach(el => el.style.fontSize = `${fontSize * 3}px`);
      document.querySelectorAll('.section-subtitle').forEach(el => el.style.fontSize = `${fontSize * 1.25}px`);
      document.querySelectorAll('.skill-title').forEach(el => el.style.fontSize = `${fontSize * 1.5}px`);

      // Apply primary action color
      document.querySelector('.resume-btn').style.backgroundColor = primaryColor;
      document.querySelector('.resume-btn').style.borderColor = primaryColor;
      document.querySelector('.hero-greeting').style.color = primaryColor;

      // Apply text content
      document.getElementById('logo-text').textContent = config.logo_text || defaultConfig.logo_text;
      document.getElementById('resume-btn').textContent = config.resume_button_text || defaultConfig.resume_button_text;
      document.getElementById('hero-greeting').textContent = config.hero_greeting || defaultConfig.hero_greeting;
      document.getElementById('hero-description').textContent = config.hero_description || defaultConfig.hero_description;
      document.getElementById('about-title').textContent = config.about_title || defaultConfig.about_title;
      document.getElementById('about-subtitle').textContent = config.about_subtitle || defaultConfig.about_subtitle;
      document.getElementById('about-intro-text').textContent = config.about_intro_text || defaultConfig.about_intro_text;
      document.getElementById('skill-dev-title').textContent = config.skill_dev_title || defaultConfig.skill_dev_title;
      document.getElementById('skill-dev-text').textContent = config.skill_dev_text || defaultConfig.skill_dev_text;
      document.getElementById('skill-design-title').textContent = config.skill_design_title || defaultConfig.skill_design_title;
      document.getElementById('skill-design-text').textContent = config.skill_design_text || defaultConfig.skill_design_text;

      // Update typing text and restart animation
      const newHeroTitle = config.hero_title || defaultConfig.hero_title;
      if (newHeroTitle !== typingText) {
        typingText = newHeroTitle;
        typingIndex = 0;
        isDeleting = false;
        typingElement.textContent = '';
        typeText();
      }
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          {
            get: () => config.primary_action_color || defaultConfig.primary_action_color,
            set: (value) => {
              config.primary_action_color = value;
              window.elementSdk.setConfig({ primary_action_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family,
          set: (value) => {
            config.font_family = value;
            window.elementSdk.setConfig({ font_family: value });
          }
        },
        fontSizeable: {
          get: () => config.font_size || defaultConfig.font_size,
          set: (value) => {
            config.font_size = value;
            window.elementSdk.setConfig({ font_size: value });
          }
        }
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ["logo_text", config.logo_text || defaultConfig.logo_text],
        ["resume_button_text", config.resume_button_text || defaultConfig.resume_button_text],
        ["hero_greeting", config.hero_greeting || defaultConfig.hero_greeting],
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_description", config.hero_description || defaultConfig.hero_description],
        ["about_title", config.about_title || defaultConfig.about_title],
        ["about_subtitle", config.about_subtitle || defaultConfig.about_subtitle],
        ["about_intro_title", config.about_intro_title || defaultConfig.about_intro_title],
        ["about_intro_text", config.about_intro_text || defaultConfig.about_intro_text],
        ["skill_dev_title", config.skill_dev_title || defaultConfig.skill_dev_title],
        ["skill_dev_text", config.skill_dev_text || defaultConfig.skill_dev_text],
        ["skill_design_title", config.skill_design_title || defaultConfig.skill_design_title],
        ["skill_design_text", config.skill_design_text || defaultConfig.skill_design_text]
      ]);
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }