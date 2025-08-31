/**
 * Navbar JavaScript - 導航欄功能初始化
 * 標準的點擊展開下拉選單功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 確保 Bootstrap 的 dropdown 功能正常工作
    if (typeof bootstrap !== 'undefined') {
      // 初始化所有下拉選單
      var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
      var dropdownList = dropdownElementList.map(function(dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
      });
      
      console.log('Bootstrap dropdowns initialized:', dropdownList.length);
      
    } else {
      console.warn('Bootstrap is not loaded. Dropdown functionality may not work properly.');
    }
    
    // 為主連結添加點擊事件處理
    document.querySelectorAll('.btn-group .nav-link:not(.dropdown-toggle)').forEach(function(link) {
      link.addEventListener('click', function(e) {
        // 確保主連結正常導航
        // 這裡可以添加額外的邏輯，如果需要的話
      });
    });
    
    // 添加鍵盤導航支援
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        // 按 ESC 鍵關閉所有打開的下拉選單
        document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
          var dropdownToggle = menu.previousElementSibling;
          if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
            var dropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
            if (dropdown) {
              dropdown.hide();
            }
          }
        });
      }
    });
    
    // 點擊外部區域關閉下拉選單
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
          var dropdownToggle = menu.previousElementSibling;
          if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
            var dropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
            if (dropdown) {
              dropdown.hide();
            }
          }
        });
      }
    });
});

// 手機版下拉選單修正
document.addEventListener('DOMContentLoaded', function() {
    function isMobile() {
      return window.innerWidth < 992;
    }

    function handleMobileDropdowns() {
      if (isMobile()) {
        const dropdownMenus = document.querySelectorAll('.navbar .dropdown-menu');
        
        dropdownMenus.forEach(menu => {
          // 清除所有可能影響定位的樣式
          menu.style.cssText = '';
          menu.style.position = 'static';
          menu.style.width = '100%';
          menu.style.margin = '0';
          menu.style.float = 'none';
          menu.style.clear = 'both';
          
          // 設置背景和邊框
          menu.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          menu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
        });

        // 確保按鈕組正確顯示
        document.querySelectorAll('.navbar .btn-group').forEach(group => {
          group.style.display = 'block';
          group.style.width = '100%';
        });

        // 調整下拉按鈕位置
        document.querySelectorAll('.navbar .dropdown-toggle').forEach(toggle => {
          toggle.style.position = 'absolute';
          toggle.style.right = '0';
          toggle.style.top = '0';
          toggle.style.height = '100%';
        });
      }
    }

    // 監聽下拉選單事件
    const dropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('shown.bs.dropdown', handleMobileDropdowns);
      toggle.addEventListener('show.bs.dropdown', handleMobileDropdowns);
    });

    // 視窗大小改變時重新處理
    window.addEventListener('resize', function() {
      if (isMobile()) {
        handleMobileDropdowns();
      }
    });

    // 初始執行
    handleMobileDropdowns();
});
