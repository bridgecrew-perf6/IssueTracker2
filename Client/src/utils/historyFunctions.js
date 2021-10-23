export function differences(oldDocument, newDocument, users) {
  let changes = []
  function compare(oldValue, newValue, keyValue) {
    if (newDocument[keyValue] && oldValue !== newValue) {
      if (newValue.constructor === Array) {
        let newUsers = users.filter(user => newValue.includes(user._id))
        let oldUsers = users.filter(user => oldValue.map(val => val._id).includes(user._id))
        changes.push({ property: keyValue, oldValue: oldUsers, newValue: newUsers })
      } else {
        changes.push({ property: keyValue, oldValue, newValue })
      }
      return null
    }
  }

  for (const key in newDocument) {
    compare(oldDocument[key], newDocument[key], key)
  }
  return changes
}