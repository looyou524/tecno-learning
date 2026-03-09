/**
 * 底部导航配置 - AI Study 风格
 * 
 * 使用方法：
 * 1. 在HTML中引入 bottom-nav.js：<script src="components/bottom-nav.js"></script>
 * 2. 在页面底部添加容器：<div id="bottom-nav-container"></div>
 * 3. 调用初始化函数：initBottomNav('当前页面标识', { customItems: BottomNavConfigAI.items })
 * 
 * 可用的页面标识（activeId）：
 * - 'home'    : 首页
 * - 'message' : 消息
 * - 'sales'   : 销售分析
 * - 'ai'      : AI学习
 * - 'profile' : 我的
 */

const BottomNavConfigAI = {
    items: [
        { 
            id: 'home', 
            icon: 'fas fa-home', 
            label: '首页', 
            href: '#' 
        },
        { 
            id: 'message', 
            icon: 'fas fa-comment-dots', 
            label: '消息', 
            href: '#' 
        },
        { 
            id: 'sales', 
            icon: 'fas fa-chart-line', 
            label: '销售分析', 
            href: '#' 
        },
        {
            id: 'ai',
            icon: 'fas fa-robot',
            label: 'Echo',
            href: '移动端_DCR_AI Study_入口.html'
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
 * 快捷初始化函数 - AI Study 风格
 * @param {string} activeId - 当前激活的导航项ID
 * @param {string} containerId - 容器ID，默认 'bottom-nav-container'
 */
function initBottomNavAI(activeId = 'ai', containerId = 'bottom-nav-container') {
    initBottomNav(activeId, {
        containerId: containerId,
        customItems: BottomNavConfigAI.items
    });
}
