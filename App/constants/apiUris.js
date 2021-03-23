const ip = "10.0.2.2";
const uri = `http://${ip}:8080/api/`;

export default {
  login: uri + "login",
  register: uri + "register",
  acceptRequest: uri + "acceptRequest",
  sendRequest: uri + "sendRequest",
  denyRequest: uri + "denyRequest",
  listRequest: uri + "listRequest",
  listFriends: uri + "listFriends",
  deleteFriend: uri + "deleteFriend",
  all: uri + "all",
};
