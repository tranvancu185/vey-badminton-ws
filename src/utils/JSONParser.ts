const parseJSON = (json: string) => {
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}