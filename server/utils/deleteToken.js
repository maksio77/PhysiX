module.exports = async (token) => {
  setTimeout(async () => {
    try {
      await token.deleteOne({ _id: token._id });
    } catch (error) {
      console.error("Delete token error", error);
    }
  }, 30000);
};
