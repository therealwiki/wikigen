import { platformPreviews } from './config.js';

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
  
  // Animate counters
  animateCounters();
});

function initDataFlowAnimation() {
  const container = document.getElementById('animation-container');
  if (!container) return;
  
  // Create SVG for data flow animation
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 400 300");
  
  // Background
  const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bgRect.setAttribute("width", "400");
  bgRect.setAttribute("height", "300");
  bgRect.setAttribute("fill", "#F9FAFB");
  bgRect.setAttribute("rx", "8");
  svg.appendChild(bgRect);
  
  // Create nodes
  const nodes = [
    { id: 'contributor', x: 60, y: 70, radius: 22, color: '#EC4899', label: 'Contributors' },
    { id: 'platform', x: 200, y: 150, radius: 32, color: '#6366F1', label: 'Wikigen Platform' },
    { id: 'researcher', x: 340, y: 70, radius: 22, color: '#10B981', label: 'Researchers' },
    { id: 'dataset', x: 200, y: 230, radius: 22, color: '#F59E0B', label: 'Datasets' }
  ];
  
  // Add nodes to SVG
  nodes.forEach(node => {
    // Node circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", node.radius);
    circle.setAttribute("fill", node.color);
    circle.setAttribute("opacity", "0.85");
    svg.appendChild(circle);
  });
  
  // Create connections
  const connections = [
    { from: 'contributor', to: 'platform', label: 'Data' },
    { from: 'platform', to: 'researcher', label: 'Results' },
    { from: 'platform', to: 'dataset', label: 'Storage' },
    { from: 'dataset', to: 'platform', label: 'Query' },
    { from: 'researcher', to: 'platform', label: 'Analysis' }
  ];
  
  // Add connections to SVG
  connections.forEach(conn => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    
    // Connection path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    
    // Calculate control point for curved lines
    let cpx, cpy;
    if (conn.from === 'dataset' && conn.to === 'platform') {
      cpx = (fromNode.x + toNode.x) / 2 + 60;
      cpy = (fromNode.y + toNode.y) / 2;
    } else if (conn.from === 'researcher' && conn.to === 'platform') {
      cpx = (fromNode.x + toNode.x) / 2;
      cpy = (fromNode.y + toNode.y) / 2 - 50;
    } else if (conn.from === 'contributor' && conn.to === 'platform') {
      cpx = (fromNode.x + toNode.x) / 2;
      cpy = (fromNode.y + toNode.y) / 2 - 50;
    } else if (conn.from === 'platform' && conn.to === 'researcher') {
      cpx = (fromNode.x + toNode.x) / 2;
      cpy = (fromNode.y + toNode.y) / 2 - 50;
    } else {
      cpx = (fromNode.x + toNode.x) / 2;
      cpy = (fromNode.y + toNode.y) / 2 + 20;
    }
    
    const d = `M ${fromNode.x} ${fromNode.y} Q ${cpx} ${cpy} ${toNode.x} ${toNode.y}`;
    path.setAttribute("d", d);
    path.setAttribute("stroke", "#D1D5DB");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
    
    // Animate data packets along the path
    animateDataPacket(svg, path, fromNode.color);
    
    // Connection label
    const pathMidpoint = path.getPointAtLength(path.getTotalLength() / 2);
    
    // Calculate offset for text label based on the connection
    let labelOffsetX = 0;
    let labelOffsetY = -5;
    
    if (conn.from === 'dataset' && conn.to === 'platform') {
      labelOffsetX = 20;
      labelOffsetY = -8;
    } else if (conn.from === 'researcher' && conn.to === 'platform') {
      labelOffsetY = 15;
    } else if (conn.from === 'platform' && conn.to === 'researcher') {
      labelOffsetY = -15;
    } else if (conn.from === 'contributor' && conn.to === 'platform') {
      labelOffsetY = 15;
    }
    
    // Add background to text for better readability
    const textBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const textWidth = conn.label.length * 6 + 6;
    textBg.setAttribute("x", pathMidpoint.x - textWidth / 2 + labelOffsetX);
    textBg.setAttribute("y", pathMidpoint.y - 15 + labelOffsetY);
    textBg.setAttribute("width", textWidth);
    textBg.setAttribute("height", "16");
    textBg.setAttribute("fill", "white");
    textBg.setAttribute("rx", "4");
    textBg.setAttribute("stroke", "#E5E7EB");
    textBg.setAttribute("stroke-width", "1");
    svg.appendChild(textBg);
    
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", pathMidpoint.x + labelOffsetX);
    text.setAttribute("y", pathMidpoint.y - 4 + labelOffsetY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#4B5563");
    text.setAttribute("font-size", "10");
    text.setAttribute("font-weight", "600");
    text.textContent = conn.label;
    svg.appendChild(text);
  });
  
  // Add node labels after connections so they're on top
  nodes.forEach(node => {
    // Node label
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y + node.radius + 18);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#4B5563");
    text.setAttribute("font-size", "12");
    text.setAttribute("font-weight", "600");
    
    // Add background for text
    const textBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const textWidth = node.label.length * 7;
    const padding = 8;
    textBg.setAttribute("x", node.x - textWidth / 2 - padding / 2);
    textBg.setAttribute("y", node.y + node.radius + 8);
    textBg.setAttribute("width", textWidth + padding);
    textBg.setAttribute("height", "16");
    textBg.setAttribute("fill", "white");
    textBg.setAttribute("rx", "4");
    svg.appendChild(textBg);
    
    text.textContent = node.label;
    svg.appendChild(text);
  });
  
  container.appendChild(svg);
}

function animateDataPacket(svg, path, color) {
  const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  packet.setAttribute("r", "4");
  packet.setAttribute("fill", color);
  packet.setAttribute("filter", "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))");
  
  svg.appendChild(packet);
  
  // Create the animation
  const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
  animateMotion.setAttribute("dur", (2 + Math.random() * 2) + "s");
  animateMotion.setAttribute("repeatCount", "indefinite");
  animateMotion.setAttribute("path", path.getAttribute("d"));
  
  packet.appendChild(animateMotion);
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