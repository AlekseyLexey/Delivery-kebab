const {
  registrationService,
  loginService,
  logoutService,
  refreshService,
  updateUserService,
  updateLocationService,
  getLocationService 
} = require("../services/userService");
const cookieConfig = require("../config/cookieConfig");
const HttpError = require("../exceptions/HttpError");
const generateCourierLocation = require("../helpers/generateCourierLocation");

const registration = async (req, res, next) => {
  try {
    const data = req.body;

    const userData = await registrationService(data);

    res.cookie("refreshToken", userData.refreshToken, cookieConfig);

    return res.status(201).json(userData);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = await loginService(email, password);

    res.cookie("refreshToken", userData.refreshToken, cookieConfig);

    return res.status(200).json(userData);
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const countToken = await logoutService(refreshToken);

    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Вы разлогинились" });
  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await refreshService(refreshToken);

    res.cookie("refreshToken", userData.refreshToken, cookieConfig);

    return res.status(200).json(userData);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = res.locals.user;
    const data = req.body;

    const newUserData = await updateUserService(id, data);

    return res.status(200).json(newUserData);
  } catch (e) {
    next(e);
  }
};

const updateLocation = async (req, res, next) => {
  try {
    const { id } = res.locals.user;
    const { lat, lng } = generateCourierLocation(); 

    if(!lat || !lng) {
      throw new HttpError(400, "Координаты обязательны!");
    }
    const user = await updateLocationService(id, lat, lng);
    return res.status(200).json(user.location)
  } catch (e) {
    next(e);
  }
};

const getLocation = async (req, res, next) => {
  try{
    const { userId } = req.params;
    const location = await getLocationService(userId);
    return res.status(200).json(location);
  } catch (e) {
    next(e);
  }
}

module.exports = { registration, login, logout, refresh, updateUser, updateLocation, getLocation };
