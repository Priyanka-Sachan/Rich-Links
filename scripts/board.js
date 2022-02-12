const openNavbar = document.getElementById('open_navbar');
const closeNavbar = document.getElementById('close_navbar');
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
editor.config.height = 1000;

editor.config.fontNames = [
    'Arial',
    'Tahoma',
    'Verdana',
    'Times New Roman',
    'Courier New',
];
editor.config.excludeMenus = [
    'redo',
    'undo'
]
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

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("navbar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("navbar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

openNavbar.addEventListener(('click'), (e) => {
    openNav();
    openNavbar.style.display = 'none';
});
closeNavbar.addEventListener(('click'), (e) => {
    closeNav();
    openNavbar.style.display = 'inline';
});