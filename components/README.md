# 公共组件库

## 底部导航组件 (Bottom Nav)

### 文件说明

- `bottom-nav.css` - 底部导航样式文件
- `bottom-nav.js` - 底部导航JavaScript逻辑
- `bottom-nav.html` - 完整组件（包含HTML、CSS、JS，仅供参考）

### 使用方法

#### 1. 引入CSS和JS文件

在HTML页面的 `</body>` 标签之前添加：

```html
<!-- 底部导航（公共组件） -->
<div id="bottom-nav-container"></div>

<!-- 引入底部导航组件 -->
<link rel="stylesheet" href="components/bottom-nav.css">
<script src="components/bottom-nav.js"></script>
```

#### 2. 初始化组件

在页面的 `<script>` 标签中调用初始化函数：

```javascript
// 初始化底部导航，传入当前页面标识
initBottomNav('home');
```

### 页面标识（activeId）

| 标识 | 说明 | 图标 |
|------|------|------|
| `home` | 首页 | fa-home |
| `course` | 必修课 | fa-book-open |
| `create` | 创作中心 | fa-plus |
| `study` | 学习路径 | fa-route |
| `profile` | 我的 | fa-user |

### 使用示例

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的页面</title>
    <!-- 确保页面有CSS变量定义 -->
    <style>
        :root {
            --bg-white: #FFFFFF;
            --border-color: #EEEEEE;
            --text-muted: #999999;
            --text-sub: #666666;
            --color-primary: #0057E3;
        }
    </style>
    <!-- 引入 Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- 页面内容 -->
    <main>
        ...
    </main>

    <!-- 底部导航（公共组件） -->
    <div id="bottom-nav-container"></div>

    <!-- 引入底部导航组件 -->
    <link rel="stylesheet" href="components/bottom-nav.css">
    <script src="components/bottom-nav.js"></script>
    
    <script>
        // 初始化底部导航，'profile' 表示当前在"我的"页面
        initBottomNav('profile');
    </script>
</body>
</html>
```

### 高级用法

#### 自定义导航项配置

```javascript
initBottomNav('home', {
    customItems: [
        { id: 'home', icon: 'fas fa-home', label: '首页', href: 'index.html' },
        { id: 'search', icon: 'fas fa-search', label: '搜索', href: 'search.html' },
        { id: 'create', icon: 'fas fa-plus', label: '发布', href: 'create.html', isCenter: true },
        { id: 'message', icon: 'fas fa-envelope', label: '消息', href: 'message.html' },
        { id: 'profile', icon: 'fas fa-user', label: '我的', href: 'profile.html' }
    ]
});
```

#### 动态更新导航项

```javascript
// 设置当前激活项
setActiveNav('course');

// 更新某个导航项
updateNavItem('home', {
    href: 'new-home.html',
    label: '主页',
    icon: 'fas fa-house'
});
```

### 依赖

- Font Awesome 6.x（用于图标）
- CSS变量支持（现代浏览器）

### 注意事项

1. 确保页面中定义了所需的CSS变量（`--bg-white`, `--border-color`, `--text-muted`, `--color-primary` 等）
2. 确保引入了 Font Awesome 图标库
3. `#bottom-nav-container` 容器需要放在页面内容之后
4. 中间的"创作"按钮具有特殊的凸起样式（`isCenter: true`）
