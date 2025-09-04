async function crawler() {
    const corsProxy = `https://api.allorigins.win/raw?url=`;
    const targetUrl = 'https://news.ycombinator.com/';
    const response = await fetch(`${corsProxy}${encodeURIComponent(targetUrl)}`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const items = doc.querySelectorAll('.athing');

    const itemsList = [];
    items.forEach(item => {
        const title = item.querySelector('.titleline a').innerText;
        const url = item.querySelector('.titleline a').href;
        const subtext = item.nextElementSibling.querySelector('.subtext');
        const votes = subtext.querySelector('.score') ? subtext.querySelector('.score').innerText : '0';

        const commentsLink = Array.from(subtext.querySelectorAll('a')).find(link => link.innerText.includes('comment'));
        const comments = commentsLink ? commentsLink.innerText : '0';

        itemsList.push({ title, url, votes, comments });
    });
    return itemsList;
};

export default crawler;