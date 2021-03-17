
export const initialUser = {name: '', email: '', uid: null, id: null};
export const initialQueue = {songs: []};

export const user = (state = initialUser, action) => {
  const {payload, type} = action;
  switch (type) {
    case 'clean_user':
      return initialUser;
    case 'set_user':
      return {...state, ...payload};
    default:
      return state;
  }
};


export const queue = (state = initialQueue, action) => {
  const {payload, type} = action;
  switch (type) {
    case 'clean_queue':
      return initialQueue;
    case 'set_queue':
      return {...state, ...payload};
    default:
      return state;
  }
};




export const reducers = {user, queue};
