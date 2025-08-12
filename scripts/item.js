// Get user from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const activeUser = getQueryParam('user');
//main function to add items to the page
function additem(user, name, amount, bio, imgUrl) {
     // Only show items for the active user
    if (user !== activeUser) return;

    var img = document.createElement("img");
    img.classList.add("item-img");
    img.src = (imgUrl && imgUrl.trim() !== "") ? imgUrl : "assets/images/other/placeholder.jpeg";

    var h2 = document.createElement("h2");
    h2.classList.add("item-name");
    h2.innerText = name;

    var biotext = document.createElement("p");
    biotext.classList.add("item-bio");
    biotext.innerText = bio;

    var price = document.createElement("p");
    price.classList.add("item-price");

    let item;
    if (amount === "unk") {
        price.innerText = "Price: Unknown";
        item = document.getElementById("item-unk");
    } else {
        price.innerText = "Price: $" + Number(amount).toFixed(2);
        if (amount < 24.99) item = document.getElementById("item-0-25");
        else if (amount < 49.99) item = document.getElementById("item-25-50");
        else if (amount < 74.99) item = document.getElementById("item-50-75");
        else if (amount < 99.99) item = document.getElementById("item-75-100");
        else if (amount < 499.99) item = document.getElementById("item-100-500");
        else if (amount >= 500) item = document.getElementById("item-500");
        else item = null;
    }

    if (item) {
        var table = item.querySelector("table");
        if (table) {
            // Find the last row, or create a new one if needed
            let lastRow = table.rows[table.rows.length - 1];
            if (!lastRow || lastRow.cells.length >= 3) {
                lastRow = table.insertRow();
            }
            var td = document.createElement("td");

           var detailsLink = document.createElement("a");
// Set the href to the item details page with the name as a query parameter
detailsLink.href = `item.html?user=${encodeURIComponent(activeUser)}&name=${encodeURIComponent(name)}`;
detailsLink.className = "item-details-link";
detailsLink.style.display = "block";
detailsLink.style.height = "100%";
detailsLink.style.width = "100%";
detailsLink.style.textDecoration = "none";
detailsLink.style.color = "inherit";

            detailsLink.appendChild(img);
            detailsLink.appendChild(h2);
            detailsLink.appendChild(biotext);
            detailsLink.appendChild(price);

            td.appendChild(detailsLink);
            lastRow.appendChild(td);
        }
    }
}

function fillEmptyCells(table) {
    let lastRow = table.rows[table.rows.length - 1];
    if (lastRow && lastRow.cells.length < 3) {
        while (lastRow.cells.length < 3) {
            let emptycell = lastRow.insertCell();
            emptycell.style.backgroundColor = "rgb(20,20,20)"; // Set background to white
        }
    }
}

function cellHasContent(td) {
    // Checks for any child elements or non-empty text
    return td.children.length > 0 || (td.textContent && td.textContent.trim() !== "");
}

["item-0-25", "item-25-50", "item-50-75", "item-75-100", "item-100-500", "item-500", "item-unk"].forEach(id => {
    var item = document.getElementById(id);
    if (item) {
        var table = item.querySelector("table");
        if (table && table.rows.length > 0) {
            fillEmptyCells(table);
        }
    }
}   );