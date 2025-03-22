import { platformPreviews, config } from './config.js';

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Initialize data flow animation
  initDataFlowAnimation();
  
  // Handle email form submission
  const emailForm = document.getElementById('email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Initialize platform preview
  initPlatformPreview();
  
  // Animate on scroll effects
  initAnimateOnScroll();
  
  // Smooth scrolling for anchor links
  initSmoothScrolling();
  
  // Add header scroll effect
  initHeaderScrollEffect();
});

function initDataFlowAnimation() {
  const container = document.getElementById('animation-container');
  if (!container) return;
  
  // Create Three.js renderer and scene for shader animation
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  
  // Create a plane to render the shader on
  const geometry = new THREE.PlaneGeometry(2, 2);
  
  // Define shader code
  const fragmentShader = `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec2 iMouse;
    uniform float iMouseActive;
    
    vec3 LIGHT = normalize(vec3(-0.3,0.2,-0.1));

    float FULL_SIZE = 2.0;
    float EDGE_SIZE = 0.2;
    float PAIR_SIZE = 0.2;

    vec3 n3(vec3 n)
    {
        return fract(cos(dot(n,vec3(813,12,376)))*vec3(901.81,827.46,615.79));   
    }
    vec3 model(vec3 p)
    {
        float A = p.z/3.0+iTime*0.25;
        vec3 R = vec3(cos(A),sin(A),0);
        vec3 C = vec3(mod(p.xy+8.,16.)-8.+R.yx*vec2(1,-1),fract(p.z)-0.5);
        
        float H = min(length(C.xy+R.xy*FULL_SIZE),length(C.xy-R.xy*FULL_SIZE))*0.5-EDGE_SIZE;
        float P = max(length(vec2(dot(C.xy,R.yx*vec2(1,-1)),C.z))-PAIR_SIZE,length(C.xy)-FULL_SIZE);
        
        float T = FULL_SIZE+0.01+2.*EDGE_SIZE-length(C.xy);
        return vec3(min(H,P),T,P);  
    }
    vec3 normal(vec3 p)
    {
        vec2 N = vec2(-0.04, 0.04);

        return normalize(model(p+N.xyy).x*N.xyy+model(p+N.yxy).x*N.yxy+
                        model(p+N.yyx).x*N.yyx+model(p+N.xxx).x*N.xxx);
    }
    vec4 raymarch(vec3 p, vec3 d)
    {
        vec4 M = vec4(p+d*2.0,0);
        for(int i = 0; i<100;i++)
        {
            float S = model(M.xyz).x;
            M += vec4(d,1) * S;
            if (S<0.01 || M.w>50.0) break;
        }
        return M;
    }
    vec3 sky(vec3 d)
    {
        float L = dot(d,LIGHT);
        return vec3(0.4,0.35,0.6)-0.2*(-L*0.5+0.5)+exp2(32.0*(L-1.0));   
    }
    vec3 color(vec3 p, vec3 d)
    {
        vec2 M = model(p).yz;
        float A = atan(mod(p.y+8.,16.)-8.,8.-mod(p.x+8.,16.));
        float T1 = ceil(fract(cos(floor(p.z)*274.63))-0.5);
        float T2 = sign(fract(cos(floor(p.z-80.0)*982.51))-0.5);
        float T3 = T2*sign(cos(p.z/3.0+iTime*0.25+A));

        float L = dot(normal(p),LIGHT)*0.5+0.5;
        float R = max(dot(reflect(d,normal(p)),LIGHT),0.0);
        vec3 C = mix(mix(vec3(0.5+0.3*T3,0.4*T3,0.9-0.4*T3),vec3(0.6+0.2*T3,0.3+0.4*T3,0.9-0.1*T3),T1),vec3(0.2,0.2,0.4),step(0.01,M.y));
        C = mix(C,vec3(0.4,0.3,0.8),step(0.01,-M.x));
        return C*L+pow(R,16.0);
    }
    void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        
        // Default camera angles when mouse is not active
        vec2 defaultAngles = vec2(0.5, 1.0);
        
        // Interpolate between mouse-controlled angles and default angles
        vec2 A = mix(defaultAngles, iMouse / iResolution * vec2(2.0, 1.0) * 3.1416, iMouseActive);
        
        vec3 D = vec3(cos(A.x)*sin(A.y),sin(A.x)*sin(A.y),cos(A.y));
        D = mix(vec3(1.0,0.0,0.0),D,ceil((A.x+A.y)/10.0));
        vec3 P = D*12.0-vec3(0.0,0.0,iTime*2.0);
        
        vec3 X = normalize(-D);
        vec3 Y = normalize(cross(X,vec3(0.0,0.0,1.0)));
        vec3 Z = normalize(cross(X,Y));
        
        vec2 UV = (fragCoord.xy - iResolution * 0.5) / iResolution.y;
        vec3 R = normalize(mat3(X,Y,Z) * vec3(1.0,UV));
        
        vec4 M = raymarch(P,R);
        vec3 C = mix(color(M.xyz,R),sky(R),smoothstep(0.5,1.0,M.w/50.0));
        gl_FragColor = vec4(C, 1.0);
    }
  `;
  
  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;
  
  // Create uniforms that will be passed to the shader
  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
    iMouse: { value: new THREE.Vector2(0, 0) },
    iMouseActive: { value: 0.0 }
  };
  
  // Create shader material and mesh
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  // Setup mouse interaction
  let mouseTransitionInterval;
  
  container.addEventListener('mousemove', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    uniforms.iMouse.value.x = event.clientX - rect.left;
    uniforms.iMouse.value.y = event.clientY - rect.top;
    uniforms.iMouseActive.value = 1.0;
    
    // Clear any existing transition interval
    if (mouseTransitionInterval) {
      clearInterval(mouseTransitionInterval);
      mouseTransitionInterval = null;
    }
  });
  
  container.addEventListener('mouseleave', () => {
    // Smoothly transition back to default view
    const transitionDuration = 1000; // 1 second
    const transitionSteps = 30;
    const transitionStepTime = transitionDuration / transitionSteps;
    const decrementAmount = 1.0 / transitionSteps;
    
    if (mouseTransitionInterval) {
      clearInterval(mouseTransitionInterval);
    }
    
    mouseTransitionInterval = setInterval(() => {
      uniforms.iMouseActive.value -= decrementAmount;
      if (uniforms.iMouseActive.value <= 0) {
        uniforms.iMouseActive.value = 0;
        clearInterval(mouseTransitionInterval);
        mouseTransitionInterval = null;
      }
    }, transitionStepTime);
  });
  
  // Setup window resize handler
  window.addEventListener('resize', () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    uniforms.iTime.value = performance.now() / 1000;
    renderer.render(scene, camera);
  }
  
  animate();
}

function initPlatformPreview() {
  const platformFeatures = document.querySelectorAll('.platform-feature');
  const previewContainer = document.querySelector('.platform-preview');
  
  if (!platformFeatures.length || !previewContainer) return;
  
  // Set default preview
  updatePlatformPreview('research-portal');
  platformFeatures[0].classList.add('active');
  
  // Add event listeners to platform features
  platformFeatures.forEach(feature => {
    feature.addEventListener('click', () => {
      // Remove active class from all features
      platformFeatures.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked feature
      feature.classList.add('active');
      
      // Update preview
      const featureId = feature.dataset.feature;
      updatePlatformPreview(featureId);
    });
  });
}

function updatePlatformPreview(featureId) {
  const previewContainer = document.querySelector('.platform-preview');
  if (!previewContainer) return;
  
  // Get preview HTML from config
  const previewHtml = platformPreviews[featureId] || platformPreviews['research-portal'];
  
  // Update container with fade effect
  previewContainer.style.opacity = 0;
  
  setTimeout(() => {
    previewContainer.innerHTML = previewHtml;
    previewContainer.style.opacity = 1;
  }, 300);
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('email');
  const interestSelect = document.getElementById('interest');
  const messageText = document.getElementById('message');
  
  if (!emailInput.value) return;
  
  // Here you would normally send this data to your backend
  // For demonstration, we'll just show a thank you message
  const formContainer = event.target;
  
  // Store the form data that would be sent to server
  const formData = {
    email: emailInput.value,
    interest: interestSelect.value,
    message: messageText.value
  };
  
  console.log('Form submission data:', formData);
  
  // Replace form with thank you message
  formContainer.innerHTML = `
    <div class="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
      <svg class="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <h3 class="text-xl font-bold mb-2">Thank You!</h3>
      <p>We've added you to our waitlist and will be in touch soon with updates about Wikigen.me.</p>
    </div>
  `;
}

function initAnimateOnScroll() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Function to check if an element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  // Function to add animation class when element is in viewport
  const handleScroll = () => {
    animatedElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.classList.add('fade-in');
      }
    });
  };
  
  // Add event listener
  window.addEventListener('scroll', handleScroll);
  
  // Check on initial load
  handleScroll();
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
      
      // Scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function initHeaderScrollEffect() {
  const header = document.querySelector('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-md');
      header.classList.add('bg-white/95');
      header.classList.add('backdrop-blur-sm');
    } else {
      header.classList.remove('shadow-md');
      header.classList.remove('bg-white/95');
      header.classList.remove('backdrop-blur-sm');
    }
  });
}

function animateCounters() {
  const counters = [
    { id: 'counter-researchers', target: 25 },
    { id: 'counter-studies', target: 12 },
    { id: 'counter-datasets', target: 28 },
    { id: 'counter-credits', target: 125000, format: value => Math.floor(value/1000) + 'K' }
  ];
  
  // Check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  // Animate counter
  const animateCounter = (counter) => {
    const element = document.getElementById(counter.id);
    if (!element) return;
    
    let current = 0;
    const target = counter.target;
    const duration = 2000; // 2 seconds
    const step = Math.ceil(target / (duration / 16)); // Update every 16ms (60fps)
    const format = counter.format || (value => value);
    
    const updateCounter = () => {
      current += step;
      if (current > target) current = target;
      element.textContent = format(current);
      if (current < target) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    updateCounter();
  };
  
  // Start animation when counters come into view
  const handleScroll = () => {
    const statsSection = document.getElementById('counter-researchers')?.closest('section');
    if (statsSection && isInViewport(statsSection)) {
      counters.forEach(animateCounter);
      window.removeEventListener('scroll', handleScroll);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  // Check initial state
  handleScroll();
}
