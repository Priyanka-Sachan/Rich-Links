sanitiseSource = (str, domain) => {
    if (str != null) {
        if (str.slice(0, 4) != 'http')
            str = 'https://' + domain + (str[0] == '/' ? '' : '/') + str;
        if (str.includes('?'))
            str = str.slice(0, str.indexOf('?'));
    }
    return str;
}

const parseDocument = (data, url) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const errorNode = doc.querySelector('parsererror');
    let result;
    if (errorNode) {
        result = { 'message': 'fail' };
    } else {
        let domain = (new URL(url));
        domain = domain.hostname;
        const coverImage = (doc.querySelector('meta[property~="og:image"]') && sanitiseSource(doc.querySelector('meta[property~="og:image"]').content, domain)) ||
            (doc.querySelector('meta[property~="twitter:image"]') && sanitiseSource(doc.querySelector('meta[property~="twitter:image"]').content, domain));
        let images = [];
        doc.querySelectorAll('img').forEach((i) => {
            if (i.getAttribute('src') != null)
                images.push(sanitiseSource(i.getAttribute('src'), domain));
        });
        const favicon = (doc.querySelector('link[rel~="icon"]') && sanitiseSource(doc.querySelector('link[rel~="icon"]').getAttribute('href'), domain)) || ('http://www.google.com/s2/favicons?domain=' + domain);
        const title = (doc.querySelector('title') && doc.querySelector('title').innerText) ||
            (doc.querySelector('meta[property~="og:title"]') && doc.querySelector('meta[property~="og:title"]').content) ||
            (doc.querySelector('meta[property~="twitter:title"]') && doc.querySelector('meta[property~="twitter:title"]').content);
        const description = (doc.querySelector('meta[property~="og:description"]') && doc.querySelector('meta[property~="og:description"]').content) ||
            (doc.querySelector('meta[property~="twitter:description"]') && doc.querySelector('meta[property~="twitter:description"]').content);
        const type = (doc.querySelector('meta[property~="og:type"]') && doc.querySelector('meta[property~="og:type"]').content) ||
            (doc.querySelector('meta[property~="twitter:card"]') && doc.querySelector('meta[property~="twitter:card"]').content) ||
            'undefined';
        result = {
            'message': 'success',
            'info': {
                url,
                domain,
                coverImage,
                images,
                favicon,
                title,
                description,
                type
            }
        };
    }
    return result;
}