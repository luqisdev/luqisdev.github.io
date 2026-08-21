document.addEventListener('DOMContentLoaded', () => {
  // Sayfa Kaydırma Efekti (Header)
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobil Menü Açma/Kapatma
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Buton ikonunu değiştirme (üç çizgi / X işareti)
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Menü linklerine tıklandığında menüyü kapatma
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });
  }

  // Aktif Sayfa Vurgulaması
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop();
  
  const navLinksList = document.querySelectorAll('.nav-links a');
  navLinksList.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (pageName === linkHref || (pageName === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Yazı Yazma Efekti (Hero Altyazısı için)
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const texts = JSON.parse(typingElement.getAttribute('data-texts') || '[]');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentText = texts[textIndex];
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let speed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; // Son harfte duraklama
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500; // Yeni kelimeye geçmeden önce duraklama
      }
      
      setTimeout(type, speed);
    }
    
    if (texts.length > 0) {
      setTimeout(type, 1000);
    }
  }
});
