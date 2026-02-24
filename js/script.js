// ตัวควบคุมแถบเลื่อน [Scroll]
window.addEventListener('scroll', function() {
    const heroLogo = document.querySelector('.hero-logo');
    
    // ใช้ Class แทนการสั่ง Style ตรงๆ เพื่อป้องกันการทับกับ CSS เดิม
    if (window.scrollY > 100) {
        heroLogo.classList.add('scrolled'); 
    } else {
        heroLogo.classList.remove('scrolled');
    }

    // ส่วนของ Badge (ปล่อยไว้เหมือนเดิมได้ แต่เช็คตัวแปรให้ดี)
    const badge = document.querySelector('.new-badge');
    const wrapper = document.querySelector('.product-image-wrapper');
    if (badge && wrapper) {
        const rect = wrapper.getBoundingClientRect();
        // ... โค้ดคำนวณ Badge ของคุณ ...
    }
});





function handleParallax() {
    // เลือก Badge ทั้งหมดที่มี (ทั้งในรูปและวิดีโอ)
    const badges = document.querySelectorAll('.new-badge, .scroll-badge');
    
    badges.forEach(badge => {
        const wrapper = badge.parentElement;
        const rect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            // คำนวณ Progress: 0 (กึ่งกลางจอ) -> 1 (เลื่อนจนสุด)
            let progress = (windowHeight / 2 - rect.top) / (rect.height / 2);
            progress = Math.max(0, Math.min(1, progress));

            // ระยะทางจากกึ่งกลางไปขอบล่าง
            const travelDistance = (wrapper.offsetHeight / 2) - (badge.offsetHeight / 2);
            const moveY = progress * travelDistance;

            badge.style.transform = `translate(-50%, calc(-50% + ${moveY}px))`;
        }
    });
}

// เรียกใช้งานเมื่อ Scroll
window.addEventListener('scroll', handleParallax);







document.querySelectorAll('.collection-item').forEach(item => {
    const video = item.querySelector('.hover-video');

    item.addEventListener('mouseenter', () => {
        video.play();
    });

    item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // กลับไปเริ่มวินาทีที่ 0
    });
});





document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        
        // สลับสถานะเปิด-ปิด
        if (parent.classList.contains('active')) {
            parent.classList.remove('active');
        } else {
            // ปิดตัวอื่นก่อนเปิดตัวที่เลือก (เลือกได้ว่าต้องการแบบนี้ไหม)
            document.querySelectorAll('.faq-item').forEach(child => child.classList.remove('active'));
            parent.classList.add('active');
        }
    });
});






// ส่วนของการสลับ Tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const groups = document.querySelectorAll('.faq-group');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            // 1. เปลี่ยนสถานะปุ่ม (ลบ active จากปุ่มอื่น มาใส่ปุ่มที่คลิก)
            tabs.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');

            // 2. เปลี่ยนเนื้อหา (ซ่อนทุกกลุ่ม แล้วเปิดเฉพาะกลุ่มที่มี ID ตรงกับ targetId)
            groups.forEach(group => {
                group.classList.remove('active'); // เอา active ออกจากทุกกลุ่ม
                
                if (group.id === targetId) {
                    group.classList.add('active'); // ใส่ active ให้กลุ่มที่เลือก
                }
            });
        });
    });
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');

        // 1. จัดการปุ่ม
        tabs.forEach(btn => btn.classList.remove('active'));
        tab.classList.add('active');

        // 2. จัดการเนื้อหา
        groups.forEach(group => {
            // ลบ class active ออกก่อนเพื่อให้ Animation เริ่มต้นใหม่เมื่อกลับมา
            group.classList.remove('active');
            
            if (group.id === targetId) {
                // ใช้ setTimeout เล็กน้อย (10ms) เพื่อให้ Browser รีเซ็ตสถานะก่อนเริ่ม Animation
                setTimeout(() => {
                    group.classList.add('active');
                }, 10);
            }

            // (แถม) ปิด Accordion ที่กางอยู่ใน Tab อื่นๆ เพื่อความสะอาด
            const openItems = group.querySelectorAll('.faq-item.active');
            openItems.forEach(item => item.classList.remove('active'));
        });
    });
});


