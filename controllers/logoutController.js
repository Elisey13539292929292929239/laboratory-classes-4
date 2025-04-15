const { LOGOUT_LINKS } = require("../constants/navigation");
const { getProcessLog } = require("../utils/logger");

const getLogoutView = (_request, response) => {
  response.render("logout.ejs", {
    headTitle: "Shop - Logout",
    path: "/logout",
    activeLinkPath: "/logout",
    menuLinks: LOGOUT_LINKS,
  });
};

const killAplication = (_request, response) => {
  getProcessLog();
  response.send("Aplikacja zostanie zamknięta...");
  process.exit();
};

module.exports = {
  getLogoutView,
  killAplication,
};
