// Making the scrolling accurate 
let headerHeight = document.querySelector("header").offsetHeight;

let anchorLinks = document.querySelectorAll(".sidebar a");
for (let link of anchorLinks) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        let targetID = link.getAttribute("href");
        let targetElement = document.querySelector(targetID);
        let distanceViewportToElement = targetElement.getBoundingClientRect().top;
        let distanceTopEdgeToCurrentScroll = window.pageYOffset;
        let targetPosition = (distanceViewportToElement + distanceTopEdgeToCurrentScroll) - headerHeight;
        console.log(targetPosition);
        
        window.scrollTo ({
            top: targetPosition,
            behavior: "smooth"
        });
    })
}