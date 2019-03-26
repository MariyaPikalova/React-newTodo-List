const initialState = [];
let flag;


export default function list(state = initialState, action) {
  switch(action.type) {

    case 'ADD_TASK':
      return [
        ...state,
       action.payload
      ];

    case 'DELETE_TASK':
      return state.filter((item) => {return item.id!==action.payload});

    case 'TOGGLE_TASK':
      return state.map((item) => {
      if (item.id === action.payload) item.completed=!item.completed
      return item
      });

    case 'SORT_TASK':
      flag = !flag;
      console.log(flag);
      let sorted = state.sort((a, b) => {
        const x = a.text.toLowerCase();
        const y = b.text.toLowerCase();
        return (flag ? x > y : x < y);
      });
      return [...sorted];

    case 'SORT_DATE':
      flag = !flag;
      console.log(flag);
      let sortedDate = state.sort(function (a, b) {
        const x = new Date(a.date).getTime();
        const y = new Date(b.date).getTime();
        return (flag ? x > y : x < y);
      });
      return [...sortedDate];

    case 'FILTER_TASK':
      let filterItems = state.filter(value =>
         value.text.indexOf(action.payload)!== -1)
       return filterItems;

    case 'FILTER_DATE':
      let filterDate = state.filter(value =>
        value.date.indexOf(action.payload)!== -1
      )
      return filterDate;

    default:
      return state
  }
  return state;
}