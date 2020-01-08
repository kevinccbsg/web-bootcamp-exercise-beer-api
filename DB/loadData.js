const loadDataFunction = require('./loadDataFunction');

(async () => {
  try {
    await loadDataFunction();
  } catch (e) {
    throw e;
  }
})();
