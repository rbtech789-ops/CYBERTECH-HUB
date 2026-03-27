    // Ensure Lucide icons render properly on load
        document.addEventListener("DOMContentLoaded", function() {
            lucide.createIcons();
        });

        // 1. Loader & Initialization
        window.onload = function() {
            setTimeout(() => {
                document.getElementById('page-loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('page-loader').style.display = 'none';
                }, 500);
            }, 1000);
            renderHotels('all');
        }

        // 2. Typing Effect (From Cybertech Hub)
        const textElement = document.querySelector('.typing-text');
        const words = ["Digital Services", "Bhutan Tour Packages", "Internet Cafe", "Flight Bookings"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        document.addEventListener('DOMContentLoaded', type);

        // 3. Navbar & Mobile Menu
        const navbar = document.getElementById('navbar');
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        let isMenuOpen = false;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-bhutan-dark', 'shadow-md');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-bhutan-dark', 'shadow-md');
                navbar.classList.add('bg-transparent');
            }
        });

        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            const spans = menuBtn.querySelectorAll('span');
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                spans.classList.add('rotate-45', 'translate-y-2');
                spans.classList.add('opacity-0');
                spans.classList.add('-rotate-45', '-translate-y-2');
            } else {
                mobileMenu.classList.add('translate-x-full');
                spans.classList.remove('rotate-45', 'translate-y-2');
                spans.classList.remove('opacity-0');
                spans.classList.remove('-rotate-45', '-translate-y-2');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => menuBtn.click());
        });

        // 4. Carousel Logic (FIXED IMAGE PATHS)
        const slides = [
            { title: "Tiger's Nest (Taktsang)", desc: "Clinging to a cliff 900 meters above Paro valley.", img: "images/tigernest.jpg" },
            { title: "Punakha Dzong", desc: "The Palace of Great Happiness at the river confluence.", img: "images/punakhadzong.jpg" },
            { title: "Dochula Pass", desc: "108 memorial chortens and panoramic Himalayan views.", img: "images/dochulapass.jpg" }
        ];

        let currentSlide = 0;
        const track = document.getElementById('carousel-track');
        const indicatorsContainer = document.getElementById('carousel-indicators');
        const titleEl = document.getElementById('slide-title');
        const descEl = document.getElementById('slide-desc');

        slides.forEach((slide, index) => {
            const div = document.createElement('div');
            div.className = 'carousel-slide flex-shrink-0 h-full w-full relative';
            div.innerHTML = `<img src="${slide.img}" class="w-full h-full object-cover rounded-2xl" alt="${slide.title}">`;
            track.appendChild(div);

            const dot = document.createElement('button');
            dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-bhutan-yellow w-8' : 'bg-white/50 hover:bg-white'}`;
            dot.onclick = () => goToSlide(index);
            indicatorsContainer.appendChild(dot);
        });

        function updateCaption(index) {
            titleEl.style.opacity = '0';
            descEl.style.opacity = '0';
            setTimeout(() => {
                titleEl.innerText = slides[index].title;
                descEl.innerText = slides[index].desc;
                titleEl.style.opacity = '1';
                descEl.style.opacity = '1';
            }, 300);
        }

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            const dots = indicatorsContainer.children;
            Array.from(dots).forEach((dot, i) => {
                dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-bhutan-yellow w-8' : 'bg-white/50 hover:bg-white'}`;
            });
            updateCaption(index);
        }

        document.getElementById('next-slide').onclick = () => goToSlide((currentSlide + 1) % slides.length);
        document.getElementById('prev-slide').onclick = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);
        setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

        // 5. Hotel Logic
        const hotels = [
            { name: "Le Méridien", loc: "Thimphu", type: "luxury", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600", rating: 5 },
            { name: "Six Senses", loc: "Paro", type: "luxury", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600", rating: 5 },
            { name: "Hotel Norbuling", loc: "Thimphu", type: "standard", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600", rating: 4 },
            { name: "Tashi Namgay", loc: "Paro", type: "standard", img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600", rating: 3 },
            { name: "Kisa Villa", loc: "Thimphu", type: "budget", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600", rating: 3 },
            { name: "Simtokha Inn", loc: "Punakha", type: "budget", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600", rating: 3 }
        ];

        const grid = document.getElementById('hotel-grid');
        const btns = document.querySelectorAll('.filter-btn');

        function renderHotels(filter) {
            grid.innerHTML = '';
            const filtered = filter === 'all' ? hotels : hotels.filter(h => h.type === filter);
            filtered.forEach(h => {
                const stars = '★'.repeat(h.rating) + '☆'.repeat(5 - h.rating);
                grid.innerHTML += `
                    <div class="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group border border-gray-100">
                        <div class="h-48 overflow-hidden">
                            <img src="${h.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <span class="text-xs font-bold text-bhutan-red uppercase tracking-wide">${h.loc}</span>
                                    <h3 class="text-xl font-bold font-serif">${h.name}</h3>
                                </div>
                                <span class="text-yellow-500 text-sm tracking-widest">${stars}</span>
                            </div>
                            <div class="flex justify-between items-center mt-4">
                                <span class="px-2 py-1 bg-gray-200 text-xs rounded text-gray-600 capitalize">${h.type}</span>
                                <button class="text-bhutan-red font-bold text-sm hover:underline" onclick="document.getElementById('serviceType').value='Bhutan Tour'; toggleFormFields(); document.getElementById('custMessage').value='Inquiry for ${h.name}'; window.location.href='#contact'">Book</button>
                            </div>
                        </div>
                    </div>`;
            });
        }

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => {
                    b.classList.remove('bg-bhutan-dark', 'text-white');
                    b.classList.add('text-gray-600', 'hover:bg-gray-200');
                });
                btn.classList.add('bg-bhutan-dark', 'text-white');
                btn.classList.remove('text-gray-600', 'hover:bg-gray-200');
                renderHotels(btn.dataset.filter);
            });
        });

        // 6. Lightbox
        const lightbox = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        const lbCap = document.getElementById('lightbox-caption');

        function openLightbox(el) {
            const img = el.querySelector('img');
            lbImg.src = img.src;
            lbCap.innerText = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // 7. Combined WhatsApp Form Logic
        function toggleFormFields() {
            const service = document.getElementById('serviceType').value;
            const tourFields = document.getElementById('tourFields');
            if (service === 'Bhutan Tour') {
                tourFields.style.display = 'block';
            } else {
                tourFields.style.display = 'none';
            }
        }

        function sendCombinedWhatsApp(e) {
            e.preventDefault();
            const name = document.getElementById('custName').value;
            const phone = document.getElementById('custPhone').value;
            const service = document.getElementById('serviceType').value;
            const message = document.getElementById('custMessage').value;
            
            let text = `*New Customer Inquiry!*%0a%0a` +
                       `👤 *Name:* ${name}%0a` +
                       `📞 *Mobile:* ${phone}%0a` +
                       `🏢 *Service Type:* ${service}%0a`;

            if (service === 'Bhutan Tour') {
                const packageType = document.getElementById('tourPackage').value;
                text += `🏔️ *Tour Package:* ${packageType}%0a`;
            }

            text += `📝 *Message:* ${message}`;

            window.open(`https://wa.me/919382344882?text=${text}`, '_blank');
            document.getElementById('combinedForm').reset();
            toggleFormFields();
        }