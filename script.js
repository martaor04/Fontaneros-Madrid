// JavaScript para Fontanería García 24H

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.service-card, .why-item, .area-category');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Efecto parallax en el hero - desactivado para evitar solapamiento
    // const hero = document.querySelector('.hero');
    // if (hero) {
    //     window.addEventListener('scroll', () => {
    //         const scrolled = window.pageYOffset;
    //         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    //     });
    // }

    // Contador animado para estadísticas (si se agregan en el futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Validación de formulario de contacto (si se agrega en el futuro)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }

    // Efecto hover en las tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Botón de WhatsApp flotante
    function createWhatsAppButton() {
        const button = document.createElement('a');
        button.href = 'https://wa.me/641872390';
        button.target = '_blank';
        button.className = 'whatsapp-float';
        button.innerHTML = '💬';
        button.setAttribute('aria-label', 'Contactar por WhatsApp');
        
        const style = document.createElement('style');
        style.textContent = `
            .whatsapp-float {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #25d366;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 9999;
                transition: all 0.3s ease;
                text-decoration: none;
            }
            
            .whatsapp-float:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            }
            
            @media (max-width: 768px) {
                .whatsapp-float {
                    bottom: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(button);
    }

    // Crear botón flotante de WhatsApp
    createWhatsAppButton();

    // Detección de dispositivo móvil
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Ajustes para dispositivos móviles
    if (isMobile()) {
        // Optimizar animaciones para móviles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            .service-card:hover {
                transform: translateY(-5px);
            }
            
            .hero {
                background-attachment: scroll;
            }
        `;
        document.head.appendChild(mobileStyle);
    }

    // Prevenir doble clic en botones de llamada/WhatsApp
    const callButtons = document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me/"]');
    callButtons.forEach(button => {
        let isClicked = false;
        
        button.addEventListener('click', function() {
            if (isClicked) {
                e.preventDefault();
                return false;
            }
            isClicked = true;
            
            setTimeout(() => {
                isClicked = false;
            }, 1000);
        });
    });

    // Analytics simple (si se necesita en el futuro)
    function trackEvent(action, category = 'Interaction') {
        // Aquí se podría integrar Google Analytics u otro sistema
        console.log(`Event tracked: ${category} - ${action}`);
    }

    // Trackear clics en botones de contacto
    document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me/"]').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.href.includes('tel:') ? 'Phone' : 'WhatsApp';
            trackEvent(`Contact Click - ${type}`, 'Contact');
        });
    });

    // Mensaje de bienvenida en la consola
    console.log('🔧 Fontanería García 24H - Sitio web cargado correctamente');
    console.log('📞 Teléfono: 641 872 390');
    console.log('💬 WhatsApp: 641 872 390');
});

// Manejo de errores
window.addEventListener('error', function(e) {
    console.error('Error en el sitio web:', e.error);
});

// Optimización de carga de imágenes (si se agregan imágenes en el futuro)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
lazyLoadImages();
