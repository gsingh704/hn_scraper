export const filterWordCount = (data, count, type = 'more') => {
    return data.filter(item => {
        const wordCount = item.title.split(' ').filter(word => /\w+/.test(word)).length;
        return type === 'more' ? wordCount > count : wordCount < count;
    });
}
export const sortData = (data, key, order = 'asc') => {
    return data.sort((a, b) => {
        return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
    });
};

