/**
 * 获取props属性
 * @param target
 * @param filterFields
 */
export function getProps(target,filterFields = []){
  const props = {
    ...target.state,
    ...target.props
  };
  filterFields.forEach(field => {
    delete props[field];
  });
  return props;
}
