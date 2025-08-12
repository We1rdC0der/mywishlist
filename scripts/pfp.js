//profile menu
const prdiv = document.getElementById("accountdiv");
const prcont = document.getElementById("pfcontent");
const users = window.PERSONS;

//make profile buttons
users.forEach(user => {
    const td = document.createElement("td");
    td.id = "pftd";

    const button = document.createElement("button");
    button.id = "pfbutton";

    const pfpimg = document.createElement("img");
    pfpimg.id = "pfpImg";

    const pfusername = document.createElement("p");
    pfusername.id = "pfuser";

    button.appendChild(pfpimg);
    button.appendChild(pfusername);
    td.appendChild(button);

    pfpimg.src = user.pfp;
    pfpimg.alt = user.username + " profile picture";
    pfusername.textContent = user.username;
    button.onclick = function() {
        window.location.href = 'index.html?user=' + encodeURIComponent(user.username);
    };
    prcont.appendChild(td);
});

//open profile menu
function accountdivactive() {
    if (prdiv.style.display === "block") {
        prdiv.style.display = "none";
    } else {
        prdiv.style.display = "block";
    }
}
function acountdivactive() {
    if (prdiv.style.display === "block") {
        prdiv.style.display = "none";
    } else {
        prdiv.style.display = "block";
    }
}
//profile picture and menu logic
document.addEventListener("DOMContentLoaded", function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    const username = getQueryParam('user');
    const userObj = window.PERSONS.find(u => u.username === username);

    // Set profile picture
    const pfpImg = document.getElementById("accountpfp");
    if (pfpImg) {
        if (userObj) {
            pfpImg.src = userObj.pfp;
            pfpImg.alt = userObj.username + " profile picture";
            pfpImg.style.display = "block";
        } else {
            pfpImg.style.display = "none";
        }
    }

    // Open profile menu only if no user is selected
    if (window.location.pathname.endsWith("index.html") && !username) {
        prdiv.style.display = "block";
    } else {
        prdiv.style.display = "none";
    }
});
// make the pf buttons look better when not hovered
const pfbuttons = document.querySelectorAll("#pfbutton"); // or use ".pfbutton" if you switch to class

pfbuttons.forEach(btn => {
    btn.style.width = "200px";
    btn.style.height = "200px";
    btn.style.overflow = "hidden";

    // Make the button a vertical flex container with centered items
    btn.style.display = "flex";
    btn.style.flexDirection = "column";
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";
    btn.style.gap = "10px"; // space between img and text
    btn.style.padding = "10px";
    btn.style.boxSizing = "border-box";

    // Style the image inside the button
    const img = btn.querySelector("img");
    if (img) {
        img.style.width = "80%";
        img.style.height = "80%"; 
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        img.style.display = "block";
        // no need for margin, flexbox centers it
    }

    // Style the text inside the button (assuming direct text nodes or a span)
    // If text is directly inside button (text node), we wrap it in a span for styling
    if (!btn.querySelector("span")) {
        const textNodes = Array.from(btn.childNodes).filter(node => node.nodeType === 3 && node.textContent.trim().length > 0);
        textNodes.forEach(node => {
            const span = document.createElement("span");
            span.textContent = node.textContent.trim();
            btn.replaceChild(span, node);

            // style span text
            span.style.fontSize = "24px";
            span.style.color = "#333";
            span.style.fontWeight = "bold";
        });
    } else {
        const span = btn.querySelector("span");
        span.style.fontSize = "24px";
        span.style.color = "#333";
        span.style.fontWeight = "bold";
    }
});

