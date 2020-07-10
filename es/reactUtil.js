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

/**
 * 判断组件是否在DOM树里
 * @param target
 * @returns {*}
 */
export function isMounted(target){
  return target.updater && target.updater.isMounted && target.updater.isMounted(target);
}
