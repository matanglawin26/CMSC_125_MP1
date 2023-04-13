class Display {
  constructor(res_list, user_list) {
    this.__res_list = res_list;
    this.__user_list = user_list;
    this.__res_len = res_list.length;
    this.__user_len = user_list.length;
  }

  header() {
    console.log(`${this.__res_len} Resources\t\t${this.__user_len} Users`);
  }

  status(users) {
    console.log("SUD STATUS");
    for (let user of users) {
      console.log(user.display());
    }
    return true;
  }
}

export default Display;