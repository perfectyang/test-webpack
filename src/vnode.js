class VNode {
  constructor (tag, props, children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
}

const tree = new VNode('div', {class: 'app'}, [
  '中文',
  new VNode('p', {class: 'conten'})
])
console.log('tree', tree)