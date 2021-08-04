window.dom = {
  //新增节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  //节点后面加节点
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //节点前面加节点
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //节点里面加节点
  append(parent, node) {
    parent.appendChild(node);
  },
  //给节点加父节点
  warp(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //移除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //移除节点下的所有子节点
  empty(node) {
    // const childNodes = node.childNodes
    //ES6可以简写为这样
    // const {childNodes} = node
    const array = [];
    let x = node.firstChild;
    //不能用for循环，因为length是变化的
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    return array;
  },
  //属性的设置和获取，重载，函数可以接受不同个数的参数
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //设置节点的文本,适配，适配任何浏览器
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  //设置节点的html,可读可写
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //设置节点的样式
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        for (const key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  //给节点添加class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //给节点添加事件处理函数
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  //移除节点的事件处理函数
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //在节点里查找符合选择器的节点
  find(selector, scope) {
    //这里用了断路逻辑，scope为true就为scope
    return (scope || document).querySelectorAll(selector);
  },
  //节点的父节点
  parent(node) {
    return node.parentNode;
  },
  //节点的子节点
  children(node) {
    return node.children;
  },
  //节点的兄弟节点
  siblings(node) {
    return Array.from(node.parentNode.children).filter((x) => x !== node);
  },
  //节点的下一个兄弟节点
  next(node) {
    let x = node.nextSibling;
    while (x.NodeType !== 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //节点的上一个兄弟节点
  previous(node) {
    let x = node.previousSibling;
    while (x.NodeType !== 3) {
      x = x.previousSibling;
    }
    return x;
  },
  //循环节点列表
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //获取节点的排行
  index(node) {
    let nodes = dome.children(node.parentNode);
    let i; //这里i要放在外面，不然return 拿不到i
    for (i = 0; i < nodes.length; i++) {
      if (node === nodes[i]) {
        break;
      }
    }
    return i;
  },
};
