// 3D Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x9C27B0, wireframe: true });
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    icosahedron.rotation.x += 0.002;
    icosahedron.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Header animation
gsap.from('header', {
    opacity: 0,
    y: -100,
    duration: 1.5,
    ease: 'power3.out'
});

// Service card animations
gsap.utils.toArray('.service').forEach((service, index) => {
    gsap.from(service, {
        opacity: 0,
        y: 100,
        rotation: 5,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: service,
            start: 'top 80%'
        }
    });

    // Hover animations
    service.addEventListener('mouseenter', () => {
        gsap.to(service, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    service.addEventListener('mouseleave', () => {
        gsap.to(service, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // Click animation
    service.addEventListener('click', () => {
        gsap.to(service, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
        
        const serviceName = service.getAttribute('data-service');
        setTimeout(() => {
            window.location.href = `${serviceName}.html`;
        }, 300);
    });
});

// Parallax effect on scroll
gsap.to('.services-container', {
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    ease: 'none',
    scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});
