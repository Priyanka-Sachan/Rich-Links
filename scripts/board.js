const form = document.getElementById('add-pin-form');
const wFavicon = document.getElementById('w_favicon');
const wImage = document.getElementById('w_image');
const wTitle = document.getElementById('w_title');
const wType = document.getElementById('w_type');
const wUrl = document.getElementById('w_url');
const wDesc = document.getElementById('w_desc');
const wNote = document.getElementById('w_note');
const fetchUrl = document.getElementById('fetch_url');
const editArticle = document.getElementById('edit_article');
const previewArticle = document.getElementById('preview_article');

let pinInfo;

async function fetchAsync(url) {
    await fetch(url)
        .then(response => response.text())
        .then(data => {
            //...parse the document and populate
            const result = parseDocument(data, url);
            if (result.message == 'success') {
                pinInfo = result.info;
                populatePinForm();
            } else {
                //...Show a toast message
            }
        });
}

fetchUrl.addEventListener('click', (e) => {
    fetchAsync(wUrl.value);
});

function populatePinForm() {
    if (pinInfo.favicon)
        wFavicon.setAttribute('src', pinInfo.favicon);
    const images = pinInfo.images;
    if (pinInfo.coverImage)
        wImage.setAttribute('src', pinInfo.coverImage);
    else if (images[0])
        wImage.setAttribute('src', images[0]);
    if (pinInfo.title)
        wTitle.value = pinInfo.title;
    if (pinInfo.description)
        wDesc.value = pinInfo.description;
    if (pinInfo.type && [...wType.options].map(o => o.value).includes(pinInfo.type))
        wType.value = pinInfo.type;
    else
        wType.value = 'undefined';
    if (pinInfo.preview)
        editor.txt.html(pinInfo.preview);
}

const E = window.wangEditor;
const editor = new E('#editor');
editor.config.lang = 'en';
editor.i18next = window.i18next;
editor.create();
// Disabled editor by disable API
editArticle.addEventListener('click', () => {
    editor.enable();
});

// Cancel disabled by enable API
previewArticle.addEventListener('click', () => {
    editor.disable();
});

//For later on.....
//editor.txt.html()