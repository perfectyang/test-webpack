class Element {
  constructor (tag, props, children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
}

function createElement (tag, props, children) {
  return new Element(tag, props, children)
}



function setAttr(node, key, value) {
  switch (key) {
      case 'style':
          console.log('node', node)
          node.style.cssText = value;
          break;
      case 'value':
          var tagName = node.tagName || '';
          tagName = tagName.toLowerCase();
          if (tagName === 'input' || tagName === 'textarea') {
              node.value = value;
          } else {
              node.setAttribute(key, value);
          }
          break;
      default:
          node.setAttribute(key, value);
          break;
  }
}

function render(vnode) {
  const fragement = document.createElement(vnode.tag)
  const props = vnode.props
  if (props) {
    for (var propName in props) {
      var propValue = props[propName]
      setAttr(fragement, propName, propValue)
    }
  }
  if (vnode.children) {
    vnode.children.forEach(child => {
      const el = child instanceof Element ? render(child) : document.createTextNode(child)
      fragement.appendChild(el)
    })
  }
  return fragement
}
