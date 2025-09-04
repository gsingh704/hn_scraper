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

        const votesText = subtext.querySelector('.score') ? subtext.querySelector('.score').innerText : '0 points';
        const votes = parseInt(votesText.replace(/\D/g, ''), 10);

        const commentsLink = Array.from(subtext.querySelectorAll('a')).find(a => a.innerText.includes('comment'));
        const commentsText = commentsLink ? commentsLink.innerText : '0 comments';
        const comments = parseInt(commentsText.replace(/\D/g, ''), 10);
        itemsList.push({ title, url, votes, comments });
    });
    return itemsList;
};

export default crawler;