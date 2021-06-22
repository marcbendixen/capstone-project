function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export { getLocalStorage, setLocalStorage }
