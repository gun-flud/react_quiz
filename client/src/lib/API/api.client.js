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
        const {headers: headersOpt, ...resOptions} = options;

        const response = await fetch(path, {
            ...resOptions,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                ...headersOpt, // all headers 
            },        
        });

        if (!response.ok) {
            throw new Error("Response status:", response.status);
        }

        const result = await response.json();
        return result; 
    } catch (err) {
        console.error('res error:', err.message || err);
    }
}

