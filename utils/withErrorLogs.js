module.exports = (callback) => {
  try {
    callback();
  } catch (error) {
    console.log("ERROR LOG:", error)
  }
};