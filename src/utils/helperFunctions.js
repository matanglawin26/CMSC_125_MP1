import User from '../classes/User';
import Resource  from '../classes/Resource';

export const uniqueList = (n, inList = null) => {  
    let l = [];
    
    if (inList === null) {
        // let count = 0;
        // while (count < n) {
        //     let rndNum = Math.floor(Math.random() * 10) + 1;
        //     if (!l.includes(rndNum)) {
        //         l.push(rndNum);
        //         count += 1;
        //     }
        // }
        l = shuffle(Array.from({length: 30}, (_, i) => i + 1)).slice(0, n);
    } else {      
      l = inList.slice();
        while (l.length > n) {
            let idx = Math.floor(Math.random() * l.length);
            l.splice(idx, 1);
        }
    }
    return l.sort(compareId);
}

export const userArray = (userList, res) => {
    let users = userList.map(user => new User(user));

    for (let user of users) {
        let reqNum = Math.floor(Math.random() * res.length) + 1;
        let reqList = uniqueList(reqNum, res).map(id => new Resource(id, Math.floor(Math.random() * 10) + 1));
        user.resRequest(reqList);
    }
    return users;
}

const compareId = (a, b) => {
    if (a === b) 
         return 0;

    return a < b ? -1 : 1;
}

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };