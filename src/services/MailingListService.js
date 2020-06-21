// {
//     email_address: "123@abc.com",
//     status: "subscribed"
// }

export const addToMailingList = (data) => {
    return fetch('https://api.readbitwise.com/mailing-list/add', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(err => {
        console.log(err);
    });
};
