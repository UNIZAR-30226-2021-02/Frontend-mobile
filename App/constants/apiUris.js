const ip = "10.0.2.2";
const uri = `http://${ip}:8080/api/`;

export default {
  login: uri + "login",
  register: uri + "register",
  all: uri + "all",
};
