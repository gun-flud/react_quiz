
function timeConventer(miliseconds) {
    const seconds = Math.floor(miliseconds % ( 1000 * 60 ) / 1000 );
    const minutes = Math.floor(miliseconds % ( 1000 * 60 * 60 ) / ( 1000 * 60 ) );
    const hours = Math.floor(miliseconds % ( 1000 * 60 * 60 * 24) / (1000 * 60 * 60 ) );
    const days = Math.floor(miliseconds / ( 1000 * 60 * 60 * 24));

    // let milis = miliseconds;
    // let seconds = Math.floor(milis / 1000);
    // milis -= seconds * 1000;
    // let minutes = Math.floor(seconds / 60);
    // seconds -= minutes * 60;
    // let hours = Math.floor(minutes / 60);
    // minutes -= hours * 60;
    // const days = Math.floor(hours / 24);
    // hours -= days * 24;
    
    const time = { days, hours, minutes, seconds };
    
    for (let timeMarker in time) {
        time[timeMarker] = String(time[timeMarker]).padStart(2, '0'); 
    }

        
    return time;
}



export function* timerGenerator(endDate) {
    try{
    while(true) {
        const timeLeftMS = endDate - Date.now();
        const timeLeft = TimeConventer(timeLeftMS);
        
        if (timeLeftMS <= 0) return TimeConventer(0);
        //12378589

        yield timeLeft;
    }
    } catch (err) {
        console.error('TimeGenerator problem', err); 
        return;
    }   
}




// функція генератор
// функція ітератор, яка обробляє
 
//це вже ззовні

// функція яка переводить значення
// функція виводу