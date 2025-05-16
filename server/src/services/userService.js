const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateAccessToken,
  validateRefreshToken,
} = require("./tokenService");
const HttpError = require("../exceptions/HttpError");
const { ALLOWED_ROLES } = require("../config/constants");

const registrationService = async (data) => {
  if (!ALLOWED_ROLES.includes(data.role)) {
    throw HttpError.BadRequestError(
      `Допустимые роли: ${ALLOWED_ROLES.join(", ")}`
    );
  }

  const candidateByEmail = await User.findOne({ where: { email: data.email } });

  if (candidateByEmail) {
    throw new HttpError(400, "Пользователь с такой почтой уже существует");
  }

  const hashPassword = await bcrypt.hash(data.password, 3);
  const user = await User.create({ ...data, password: hashPassword });

  const { password: _, ...payload } = user.get({ plain: true });

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new HttpError(404, "Пользователя не существует");
  }

  const isPassEqual = await bcrypt.compare(password, user.password);

  if (!isPassEqual) {
    throw new HttpError(400, "Неверный пароль");
  }

  const { password: _, ...payload } = user.get({ plain: true });

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

const logoutService = async (refreshToken) => {
  const countToken = await removeToken(refreshToken);
  return countToken;
};

const refreshService = async (refreshToken) => {
  if (!refreshToken) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const isValid = validateRefreshToken(refreshToken);

  const tokenFromDB = await findToken(refreshToken);

  if (!isValid || !tokenFromDB) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const user = await User.findByPk(tokenFromDB.user_id);

  const { password: _, ...payload } = user.get({ plain: true });

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

const updateUserService = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError(404, "Пользователь не найден");

  const topUpWalletData = data.wallet
    ? { ...user, wallet: Number(user.wallet) + Number(data.wallet) }
    : user;

  await user.update(topUpWalletData);
  return user;
};

module.exports = {
  registrationService,
  loginService,
  logoutService,
  refreshService,
  updateUserService,
};
