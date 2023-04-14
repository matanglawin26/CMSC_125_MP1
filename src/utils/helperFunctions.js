import User  from '../classes/User';
import Resource  from '../classes/Resource';

export const uniqueList = (n, inList = null) => {  
    let l = [];
    
    if (inList === null) {
        let count = 0;
        while (count < n) {
            let rndNum = Math.floor(Math.random() * 10) + 1;
            if (!l.includes(rndNum)) {
                l.push(rndNum);
                count += 1;
            }
        }
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

    // if(userList.length > 0 ){
    //     users[0].resRequest([new Resource(5, 5), new Resource(8, 10), new Resource(30, 15)]);
    //     users[1].resRequest([new Resource(5, 5), new Resource(7, 6), new Resource(8, 7)]);
    //     users[2].resRequest([new Resource(5, 8), new Resource(30, 5), new Resource(25, 4)]);
    //     users[3].resRequest([new Resource(25, 10)]);  
    // }
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