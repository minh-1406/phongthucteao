// Hotspots data - 7 locations in the exhibition room
const hotspots = [
  {
    id: 'youth-union',
    name: '📜 Đoàn Trường',
    description: 'Youth Union - Nơi lưu giữ các hoạt động và thành tích của Đoàn Trường qua các năm.',
    position: '-3 0 -5'
  },
  {
    id: 'labor-union',
    name: '👷 Công Đoàn',
    description: 'Labor Union - Khu vực trưng bày hoạt động công đoàn và quyền lợi nhân viên.',
    position: '3 0 -5'
  },
  {
    id: 'honor-students',
    name: '🎓 Học Sinh Giỏi',
    description: 'Honor Students - Bảng ghi danh các thế hệ học sinh xuất sắc của trường.',
    position: '5 0 0'
  },
  {
    id: 'statue',
    name: '🗿 Tượng Kỷ Niệm',
    description: 'Memorial Statue - Tượng chủ tịch kỷ niệm các cột mốc lịch sử của nhà trường.',
    position: '0 0 5'
  },
  {
    id: 'professional-activities',
    name: '🎪 Hoạt Động Chuyên Môn',
    description: 'Professional Activities - Các dự án, sáng kiến và hoạt động chuyên môn nổi bật.',
    position: '-5 0 0'
  },
  {
    id: 'leadership-board',
    name: '🏆 Bảng Lãnh Đạo',
    description: 'Leadership Board - Bảng lãnh đạo và người đứng đầu qua các thời kỳ.',
    position: '4 2 -3'
  },
  {
    id: 'staircase',
    name: '🚪 Cầu Thang Tầng 2',
    description: 'Staircase - Bậc thang dẫn lên tầng 2 với các phòng học và hoạt động khác.',
    position: '-4 2 -3'
  }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initHotspots();
  setupEventListeners();
  setupVRButton();
});

// Create hotspots
function initHotspots() {
  const hotspotContainer = document.getElementById('hotspots');
  const hotspotList = document.getElementById('hotspot-list');

  hotspots.forEach(hotspot => {
    // Create 3D hotspot in scene
    const hotspotEntity = document.createElement('a-entity');
    hotspotEntity.setAttribute('id', hotspot.id);
    hotspotEntity.setAttribute('position', hotspot.position);
    hotspotEntity.setAttribute('class', 'hotspot');
    
    // Add sphere geometry
    hotspotEntity.setAttribute('geometry', 'primitive: sphere; radius: 0.3');
    hotspotEntity.setAttribute('material', 'color: #ffd93d; emissive: #ff9500; opacity: 0.7');
    
    // Add event listener for click
    hotspotEntity.addEventListener('click', function() {
      showModal(hotspot);
    });
    
    // Add text label
    const textEntity = document.createElement('a-entity');
    textEntity.setAttribute('text', {
      value: hotspot.name,
      align: 'center',
      color: '#000',
      font: 'monoid',
      fontSize: 24
    });
    textEntity.setAttribute('position', '0 0.5 0');
    hotspotEntity.appendChild(textEntity);
    
    hotspotContainer.appendChild(hotspotEntity);

    // Add button to list
    const btn = document.createElement('button');
    btn.className = 'hotspot-btn';
    btn.textContent = hotspot.name;
    btn.addEventListener('click', function() {
      showModal(hotspot);
    });
    hotspotList.appendChild(btn);
  });
}

// Show modal with hotspot info
function showModal(hotspot) {
  document.getElementById('modalTitle').textContent = hotspot.name;
  document.getElementById('modalText').textContent = hotspot.description;
  document.getElementById('infoModal').classList.remove('hidden');
}

// Setup event listeners
function setupEventListeners() {
  const closeBtn = document.getElementById('closeModal');
  const modal = document.getElementById('infoModal');

  closeBtn.addEventListener('click', function() {
    modal.classList.add('hidden');
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });
}

// VR Button functionality
function setupVRButton() {
  const vrBtn = document.getElementById('enter-vr');
  const scene = document.querySelector('a-scene');

  vrBtn.addEventListener('click', function() {
    if (scene.is('vr-mode')) {
      // Exit VR
      scene.exitVR();
    } else {
      // Enter VR
      scene.enterVR();
    }
  });
}

// Optional: Add animation to hotspots
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
    
    a-entity.hotspot {
      animation: float 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
});

console.log('✅ VR Exhibition Room initialized with', hotspots.length, 'hotspots');
