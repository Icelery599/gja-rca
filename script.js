 AOS.init({ duration: 600, once: true });

  // ------ Static content data ------
  const pages = {
    home: () => `
      <section class="hero"><h2>Shaping Champions for Christ & Society</h2><p>At Rhema Christian Academy, we nurture academic excellence, character, and spiritual growth. Join our family today.</p><a href="#" data-page="admissions" class="btn">Apply Now →</a></section>
      <div class="section"><div class="section-title">Welcome Message</div><p><strong>Proprietor’s Welcome:</strong> It is my joy to welcome you to Rhema Christian Academy, where we blend faith with world-class learning. Our vision: Raising leaders of impact.<br><strong>School Motto:</strong> "Knowledge, Wisdom, Character."</p><div class="grid-3" style="margin-top:30px;"><div class="card"><i class="fas fa-book-open"></i><h3>Mission</h3><p>To provide holistic education that inspires excellence and godliness.</p></div><div class="card"><i class="fas fa-eye"></i><h3>Vision</h3><p>To be a premier Christian institution producing global change agents.</p></div><div class="card"><i class="fas fa-chalkboard-user"></i><h3>Quick Links</h3><p><a href="#" data-page="admissions">Admissions</a> | <a href="#" data-page="academics">Academics</a> | <a href="#" data-page="contact">Contact</a></p></div></div><div><h3>Latest News</h3><div class="news-item"><i class="fas fa-star-of-life"></i> 2026 Inter-house sports: Save the date — March 28th</div><div class="news-item"><i class="fas fa-trophy"></i> Rhema wins National Science Quiz Championship!</div><div class="news-item"><i class="fas fa-graduation-cap"></i> 100% pass rate in WASSCE 2025.</div></div><div style="margin-top:30px;"><h3>Parent Testimonial</h3><div class="card"><i class="fas fa-quote-left"></i> Rhema Academy transformed my son's academic discipline and spiritual life. Highly recommended! — Mr. Adebayo</div></div></div>
    `,
    about: () => `<div class="section"><div class="section-title">About Rhema Academy</div><p><strong>History:</strong> Founded in 2005, Rhema Christian Academy began as a small nursery with 20 students. Over two decades, we have expanded into a full-fledged institution comprising Conventional, ACE, and Secondary sections.</p><p><strong>Vision & Mission:</strong> Producing total graduates equipped for eternity and time.</p><p><strong>Core Values:</strong> Excellence, Integrity, Service, Discipline, Godliness.</p><h3>School Leadership</h3><div class="grid-3"><div class="card"><i class="fas fa-user-tie"></i><h4>Dr. Grace Okonkwo</h4><p>Principal / Proprietress</p></div><div class="card"><i class="fas fa-chalkboard"></i><h4>Mr. Emmanuel Okafor</h4><p>Vice Principal Academics</p></div><div class="card"><i class="fas fa-pray"></i><h4>Rev. David Olamide</h4><p>Chaplain & Spiritual Head</p></div></div><h3>School Achievements</h3><ul><li>Best Private School in Lagos State 2023, 2024</li><li>National Junior Mathematics Champions 2025</li><li>Outstanding Cambridge Learner Awards</li></ul></div>`,
    academics: () => `<div class="section"><div class="section-title">Academic Sections</div><div class="academic-tabs"><button class="tab-btn active" data-tab="conventional">Conventional Section</button><button class="tab-btn" data-tab="ace">ACE Section</button><button class="tab-btn" data-tab="secondary">Rhema Secondary (JSS & SSS)</button></div><div id="conventional" class="tab-pane active-pane"><div class="card"><h3>📚 Nigerian/British Curriculum</h3><p>Class structure: Nursery – Grade 9. Learning activities: STEM clubs, literacy, and creative arts. Our teachers are certified professionals.</p><p><strong>Teachers:</strong> Mrs. Funke, Mr. James, and 25+ experienced staff.</p></div></div><div id="ace" class="tab-pane"><div class="card"><h3>✝️ Accelerated Christian Education (ACE)</h3><p>Individualized learning, character development, mastery-based system. Students progress at their own pace with biblical integration.</p><p>Academic objectives: Academic excellence and Christ-like character.</p></div></div><div id="secondary" class="tab-pane"><div class="card"><h3>🏫 Junior & Senior Secondary</h3><p>JSS1-3 broad subjects, SSS1-3 with science, arts, commercial. WAEC/NECO excellence, career guidance, mentorship programs.</p><p>Recent results: 92% credit & above in 5 subjects including Math & English.</p></div></div></div><script>document.querySelectorAll('.tab-btn').forEach(btn=>{btn.onclick=()=>{let tab=btn.dataset.tab;document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active-pane'));document.getElementById(tab).classList.add('active-pane');document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}});<\/script>`,
    admissions: () => `<div class="section"><div class="section-title">Admissions</div><div class="grid-3"><div class="card"><i class="fas fa-file-alt"></i><h3>Requirements</h3><p>Birth certificate, previous results, transfer certificate, and 2 passport photos. Entrance exam/interview for new students.</p></div><div class="card"><i class="fas fa-list-ol"></i><h3>Application Process</h3><p>1. Fill online/print form. 2. Pay application fee. 3. Entrance assessment. 4. Admission letter.</p></div><div class="card"><i class="fas fa-money-bill-wave"></i><h3>Fees Structure</h3><p>Tuition ranges from ₦250,000 - ₦550,000 per session (depending on section). Payment plan available. <a href="#" id="download-fake-form" style="color:var(--accent);">Download Admission Form (PDF demo)</a></p></div></div><div class="card" style="margin-top:20px;"><h3>FAQs</h3><p><strong>Q:</strong> Is boarding available? <strong>A:</strong> Yes for Secondary section.<br><strong>Q:</strong> When does admission open? <strong>A:</strong> Rolling admission all year.</p></div><div class="contact-form"><h3>Request Info</h3><input id="inquiry-name" placeholder="Name"><input id="inquiry-email" placeholder="Email"><button onclick="alert('Inquiry sent (demo). We will contact you!')" class="btn">Send</button></div></div>`,
    "student-life": () => `<div class="section"><div class="section-title">Student Life</div><div class="grid-3"><div class="card"><i class="fas fa-microphone-alt"></i><h3>Clubs & Societies</h3><p>Debate, Science, Drama, Press Club, Music, ICT Club.</p></div><div class="card"><i class="fas fa-futbol"></i><h3>Sports Activities</h3><p>Soccer, Basketball, Athletics, Swimming, Taekwondo.</p></div><div class="card"><i class="fas fa-hiking"></i><h3>Excursions & Field Trips</h3><p>Annual educational tours, leadership camps, corporate visits.</p></div><div class="card"><i class="fas fa-praying-hands"></i><h3>Spiritual Development</h3><p>Daily devotion, weekly chapel service, Vacation Bible School.</p></div></div></div>`,
    gallery: () => `<div class="section"><div class="section-title">Gallery</div><div class="gallery-grid" id="gallery-grid"></div></div><script>const images = ['https://placehold.co/600x400/0b3b3f/white?text=Graduation+2025','https://placehold.co/600x400/e0a82b/1e2a3e?text=Science+Lab','https://placehold.co/600x400/2c4f4f/white?text=Sports+Day','https://placehold.co/600x400/5a4a2e/white?text=Chapel+Service'];const galleryDiv=document.getElementById('gallery-grid');if(galleryDiv){images.forEach((src,i)=>{let div=document.createElement('div');div.classList.add('gallery-item');div.style.backgroundImage=\`url('\${src}')\`;div.onclick=()=>{let modal=document.getElementById('imageModal');let modalImg=document.getElementById('modalImg');modal.style.display='flex';modalImg.src=src;};galleryDiv.appendChild(div);});}<\/script>`,
    news: () => `<div class="section"><div class="section-title">News & Events</div><div class="news-item"><h3>🎉 Annual Career Fair 2026</h3><p>Date: April 15, 2026. Top professionals will inspire our students.</p></div><div class="news-item"><h3>🏆 Academic Achievements</h3><p>Rhema Academy emerges 1st in Lagos State Debate Championship.</p></div><div class="news-item"><h3>📢 Parent-Teacher Conference</h3><p>March 30th - 31st, 2026. Venue: School Hall.</p></div><div class="card"><p>Subscribe to our newsletter for real-time updates →</p><div><input id="news-sub" placeholder="Email"><button onclick="alert('Newsletter subscribed!')">Subscribe</button></div></div></div>`,
    staff: () => `<div class="section"><div class="section-title">Staff Directory</div><div class="grid-3"><div class="card"><i class="fas fa-users"></i><h3>Management Team</h3><p>Principal: Dr. Grace Okonkwo<br>Vice Principal: Mr. Emmanuel Okafor<br>Admin Officer: Mrs. Rachael Obi</p></div><div class="card"><i class="fas fa-chalkboard-user"></i><h3>Teaching Staff</h3><p>Over 45 qualified educators across Maths, English, Sciences, Arts, ACE facilitators.</p></div><div class="card"><i class="fas fa-building"></i><h3>Administrative Staff</h3><p>Accounts, ICT Support, Library, Transport, Medical & Security.</p></div></div></div>`,
    contact: () => `<div class="section"><div class="section-title">Contact Us</div><div class="grid-3"><div class="card"><i class="fas fa-map-pin"></i><h3>Address</h3><p>12 Faith Avenue, GRA, Ikeja, Lagos State.</p><iframe width="100%" height="180" style="border:0; margin-top:10px;" loading="lazy" src="https://maps.google.com/maps?q=6.5244,3.3792&z=15&output=embed"></iframe></div><div class="card"><i class="fas fa-phone"></i><h3>Phone & Email</h3><p>📞 +234 802 345 6789, +234 809 876 5432<br>✉️ info@rhemaacademy.edu.ng<br>✉️ admissions@rhemaacademy.edu.ng</p></div><div class="card"><h3>Send Message</h3><div class="contact-form"><input type="text" id="cname" placeholder="Your Name"><input type="email" id="cemail" placeholder="Email"><textarea rows="3" placeholder="Message"></textarea><button onclick="alert('Message sent (demo). We’ll reply soon.')" class="btn">Submit</button></div></div></div></div>`,
    "parent-portal": () => `<div class="section"><div class="section-title h-200 d-flex bg-dark">Parent Portal (Demo)</div><div class="result-login"><br><br><h3>Student Login</h3><br><br><input type="text" id="student-id" placeholder="Student ID"><br><br><input type="password" id="portal-pass" placeholder="Password"><br><br><button class="btn" onclick="document.getElementById('demoResult').classList.toggle('hidden');">Access Results</button><div id="demoResult" class="hidden" style="margin-top:20px;"><p><strong>Student: Michael O.</strong><br>Term 2, 2025/26:<br>Mathematics: 85%<br>English: 78%<br>Science: 92%<br>Attendance: 94%<br>Fee Status: Paid</p><button class="btn" style="background:#ccc;" onclick="alert('Mock fee payment portal')">Pay Fees Now</button></div></div><div class="card" style="margin-top:25px;"><p><i class="fas fa-bell"></i> School notices will appear here after login. Next PTA meeting: April 5th.</p></div></div>`
  };

  function renderPage(pageId) {
    const contentDiv = document.getElementById('app-content');
    if (pages[pageId]) {
      contentDiv.innerHTML = pages[pageId]();
      // reattach academic tabs logic manually because dynamic content
      if (pageId === 'academics') {
        setTimeout(() => {
          document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => {
              const tabId = btn.dataset.tab;
              document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active-pane'));
              document.getElementById(tabId).classList.add('active-pane');
              document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
            };
          });
        }, 50);
      }
      if (pageId === 'gallery') {
        // will execute script inside HTML, but we also re-trigger gallery building after innerHTML - rerun function
        const buildGallery = () => {
          const galleryDiv = document.getElementById('gallery-grid');
          if (galleryDiv && galleryDiv.children.length === 0) {
            const images = ['https://placehold.co/600x400/0b3b3f/white?text=Graduation+Ceremony', 'https://placehold.co/600x400/e0a82b/white?text=STEM+Workshop', 'https://placehold.co/600x400/2c4f4f/white?text=Interhouse+Sports', 'https://placehold.co/600x400/7c5e3a/white?text=Christmas+Celebration'];
            images.forEach(src => {
              let div = document.createElement('div');
              div.classList.add('gallery-item');
              div.style.backgroundImage = `url('${src}')`;
              div.style.backgroundSize = 'cover';
              div.onclick = () => { const modal = document.getElementById('imageModal'); const modalImg = document.getElementById('modalImg'); modal.style.display = 'flex'; modalImg.src = src; };
              galleryDiv.appendChild(div);
            });
          }
        };
        setTimeout(buildGallery, 30);
      }
      if (pageId === 'admissions') {
        const downloadLink = document.getElementById('download-fake-form');
        if(downloadLink) downloadLink.onclick = (e) => { e.preventDefault(); alert('Admission form PDF demo: would download in real scenario'); };
      }
      // update active nav
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if(link.dataset.page === pageId) link.classList.add('active');
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      contentDiv.innerHTML = `<div class="section"><h2>Page not found</h2></div>`;
    }
  }

  // navigation event listeners
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if(page) renderPage(page);
    });
  });
  // mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));

  // also handle any footer or dynamic click delegate for page links
  document.body.addEventListener('click', (e) => {
    const anchor = e.target.closest('[data-page]');
    if(anchor && anchor.tagName === 'A') {
      e.preventDefault();
      const pageVal = anchor.getAttribute('data-page');
      if(pageVal) renderPage(pageVal);
      if(navLinks.classList.contains('show')) navLinks.classList.remove('show');
    }
  });

  // modal close
  const modal = document.getElementById('imageModal');
  document.querySelector('.modal-close').onclick = () => modal.style.display = 'none';
  modal.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

  // default page
  renderPage('home');