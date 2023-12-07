module.exports = async (token) => {
  setTimeout(async () => {
    try {
      await token.deleteOne({ _id: token._id });
      console.log("Token deleted");
    } catch (error) {
      console.log("Delete token error", error);
    }
  }, 10000);
};
