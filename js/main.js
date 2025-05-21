// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Burada form verilerini işleyebilir veya bir API'ye gönderebilirsiniz
        alert('Mesajınız gönderildi! (Demo amaçlı)');
        contactForm.reset();
    });
}

// Ürünleri yükle
async function loadProducts() {
    try {
        console.log('Ürünler yükleniyor...');
        // Base URL'yi al
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/js/products.json`);
        console.log('Sunucu yanıtı:', response.status, response.statusText);
        
        if (!response.ok) {
            console.error('HTTP Hata:', response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('JSON içeriği:', text);
        
        if (!text.trim()) {
            console.error('Boş JSON yanıtı');
            throw new Error('Boş JSON yanıtı');
        }
        
        const data = JSON.parse(text);
        console.log('Parse edilmiş veri:', data);
        
        if (!Array.isArray(data)) {
            console.error('Geçersiz veri formatı:', typeof data);
            throw new Error('Geçersiz ürün verisi');
        }
        
        return data;
    } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error);
        console.error('Hata detayı:', error.stack);
        if (error instanceof SyntaxError) {
            console.error('JSON ayrıştırma hatası');
        }
        return [];
    }
}

// Ürün kartı oluştur
function createProductCard(product) {
    console.log('Ürün kartı oluşturuluyor:', product);
    
    const imagePath = product.image;
    console.log('Görsel yolu:', imagePath);
    
    return `
        <div class="product-card" 
            data-category="${product.category || ''}"
            data-material="${product.material || ''}"
            data-price="${product.price}"
            data-name="${(product.name || '').toLowerCase()}"
            onclick="showProductDetail('${product.id}')"
        >
            <div class="product-image">
                <img 
                    src="${imagePath}" 
                    alt="${product.name}" 
                    onload="console.log('Görsel yüklendi:', '${imagePath}')"
                    onerror="console.error('Görsel yüklenemedi:', '${imagePath}'); this.onerror=null; this.src='images/placeholder.jpg';"
                >
                <div class="product-overlay">
                    <span class="product-category">${product.category || ''}</span>
                </div>
                <div class="product-price">${product.price} ₺</div>
            </div>
            <h3>${product.name || ''}</h3>
            <p>${product.description || ''}</p>
            <div class="product-details">
                <span class="material">${product.material || ''}</span>
                <span class="size">${product.dimensions || ''}</span>
            </div>
            <div class="product-features">
                <ul>
                    ${(product.features || []).map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Ürün detayını göster
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            <div class="product-detail-info">
                <h2>${product.name || ''}</h2>
                <div class="product-detail-price">${product.price} ₺</div>
                <p>${product.description || ''}</p>
                <div class="product-details">
                    <span class="material">${product.material || ''}</span>
                    <span class="size">${product.dimensions || ''}</span>
                </div>
                <h3>Özellikler</h3>
                <ul class="product-detail-features">
                    ${(product.features || []).map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Modal'ı kapat
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

// Ürünleri filtrele
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const material = document.getElementById('materialFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    
    let filteredProducts = [...products];
    
    // Arama filtresi
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            (product.name || '').toLowerCase().includes(searchTerm) ||
            (product.description || '').toLowerCase().includes(searchTerm)
        );
    }
    
    // Kategori filtresi
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }
    
    // Malzeme filtresi
    if (material !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.material === material
        );
    }
    
    // Fiyat filtresi
    if (priceRange !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.price);
            switch(priceRange) {
                case '0-200': return price <= 200;
                case '200-300': return price > 200 && price <= 300;
                case '300-400': return price > 300 && price <= 400;
                case '400+': return price > 400;
                default: return true;
            }
        });
    }
    
    // Sıralama
    switch(sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
            break;
    }
    
    // Filtrelenmiş ürünleri göster
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Sayfa yüklendi, ürünler yükleniyor...');
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) {
        console.error('Ürün grid elementi bulunamadı!');
        return;
    }
    
    try {
        products = await loadProducts();
        console.log('Yüklenen ürün sayısı:', products.length);
        console.log('Yüklenen ürünler:', products);
        
        if (products.length === 0) {
            productGrid.innerHTML = '<p class="error-message">Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>';
            return;
        }
        
        // Ürünleri yükle
        productGrid.innerHTML = products.map(product => createProductCard(product)).join('');
        console.log('Ürün kartları oluşturuldu');
        
        // Filtreleme olaylarını ekle
        document.getElementById('productSearch').addEventListener('input', filterProducts);
        document.getElementById('categoryFilter').addEventListener('change', filterProducts);
        document.getElementById('materialFilter').addEventListener('change', filterProducts);
        document.getElementById('priceFilter').addEventListener('change', filterProducts);
        document.getElementById('sortFilter').addEventListener('change', filterProducts);
        
        // Modal kapatma olayını ekle
        document.querySelector('.close-modal').addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('productModal');
            if (e.target === modal) {
                closeModal();
            }
        });
        
    } catch (error) {
        console.error('Sayfa yüklenirken hata oluştu:', error);
        productGrid.innerHTML = '<p class="error-message">Bir hata oluştu. Lütfen sayfayı yenileyin.</p>';
    }
});

// SSS Accordion işlevselliği
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Diğer tüm açık öğeleri kapat
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Tıklanan öğeyi aç/kapat
            this.classList.toggle('active');
        });
    });
}); 