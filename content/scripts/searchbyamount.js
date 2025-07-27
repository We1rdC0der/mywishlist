document.addEventListener("DOMContentLoaded", function () {
  const amountButtons = document.querySelectorAll("#searchbyamountdiv button");
  const items = document.querySelectorAll("#itemlist .item");

  let activeButton = null;

  amountButtons.forEach(button => {
    button.addEventListener("click", () => {
      const label = button.textContent.trim();

      // If this button is already active, toggle off (reset)
      if (activeButton === button) {
        // Reset styles
        amountButtons.forEach(btn => {
          btn.style.backgroundColor = "rgb(221, 221, 221)";
          btn.style.color = "black";
          btn.style.border = "none";
        });
        // Show all items
        items.forEach(item => {
          item.style.display = "block";
        });

        activeButton = null; // no active filter anymore
        return;
      }

      // Otherwise, set this button as active and filter
      activeButton = button;

      // Reset styles first
      amountButtons.forEach(btn => {
          btn.style.backgroundColor = "rgb(221, 221, 221)";
          btn.style.color = "black";
        btn.style.border = "none";
      });

      // Style this active one
      button.style.backgroundColor = "#ffe83e";
      button.style.color = "black";
      button.style.border = "1px solid black";

      let min = 0, max = Infinity;
      if (label === "$0 - $25") {
        min = 0; max = 25;
      } else if (label === "$25 - $50") {
        min = 25; max = 50;
      }else if (label === "$50 - $75") {
        min = 50; max = 75;
      } else if (label === "$75 - $100") {
        min = 75; max = 100;
      } else if (label === "$100 - $500") {
        min = 100; max = 500;
      }else if (label === "$500+") {
        min = 500; max = Infinity; // No upper limit for $500+
      }else if (label === "Unknown Amount") {
        min = null; max = null;
      }

      // Filter items
      items.forEach(item => {
        const priceAttr = item.getAttribute("data-price");
        let price = parseFloat(priceAttr);
        if (isNaN(price)) price = null;

        let show = false;
        if (min === null && price === null) {
          show = true;
        } else if (price !== null && price >= min && price <= max) {
          show = true;
        }else if (price !== null && price >= min && price <= max) {
          show = true;
      }

        item.style.display = show ? "block" : "none";
      });
    });
  });
});
