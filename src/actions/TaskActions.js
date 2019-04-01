export const addTask = (text, date)=> {
    const item = {
      id: Date.now().toString(),
      text,
      date,
      completed:false
    };
    return {
      type: "ADD_TASK",
      payload: item
    }
};

export const deleteTask = (id) => {
  return {
    type: "DELETE_TASK",
    payload: id
  }
};

export const filterTask = (id) => {
  return {
    type: "FILTER_TASK",
    payload: id
  }
};

export const filterDate = (id) => {
  return {
    type: "FILTER_DATE",
    payload: id
  }
};

export const toggleTask = (id) => {
  return {
    type: "TOGGLE_TASK",
    payload: id
  }
};

export const sortTask = (item) => {
  return {
    type: "SORT_TASK",
    payload: item
  }
};

export const sortDate = (item) => {
  return {
    type: "SORT_DATE",
    payload: item
  }
};