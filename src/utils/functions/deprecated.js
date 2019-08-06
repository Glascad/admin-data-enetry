export default function deprecated(propType, explanation) {
    return function validate(props, propName, componentName, ...rest) { // Note ...rest here
      if (props[propName] != null) {
        const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
        console.error(message)
      }
  
      return propType(props, propName, componentName, ...rest); // and here
    };
  }