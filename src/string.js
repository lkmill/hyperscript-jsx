export default function h(tag, attrs, ...children) {
  if (typeof tag === 'function') {
    if (tag.prototype && tag.prototype.constructor && tag.prototype.render) {
      // eslint-disable-next-line new-cap
      const instance = new tag(Object.assign({}, attrs, { children }));
      return instance.render(instance.props, instance.state) || '';
    }

    return tag(Object.assign({}, attrs, { children }));
  }

  if (typeof tag !== 'string') {
    // so that we can use h() to convert html string
    // into node like <div>{h(props.region)}</div>
    return null;
  }

  let str = `<${tag}`;

  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      let value = attrs[key];

      if (value != null && !(value instanceof Function)) {
        if (key === 'className') key = 'class';

        if (key === 'class' && Array.isArray(value)) {
          value = value.filter((value) => value).join(' ');
        }

        str += ` ${key}="${value}"`;
      }
    });
  }

  str += '>';

  if (children.length) {
    let child = children.shift();

    while (child) {
      str += child;

      child = children.shift();
    }
  }

  return `${str}</${tag}>`;
}
