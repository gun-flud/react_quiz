// export default async function apiClient () {
//     try {
//         const response = await fetch('/api/home');

//         if(!response.ok) {
//             throw new Error("Response status:", response.status);
//         }

//         const result = await response.json();
//         console.log(result, response.status);
//     } catch (err) {
//         console.error("res error:", err);
//     } finally {
//         console.log('server is connected');
//     }

// }

// string path 
export default async function apiClient (path, options={}) {
    try {
        const response = await fetch(path, {
            ...options,
            headers: {

                ...options.headers, // all headers 
            },        
        });

        if (!response.ok) {
            throw new Error("Response status:", response.status);
        }

        const result = await response.json();
    } catch (err) {
        console.error('res error:', err);
    }
}


// export default async function apiClient () {
// const response = await fetch("/api/use");

// if (response.ok) {
//     let json = await response.json();
//     console.log(json);
// } else {
//     console.log("res error", response.status);
// }
// }


// export default async function apiClient () {
//     try {
//         const response = await fetch('/api/use');
        
//         if (!response.ok) {
//             throw new Error('Responce status:', response.status);
//         }

//         const result = await response.json();
//         console.log(result); 

//     } catch (error) {
//         console.log(error);
//     } finally {
//         console.log('API connected', result);
//     }


//     // try {

//     //     const response = await fetch('api/use', {
//     //         method: 'POST',
//     //         // body: {

//     //         // }
//     //         body: JSON.stringify({
//     //             title: 'foo',
//     //             body: 'lskjf',
//     //             userId: 1,
//     //         }),
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         }
//     //     })
        
//     //     if (!response.ok) {
//     //         throw new Error(response.status);
//     //     }

//     //     const result = response.json();

//     // } catch (err) {
//     //     console.log(err)
//     // }
// }

// const promise = new Promise((resolve, reject) => {
//     const success = Math.random() > 0.5;
//     if (success) {
//         resolve('succes');
//     } else {
//         reject('failed');
//     }
// })

// promise.then(response => console.log(response));

// try {
//     const response = await promise;
//     console.log(response);
// } catch (err) {
//     console.log(err);
// }