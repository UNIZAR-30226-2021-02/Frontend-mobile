const ip = "80.39.50.206";
const uri = `http://${ip}:8082/api/`;

export default {
  login: uri + login,
  register: uri + "register",
  all: uri + "all",
};
