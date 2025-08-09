window.addEventListener("DOMContentLoaded", function () {
    if (window.WISHLIST_ITEMS && Array.isArray(window.WISHLIST_ITEMS)) {
        window.WISHLIST_ITEMS.forEach(item => {
            additem(item.name, item.amount, item.bio, item.imgUrl);
        });
        // After all items are added, fill empty cells for each table
        ["item-0-25", "item-25-50", "item-50-75", "item-75-100", "item-100-500", "item-500", "item-unk"].forEach(id => {
            var itemDiv = document.getElementById(id);
            if (itemDiv) {
                var table = itemDiv.querySelector("table");
                if (table && table.rows.length > 0) fillEmptyCells(table);
            }
        });
    }
});