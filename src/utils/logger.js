export const logUserAction = (action) => {

    const timestamp = new Date().toISOString(); 
    const logs = JSON.parse(localStorage.getItem('userLogs')) || [];
    logs.push({ action, timestamp });
    localStorage.setItem('userLogs', JSON.stringify(logs));
}

export const getUserLogs = () => {
    return JSON.parse(localStorage.getItem('userLogs')) || [];
}