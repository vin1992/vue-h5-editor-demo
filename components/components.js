module.exports = [
  {
    name: "容器组件",
    description: "article",
    children: []
  },
  {
    name: "功能组件",
    description: "button,image",
    children: [
      {
        name: "按钮",
        component: "c-button"
      },
      {
        name: "图片",
        component: "c-image"
      },
      {
        name: "文章",
        component: "c-article"
      }
    ]
  },
  {
    name: "辅助组件",
    description: "divider .etc",
    children: []
  }
];
