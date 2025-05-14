const HttpError = require("../exceptions/HttpError");

module.exports = function (req, res, next) {
  try {
    const { role } = res.locals.user;

    if (role !== "customer") {
      throw new HttpError(403, "Нет прав");
    }

    next();
  } catch (e) {
    next(e);
  }
};
