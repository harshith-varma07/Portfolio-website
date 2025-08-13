// Enhanced slide-in effect with staggered animations
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.card, .edu-card');
  
  // Staggered reveal for cards within sections
  const staggerReveal = (elements, delay = 100) => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
      }, index * delay);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add staggered animation for cards within the visible section
          const sectionCards = entry.target.querySelectorAll('.card, .edu-card');
          if (sectionCards.length > 0) {
            setTimeout(() => staggerReveal(sectionCards, 150), 300);
          }
          
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
    
    // Initialize cards as hidden for stagger effect
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.95)';
      card.style.transition = 'all 0.6s cubic-bezier(.215,.61,.355,1)';
    });
    
  } else {
    // Fallback for older browsers
    const revealOnScroll = () => {
      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          sec.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  }

  // Add parallax effect to background elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('body::before, body::after');
    
    // Subtle parallax effect
    document.body.style.backgroundPosition = `${scrolled * 0.5}px ${scrolled * 0.3}px`;
  });

  // Add smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});