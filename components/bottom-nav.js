/**
 * 底部导航公共组件 JavaScript
 * 
 * 使用方法：
 * 1. 在HTML中引入此JS文件：<script src="components/bottom-nav.js"></script>
 * 2. 在页面底部添加容器：<div id="bottom-nav-container"></div>
 * 3. 调用初始化函数：initBottomNav('当前页面标识')
 * 
 * 页面标识（activeId）：
 * - 'home'    : 首页
 * - 'course'  : 必修课
 * - 'create'  : 创作中心
 * - 'study'   : 学习路径
 * - 'profile' : 我的
 */

// 底部导航配置
const BottomNavConfig = {
    items: [
        { 
            id: 'home', 
            icon: 'fas fa-home', 
            label: '首页', 
            href: '移动端_学习主页_003.html' 
        },
        { 
            id: 'course', 
            icon: 'fas fa-book-open', 
            label: '必修课', 
            href: '#' 
        },
        { 
            id: 'create', 
            icon: 'fas fa-plus', 
            label: '创作', 
            href: '移动端_xxzy_上传知识.html', 
            isCenter: true 
        },
        { 
            id: 'study', 
            icon: 'fas fa-route', 
            label: '学习', 
            href: '#' 
        },
        { 
            id: 'profile', 
            icon: 'fas fa-user', 
            label: '我的', 
            href: '#' 
        }
    ]
};

/**
 * 初始化底部导航
 * @param {string} activeId - 当前激活的导航项ID
 * @param {Object} options - 可选配置项
 * @param {string} options.containerId - 容器ID，默认 'bottom-nav-container'
 * @param {Array} options.customItems - 自定义导航项配置
 */
function initBottomNav(activeId = 'home', options = {}) {
    const containerId = options.containerId || 'bottom-nav-container';
    const items = options.customItems || BottomNavConfig.items;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`底部导航容器不存在，请添加 <div id="${containerId}"></div>`);
        return;
    }

    renderBottomNav(container, items, activeId);
    bindNavEvents(container);
}

/**
 * 渲染底部导航
 * @param {HTMLElement} container - 容器元素
 * @param {Array} items - 导航项配置
 * @param {string} activeId - 当前激活项ID
 */
function renderBottomNav(container, items, activeId) {
    let navHTML = '<nav class="bottom-nav">';
    
    items.forEach(item => {
        const isActive = item.id === activeId;
        const activeClass = isActive ? ' active' : '';
        const centerClass = item.isCenter ? ' create-btn' : '';
        
        if (item.isCenter) {
            navHTML += `
                <a href="${item.href}" class="nav-item${centerClass}${activeClass}" data-nav-id="${item.id}">
                    <div class="nav-icon-wrapper">
                        <i class="${item.icon}"></i>
                    </div>
                    <span>${item.label}</span>
                </a>
            `;
        } else {
            navHTML += `
                <a href="${item.href}" class="nav-item${activeClass}" data-nav-id="${item.id}">
                    <i class="${item.icon}"></i>
                    <span>${item.label}</span>
                </a>
            `;
        }
    });
    
    navHTML += '</nav>';
    container.innerHTML = navHTML;
}

/**
 * 绑定导航事件
 * @param {HTMLElement} container - 容器元素
 */
function bindNavEvents(container) {
    const navItems = container.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果href是#，阻止默认行为并显示提示
            if (href === '#') {
                e.preventDefault();
                // 可以在这里添加提示或其他逻辑
            }
            
            // 更新激活状态（视觉反馈）
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * 设置当前激活的导航项
 * @param {string} navId - 导航项ID
 */
function setActiveNav(navId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.dataset.navId === navId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * 更新导航项配置
 * @param {string} navId - 导航项ID
 * @param {Object} updates - 更新的属性
 */
function updateNavItem(navId, updates) {
    const item = document.querySelector(`.nav-item[data-nav-id="${navId}"]`);
    if (!item) return;
    
    if (updates.href) {
        item.setAttribute('href', updates.href);
    }
    if (updates.label) {
        item.querySelector('span').textContent = updates.label;
    }
    if (updates.icon) {
        const iconEl = item.querySelector('i');
        iconEl.className = updates.icon;
    }
}

// 如果需要自动初始化，取消下面的注释
// document.addEventListener('DOMContentLoaded', () => {
//     initBottomNav();
// });
