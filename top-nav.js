/**
 * 顶部导航公共组件（AI Study 小蓝书头部抽取）
 *
 * 使用方法：
 * 1. HTML 中添加容器：<div id="top-nav-container"></div>
 * 2. 引入组件资源：<link rel="stylesheet" href="components/top-nav.css"> + <script src="components/top-nav.js"></script>
 * 3. 在页面脚本中调用：initTopNav({ activeTab: 'course' });
 */

// 顶部导航默认配置
const TopNavDefaults = {
    containerId: 'top-nav-container',
    activeTab: 'course', // 'course' | 'task'
    tabs: [
        { id: 'course', label: '课程', href: '移动端_DCR_AI Study_热门课程.html' },
        { id: 'task', label: '任务', href: '移动端_DCR_AI Study_热门任务.html' }
    ],
    showSearch: true,
    points: {
        label: '赚积分',
        value: '520',
        href: '#'
    }
};

/**
 * 初始化顶部导航
 * @param {Object} options - 配置项
 */
function initTopNav(options = {}) {
    const config = Object.assign({}, TopNavDefaults, options);
    const containerId = config.containerId || TopNavDefaults.containerId;
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`顶部导航容器不存在，请添加 <div id="${containerId}"></div>`);
        return;
    }

    renderTopNav(container, config);
    bindTopNavEvents(container, config);
}

/**
 * 渲染顶部导航
 * @param {HTMLElement} container
 * @param {Object} config
 */
function renderTopNav(container, config) {
    const tabs = config.tabs || [];
    const activeTab = config.activeTab || 'course';
    const points = config.points || {};

    let html = '<header class="header"><div class="header-row">';

    // 左侧 Tab 区域
    html += '<div class="header-tabs">';
    tabs.forEach(tab => {
        const isActive = tab.id === activeTab;
        const activeClass = isActive ? 'header-tab ' + tab.id + ' is-active' : 'header-tab ' + tab.id;
        html += `<button class="${activeClass}" data-tab="${tab.id}" data-href="${tab.href || '#'}">${tab.label}</button>`;
    });
    html += '</div>';

    // 右侧搜索 + 积分
    html += '<div class="header-actions flex-center">';
    if (config.showSearch) {
        html += `
            <button class="search-toggle" id="searchToggle">
                <i class="fas fa-search"></i>
            </button>
        `;
    }

    const pointsLabel = points.label || '赚积分';
    const pointsValue = points.value || '0';
    const pointsHref = points.href || '#';

    html += `
        <a href="${pointsHref}" class="header-btn points-btn new-style">
            <span class="points-icon">💎</span>
            <span class="points-text">
                <span class="points-label">${pointsLabel}</span>
                <span class="points-value">${pointsValue}</span>
            </span>
        </a>
    `;

    html += '</div>'; // header-actions
    html += '</div></header>'; // header-row / header

    container.innerHTML = html;
}

/**
 * 绑定顶部导航事件
 * @param {HTMLElement} container
 * @param {Object} config
 */
function bindTopNavEvents(container, config) {
    const searchToggle = container.querySelector('#searchToggle');
    if (searchToggle) {
        searchToggle.addEventListener('click', function () {
            // 预留：打开搜索弹窗或跳转到搜索页
            console.log('打开搜索入口');
        });
    }

    const tabs = container.querySelectorAll('.header-tabs .header-tab');
    tabs.forEach(btn => {
        btn.addEventListener('click', function () {
            const href = this.getAttribute('data-href') || '#';

            // 视觉高亮：统一使用 is-active
            tabs.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');

            // 跳转到对应列表页
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
}

