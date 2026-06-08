// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  AOS.init({ duration: 600, once: true, offset: 50 });
  setupEventListeners();
  renderPage('home');
  loadUserPreferences();
}

// ========== UTILITIES ==========
const Utils = {
  showNotification(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('notification-toast');
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-times-circle',
      warning: 'fas fa-exclamation-circle',
      info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `<i class="${icons[type]}"></i><span>${message}</span>`;
    toast.className = `notification-toast show ${type}`;
    
    setTimeout(() => toast.classList.remove('show'), duration);
  },

  showLoader(show = true) {
    document.getElementById('loading-spinner').classList.toggle('show', show);
  },

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  },

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  validatePhone(phone) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone);
  },

  saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};

// ========== FORM VALIDATION ==========
const FormValidator = {
  validateForm(formElement) {
    let isValid = true;
    const inputs = formElement.querySelectorAll('[required]');
    
    inputs.forEach(input => {
      const formGroup = input.closest('.form-group');
      const value = input.value.trim();
      
      if (!value) {
        this.showError(input, 'This field is required');
        isValid = false;
      } else if (input.type === 'email' && !Utils.validateEmail(value)) {
        this.showError(input, 'Please enter a valid email address');
        isValid = false;
      } else if (input.type === 'tel' && !Utils.validatePhone(value)) {
        this.showError(input, 'Please enter a valid phone number');
        isValid = false;
      } else if (input.type === 'password' && value.length < 8) {
        this.showError(input, 'Password must be at least 8 characters');
        isValid = false;
      } else {
        this.clearError(input);
      }
    });
    
    return isValid;
  },

  showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    let errorDiv = formGroup.querySelector('.form-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      formGroup.appendChild(errorDiv);
    }
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  },

  clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const errorDiv = formGroup.querySelector('.form-error');
    if (errorDiv) errorDiv.remove();
  }
};

// ========== PAGE CONTENT DATA ==========
const pages = {
  home: () => `
    <section class="hero">
      <div class="hero-content">
        <h2>Shaping Champions for Christ & Society</h2>
        <p>At Rhema Christian Academy, we nurture academic excellence, character development, and spiritual growth through faith-based education in a welcoming community.</p>
        <div class="hero-buttons">
          <button class="btn" onclick="goToPage('admissions')"><i class="fas fa-edit"></i> Apply Now</button>
          <button class="btn btn-secondary" onclick="goToPage('about')"><i class="fas fa-info-circle"></i> Learn More</button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="grid-3">
        <div class="card" data-aos="fade-up">
          <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
          <h3>Academic Excellence</h3>
          <p>Rigorous curriculum combining traditional and modern teaching methods to ensure students achieve their full academic potential.</p>
          <a href="#" class="card-link" onclick="goToPage('academics'); return false;"><i class="fas fa-arrow-right"></i> View Programs</a>
        </div>

        <div class="card" data-aos="fade-up" data-aos-delay="100">
          <div class="card-icon"><i class="fas fa-users"></i></div>
          <h3>Character Building</h3>
          <p>Development of well-rounded individuals with strong values, integrity, and leadership qualities rooted in Christian principles.</p>
        </div>

        <div class="card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-icon"><i class="fas fa-cross"></i></div>
          <h3>Spiritual Growth</h3>
          <p>Nurturing faith and moral development through chapel services, Bible studies, and community service initiatives.</p>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--light-bg);">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Quick Stats</h2>
      </div>
      <div class="grid-4" id="stats-container">
        <div class="card text-center" data-aos="fade-up">
          <div style="font-size: 2.5rem; color: var(--accent); font-weight: 700;">850+</div>
          <p style="margin-top: 8px;">Active Students</p>
        </div>
        <div class="card text-center" data-aos="fade-up" data-aos-delay="100">
          <div style="font-size: 2.5rem; color: var(--accent); font-weight: 700;">65+</div>
          <p style="margin-top: 8px;">Teaching Staff</p>
        </div>
        <div class="card text-center" data-aos="fade-up" data-aos-delay="200">
          <div style="font-size: 2.5rem; color: var(--accent); font-weight: 700;">20</div>
          <p style="margin-top: 8px;">Years of Excellence</p>
        </div>
        <div class="card text-center" data-aos="fade-up" data-aos-delay="300">
          <div style="font-size: 2.5rem; color: var(--accent); font-weight: 700;">95%</div>
          <p style="margin-top: 8px;">Success Rate</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Latest News & Events</h2>
      </div>
      <div id="news-container"></div>
    </section>
  `,

  about: () => `
    <section class="section">
      <div class="grid-2" style="align-items: center;">
        <div data-aos="fade-right">
          <img src="https://images.unsplash.com/photo-1427504494785-cdcffdb3daea?w=500&h=400&fit=crop" alt="School Building" style="border-radius: 16px; box-shadow: var(--shadow-lg); width: 100%;">
        </div>
        <div data-aos="fade-left">
          <h2 class="section-title">About Our Academy</h2>
          <p style="margin: 20px 0; color: var(--text-muted); line-height: 1.8;">
            Founded in 2005, Rhema Christian Academy (merged with Grace Junior Academy in 2020) has established itself as a beacon of educational excellence in Ardo Kola, Taraba State. Our institution combines rigorous academics with Christian values, creating an environment where students thrive intellectually, spiritually, and socially.
          </p>
          <p style="margin: 20px 0; color: var(--text-muted); line-height: 1.8;">
            With modern facilities, dedicated staff, and innovative teaching methodologies, we prepare students for success in higher education and meaningful contributions to society.
          </p>
          <a href="#" class="btn mt-20" onclick="goToPage('admissions'); return false;"><i class="fas fa-edit"></i> Apply Now</a>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--light-bg);">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Our Mission & Vision</h2>
      </div>
      <div class="grid-2">
        <div class="card" data-aos="fade-up">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-bullseye"></i></div>
          <h3>Our Mission</h3>
          <p>To provide holistic education that nurtures academic excellence, moral integrity, and spiritual growth, preparing students to become responsible leaders and contributors to society.</p>
        </div>
        <div class="card" data-aos="fade-up" data-aos-delay="100">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-eye"></i></div>
          <h3>Our Vision</h3>
          <p>To be a leading institution of learning that develops enlightened individuals with strong Christian values, critical thinking skills, and a passion for lifelong learning and service.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Core Values</h2>
      </div>
      <div class="grid-3">
        <div class="card" data-aos="fade-up">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-cross"></i></div>
          <h3>Faith & Integrity</h3>
          <p>Rooted in Christian principles, we foster honesty, authenticity, and moral uprightness in all dealings.</p>
        </div>
        <div class="card" data-aos="fade-up" data-aos-delay="100">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-book"></i></div>
          <h3>Academic Excellence</h3>
          <p>Commitment to high standards of learning and continuous improvement in educational delivery.</p>
        </div>
        <div class="card" data-aos="fade-up" data-aos-delay="200">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-handshake"></i></div>
          <h3>Service & Leadership</h3>
          <p>Developing leaders who serve others selflessly and contribute positively to their communities.</p>
        </div>
      </div>
    </section>
  `,

  academics: () => `
    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Academic Programs</h2>
      </div>

      <div class="tab-container">
        <div class="tab-buttons" data-aos="fade-up">
          <button class="tab-btn active" data-tab="nursery">Nursery</button>
          <button class="tab-btn" data-tab="primary">Primary</button>
          <button class="tab-btn" data-tab="secondary">Secondary</button>
        </div>

        <div id="nursery" class="tab-content active" data-aos="fade-up">
          <h3>Nursery Section (Ages 2-5)</h3>
          <p>Our Nursery program provides a nurturing environment where young learners develop foundational skills through play-based learning, social interaction, and early academic concepts.</p>
          <ul style="margin: 20px 0; padding-left: 20px; color: var(--text-muted);">
            <li>Early literacy and numeracy skills</li>
            <li>Social and emotional development</li>
            <li>Creative arts and crafts</li>
            <li>Physical education and coordination</li>
            <li>Character and moral development</li>
          </ul>
        </div>

        <div id="primary" class="tab-content" data-aos="fade-up">
          <h3>Primary Section (Grades 1-6)</h3>
          <p>Comprehensive primary education combining core subjects with extracurricular activities to develop well-rounded learners.</p>
          <ul style="margin: 20px 0; padding-left: 20px; color: var(--text-muted);">
            <li>English Language & Literature</li>
            <li>Mathematics</li>
            <li>Science & Technology</li>
            <li>Social Studies & History</li>
            <li>Christian Religious Studies</li>
            <li>Physical Education & Sports</li>
            <li>Arts & Crafts</li>
            <li>Music & Drama</li>
          </ul>
        </div>

        <div id="secondary" class="tab-content" data-aos="fade-up">
          <h3>Secondary Section (Grades 7-12)</h3>
          <p>Advanced curriculum preparing students for national examinations and higher education with specialized tracks.</p>
          <ul style="margin: 20px 0; padding-left: 20px; color: var(--text-muted);">
            <li>Sciences: Physics, Chemistry, Biology</li>
            <li>Humanities: History, Geography, Economics</li>
            <li>Languages: English, French, Local Languages</li>
            <li>Mathematics (General & Advanced)</li>
            <li>Information Technology</li>
            <li>Computer Science</li>
            <li>Business Studies</li>
            <li>STEM Programs</li>
          </ul>
        </div>
      </div>
    </section>
  `,

  admissions: () => `
    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Admissions</h2>
        <p class="section-subtitle">Join our community of excellence</p>
      </div>

      <div class="grid-2" style="margin: 40px 0;">
        <div class="card" data-aos="fade-up">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-file-alt"></i></div>
          <h3>Requirements</h3>
          <ul style="margin: 15px 0; padding-left: 20px; color: var(--text-muted);">
            <li>Birth Certificate (Original & Photocopy)</li>
            <li>Passport Photograph (4x6)</li>
            <li>Previous School Report Card</li>
            <li>Medical Report & Vaccination Card</li>
            <li>Parent's ID & Proof of Address</li>
            <li>Completed Application Form</li>
          </ul>
        </div>

        <div class="card" data-aos="fade-up" data-aos-delay="100">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-calendar-alt"></i></div>
          <h3>Admission Timeline</h3>
          <ul style="margin: 15px 0; padding-left: 20px; color: var(--text-muted);">
            <li><strong>Applications Open:</strong> January 1st</li>
            <li><strong>Entrance Exam:</strong> February-March</li>
            <li><strong>Interview:</strong> March-April</li>
            <li><strong>Results Release:</strong> May</li>
            <li><strong>Registration:</strong> June</li>
            <li><strong>School Resumption:</strong> September</li>
          </ul>
        </div>
      </div>

      <div class="card" data-aos="fade-up" style="background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%); color: var(--primary); margin: 30px 0;">
        <h3>Online Admission Form</h3>
        <p style="color: rgba(0,0,0,0.7); margin: 15px 0;">Fill out our online form to begin your application process</p>
        <form id="admission-form" onsubmit="handleAdmissionForm(event)" style="background: white; padding: 25px; border-radius: 12px; margin-top: 20px;">
          <div class="form-row">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" name="fullname" required placeholder="Student's Full Name">
            </div>
            <div class="form-group">
              <label>Date of Birth *</label>
              <input type="date" name="dob" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Gender *</label>
              <select name="gender" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div class="form-group">
              <label>Applying For Class *</label>
              <select name="class" required>
                <option value="">Select Class</option>
                <option value="nursery">Nursery</option>
                <option value="primary1">Primary 1</option>
                <option value="primary6">Primary 6</option>
                <option value="jss1">JSS 1</option>
                <option value="ss3">SS 3</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Parent/Guardian Name *</label>
              <input type="text" name="parent_name" required placeholder="Parent's Full Name">
            </div>
            <div class="form-group">
              <label>Parent Email *</label>
              <input type="email" name="parent_email" required placeholder="parent@example.com">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" required placeholder="+234 XXX XXX XXXX">
            </div>
            <div class="form-group">
              <label>Address *</label>
              <input type="text" name="address" required placeholder="Residential Address">
            </div>
          </div>

          <div class="form-group">
            <label>Additional Information</label>
            <textarea name="additional_info" placeholder="Any additional information you'd like to share"></textarea>
          </div>

          <button type="submit" class="btn btn-large"><i class="fas fa-check"></i> Submit Application</button>
        </form>
      </div>
    </section>
  `,

  'student-life': () => `
    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Student Life</h2>
      </div>

      <div class="grid-3" data-aos="fade-up">
        <div class="card">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-users"></i></div>
          <h3>Clubs & Societies</h3>
          <ul style="margin: 15px 0; padding-left: 20px; color: var(--text-muted); font-size: 0.9rem;">
            <li>Debate Club</li>
            <li>ICT Club</li>
            <li>Literary & Arts Club</li>
            <li>Environmental Club</li>
            <li>Robotics Club</li>
            <li>Music & Drama Society</li>
          </ul>
        </div>

        <div class="card" data-aos="fade-up" data-aos-delay="100">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-trophy"></i></div>
          <h3>Sports Programs</h3>
          <ul style="margin: 15px 0; padding-left: 20px; color: var(--text-muted); font-size: 0.9rem;">
            <li>Football (Soccer)</li>
            <li>Athletics & Track</li>
            <li>Basketball</li>
            <li>Volleyball</li>
            <li>Tennis</li>
            <li>Swimming</li>
          </ul>
        </div>

        <div class="card" data-aos="fade-up" data-aos-delay="200">
          <div style="font-size: 2.5rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-book-open"></i></div>
          <h3>Academic Events</h3>
          <ul style="margin: 15px 0; padding-left: 20px; color: var(--text-muted); font-size: 0.9rem;">
            <li>Science Fairs</li>
            <li>Quiz Competitions</li>
            <li>Debate Tournaments</li>
            <li>Annual Sports Day</li>
            <li>Talent Show</li>
            <li>Educational Excursions</li>
          </ul>
        </div>
      </div>
    </section>
  `,

  gallery: () => `
    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Gallery</h2>
        <p class="section-subtitle">Moments from our academy</p>
      </div>
      <div class="gallery-grid" id="gallery-grid"></div>
    </section>
  `,

  news: () => `
    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">News & Events</h2>
      </div>
      <div id="full-news-container"></div>
    </section>
  `,

  contact: () => `
    <section class="section">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Contact Us</h2>
        <p class="section-subtitle">We'd love to hear from you</p>
      </div>

      <div class="grid-2" style="margin: 40px 0;">
        <div class="card" data-aos="fade-up">
          <div style="font-size: 2rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-map-marker-alt"></i></div>
          <h3>Location</h3>
          <p>Ardo Kola<br>Taraba State, Nigeria</p>
          <p style="margin-top: 15px; font-weight: 600; color: var(--primary);">P.M.B 12<br>Ardo Kola, Taraba</p>
        </div>

        <div class="card" data-aos="fade-up" data-aos-delay="100">
          <div style="font-size: 2rem; color: var(--accent); margin-bottom: 15px;"><i class="fas fa-phone"></i></div>
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> +234 802 345 6789</p>
          <p><strong>Email:</strong> info@rhemaacademy.edu.ng</p>
          <p><strong>WhatsApp:</strong> +234 802 345 6789</p>
        </div>
      </div>

      <div class="card" data-aos="fade-up" style="max-width: 800px; margin: 30px auto;">
        <h3 style="margin-bottom: 25px;">Send us a Message</h3>
        <form id="contact-form" onsubmit="handleContactForm(event)">
          <div class="form-row">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" required placeholder="Your Name">
            </div>
            <div class="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" required placeholder="your.email@example.com">
            </div>
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="+234 XXX XXX XXXX">
          </div>

          <div class="form-group">
            <label>Subject *</label>
            <input type="text" name="subject" required placeholder="Message Subject">
          </div>

          <div class="form-group">
            <label>Message *</label>
            <textarea name="message" required placeholder="Your message here..."></textarea>
          </div>

          <button type="submit" class="btn btn-large"><i class="fas fa-paper-plane"></i> Send Message</button>
        </form>
      </div>

      <div style="margin-top: 40px; text-align: center;">
        <h3>Office Hours</h3>
        <p style="margin-top: 10px; color: var(--text-muted);">
          Monday - Friday: 8:00 AM - 4:00 PM<br>
          Saturday: 9:00 AM - 1:00 PM<br>
          Sunday: Closed
        </p>
      </div>
    </section>
  `,

  'parent-portal': () => `
    <section class="section" style="max-width: 600px;">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Parent Portal</h2>
        <p class="section-subtitle">Access your child's academic information</p>
      </div>

      <div class="card" data-aos="fade-up" style="margin-top: 40px;">
        <form id="parent-login-form" onsubmit="handleParentLogin(event)">
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" name="email" required placeholder="parent@example.com">
          </div>

          <div class="form-group">
            <label>Password *</label>
            <input type="password" name="password" required placeholder="Enter your password">
          </div>

          <div class="form-group" style="display: flex; align-items: center; gap: 10px; margin: 15px 0;">
            <input type="checkbox" id="remember-me" name="remember_me">
            <label for="remember-me" style="margin: 0; cursor: pointer;">Remember me</label>
          </div>

          <button type="submit" class="btn btn-large" style="width: 100%;"><i class="fas fa-sign-in-alt"></i> Login</button>
        </form>

        <div style="margin-top: 20px; text-align: center;">
          <p style="color: var(--text-muted);">Don't have an account? <a href="#" style="color: var(--accent); text-decoration: none; font-weight: 600;">Contact Admissions</a></p>
        </div>
      </div>

      <div class="card" data-aos="fade-up" style="margin-top: 30px; background: linear-gradient(135deg, #e8f4f8 0%, #f5e8f8 100%);">
        <h3 style="color: var(--primary); margin-bottom: 15px;"><i class="fas fa-info-circle"></i> Demo Credentials</h3>
        <p style="margin-bottom: 10px;"><strong>Email:</strong> parent@example.com</p>
        <p><strong>Password:</strong> Demo@123</p>
        <p style="margin-top: 15px; font-size: 0.9rem; color: var(--text-muted);">*This is a demonstration portal. Use the credentials above to explore.</p>
      </div>
    </section>
  `
};

// ========== NEWS DATA ==========
const newsData = [
  {
    title: '🎉 Annual Career Fair 2026',
    date: '2026-04-15',
    content: 'Top professionals and university representatives will be on campus to speak with students about career pathways and higher education opportunities.'
  },
  {
    title: '🏆 WAEC Results Released',
    date: '2026-03-20',
    content: '92% of our students achieved Grade A-C in their WAEC examinations. Congratulations to our graduating class!'
  },
  {
    title: '🎓 School Resumption Date',
    date: '2026-01-10',
    content: 'New and returning students are expected back on campus on January 10, 2026. All facilities will be ready for an excellent academic year.'
  },
  {
    title: '⚽ Inter-House Sports Competition',
    date: '2025-12-15',
    content: 'Join us for our annual inter-house sports competition featuring football, basketball, athletics, and more. Event date: December 15, 2025.'
  },
  {
    title: '📚 Scholarship Opportunities Available',
    date: '2025-11-30',
    content: 'Merit-based and need-based scholarships are now available for deserving students. Application deadline: November 30, 2025.'
  }
];

// ========== GALLERY DATA ==========
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1427504494785-cdcffdb3daea?w=400&h=300&fit=crop', alt: 'Graduation Ceremony' },
  { url: 'https://images.unsplash.com/photo-1456973283519-4f7c7d5c29b1?w=400&h=300&fit=crop', alt: 'Science Workshop' },
  { url: 'https://images.unsplash.com/photo-1509228627152-72ae4e4b6fb0?w=400&h=300&fit=crop', alt: 'Sports Day' },
  { url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop', alt: 'School Assembly' },
  { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop', alt: 'Students in Class' },
  { url: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=300&fit=crop', alt: 'School Building' },
];

// ========== PAGE RENDERING ==========
function renderPage(pageId) {
  const contentDiv = document.getElementById('app-content');
  
  if (!pages[pageId]) {
    contentDiv.innerHTML = `<div class="section"><h2>Page Not Found</h2><p>The page you're looking for doesn't exist.</p></div>`;
    return;
  }

  Utils.showLoader(true);
  
  setTimeout(() => {
    contentDiv.innerHTML = pages[pageId]();
    Utils.showLoader(false);

    // Reinitialize components based on page
    if (pageId === 'academics') {
      initializeAcademicTabs();
    }
    if (pageId === 'gallery') {
      initializeGallery();
    }
    if (pageId === 'news') {
      populateNewsSection(false);
    } else if (pageId === 'home') {
      populateNewsSection(true);
    }
    if (pageId === 'admissions') {
      document.getElementById('admission-form').addEventListener('submit', handleAdmissionForm);
    }
    if (pageId === 'contact') {
      document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    }
    if (pageId === 'parent-portal') {
      document.getElementById('parent-login-form').addEventListener('submit', handleParentLogin);
    }

    // Update navigation
    updateActiveNavLink(pageId);
    Utils.scrollToTop();
    AOS.refresh();
  }, 300);
}

function goToPage(pageId) {
  renderPage(pageId);
}

// ========== TAB SYSTEM ==========
function initializeAcademicTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      // Update buttons
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update content
      document.querySelectorAll('.tab-content').forEach(pane => pane.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// ========== GALLERY SYSTEM ==========
function initializeGallery() {
  const galleryDiv = document.getElementById('gallery-grid');
  galleryDiv.innerHTML = '';

  galleryImages.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.backgroundImage = `url('${image.url}')`;
    item.innerHTML = `
      <div class="gallery-item-overlay">
        <i class="fas fa-search-plus"></i>
      </div>
    `;
    item.addEventListener('click', () => openImageModal(image.url, image.alt));
    galleryDiv.appendChild(item);
  });
}

function openImageModal(src, alt) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  modalImg.src = src;
  modalImg.alt = alt;
  modal.classList.add('show');
}

// ========== NEWS SYSTEM ==========
function populateNewsSection(isHomepage = false) {
  const displayNews = isHomepage ? newsData.slice(0, 3) : newsData;
  const containerId = isHomepage ? 'news-container' : 'full-news-container';
  const container = document.getElementById(containerId);
  
  if (!container) return;

  container.innerHTML = displayNews.map((news, index) => `
    <div class="news-item" data-aos="fade-up" data-aos-delay="${index * 100}">
      <div class="news-item-date">${Utils.formatDate(news.date)}</div>
      <h3>${news.title}</h3>
      <p>${news.content}</p>
    </div>
  `).join('');
}

// ========== FORM HANDLERS ==========
function handleAdmissionForm(event) {
  event.preventDefault();
  
  const form = event.target;
  if (!FormValidator.validateForm(form)) {
    Utils.showNotification('Please fill all required fields correctly', 'error');
    return;
  }

  Utils.showLoader(true);
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  setTimeout(() => {
    Utils.showLoader(false);
    Utils.saveToLocalStorage('admission_' + Date.now(), data);
    Utils.showNotification('Application submitted successfully! We will contact you soon.', 'success');
    form.reset();
  }, 1000);
}

function handleContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  if (!FormValidator.validateForm(form)) {
    Utils.showNotification('Please fill all required fields correctly', 'error');
    return;
  }

  Utils.showLoader(true);
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  setTimeout(() => {
    Utils.showLoader(false);
    Utils.saveToLocalStorage('contact_' + Date.now(), data);
    Utils.showNotification('Message sent successfully! We will respond shortly.', 'success');
    form.reset();
  }, 1000);
}

function handleParentLogin(event) {
  event.preventDefault();
  
  const form = event.target;
  const email = form.querySelector('input[name="email"]').value;
  const password = form.querySelector('input[name="password"]').value;
  const rememberMe = form.querySelector('input[name="remember_me"]').checked;

  if (!Utils.validateEmail(email) || password.length < 6) {
    Utils.showNotification('Invalid email or password', 'error');
    return;
  }

  Utils.showLoader(true);
  
  setTimeout(() => {
    Utils.showLoader(false);
    
    if (rememberMe) {
      Utils.saveToLocalStorage('parent_email', email);
    }
    
    Utils.showNotification('Login successful! (Demo Mode)', 'success');
    
    setTimeout(() => {
      alert('Welcome to Parent Portal!\n\nStudent ID: STU-2024-001\nStudent Name: Sample Student\nCurrent Class: SS 2\n\nThis is a demonstration portal.');
    }, 500);
  }, 1000);
}

// ========== NAVIGATION ==========
function setupEventListeners() {
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.dataset.page;
      renderPage(pageId);
      navLinks.classList.remove('show');
    });
  });

  // Modal functionality
  const modal = document.getElementById('imageModal');
  const modalClose = document.querySelector('.modal-close');
  
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function updateActiveNavLink(pageId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
}

// ========== USER PREFERENCES ==========
function loadUserPreferences() {
  const savedEmail = Utils.getFromLocalStorage('parent_email');
  if (savedEmail) {
    const emailInput = document.querySelector('input[name="email"][type="email"]');
    if (emailInput) emailInput.value = savedEmail;
  }
}

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('imageModal').classList.remove('show');
  }
});