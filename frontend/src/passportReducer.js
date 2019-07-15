const passportReducer = (state = "", action) => {
  switch (action.type) {
    case "ONLINE":
      return (state = "online");
    case "OFFLINE":
      return (state = "offline");
    default:
      return state;
  }
};

export default passportReducer;
