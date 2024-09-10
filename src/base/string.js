function formatText(text, placeholders) {
    let formatted = text;
    for (let i = 0; i < placeholders.length; i++) {
        let regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, placeholders[i]);
    }
    return formatted;
};

export { formatText };