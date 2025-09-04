const crawler = async () => {
    const corsProxy = `https://api.allorigins.win/raw?url=`;
    const targetUrl = 'https://news.ycombinator.com/';
    const response = await fetch(`${corsProxy}${encodeURIComponent(targetUrl)}`);
    const html = await response.text();
    
    console.log("Fetched HTML:", html); 
};

export default crawler;

