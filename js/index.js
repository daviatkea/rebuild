console.clear();

const elApp = document.querySelector("#app");

const elImages = Array.from(document.querySelectorAll(".gallery-image"));
const elVideos = Array.from(document.querySelectorAll(".gallery-video"));

const elDetail = document.querySelector(".detail");

function flipImages(firstEl, lastEl, change) {
  const firstRect = firstEl.getBoundingClientRect();

  const lastRect = lastEl.getBoundingClientRect();

  // INVERT
  const deltaX = firstRect.left - lastRect.left;
  const deltaY = firstRect.top - lastRect.top;
  const deltaW = firstRect.width / lastRect.width;
  const deltaH = firstRect.height / lastRect.height;

  change();
  lastEl.parentElement.dataset.flipping = true;

  const animation = lastEl.animate(
    [
      {
        transform: `translateX(${deltaX}px) translateY(${deltaY}px) scaleX(${deltaW}) scaleY(${deltaH})`,
      },
      {
        transform: "none",
      },
    ],
    {
      duration: 600, // milliseconds
      easing: "cubic-bezier(0.84, 0, 0.2, 1)",
    }
  );

  animation.onfinish = () => {
    delete lastEl.parentElement.dataset.flipping;
  };
}

handler(elImages, "img");
handler(elVideos, "video");

function handler(elems, type) {
  elems.forEach((el) => {
    el.addEventListener("click", () => {
      const elImage = el.querySelector(type);

      elDetail.innerHTML = "";

      const elClone = el.cloneNode(true);
      elDetail.appendChild(elClone);

      const elCloneImage = elClone.querySelector(type);

      flipImages(elImage, elCloneImage, () => {
        elApp.dataset.state = "detail";
      });

      document.body.classList.add("overflow-hidden");

      if (type === "video") elCloneImage.play();

      function revert() {
        if (type === "video") elCloneImage.pause();
        document.body.classList.remove("overflow-hidden");
        flipImages(elCloneImage, elImage, () => {
          elApp.dataset.state = "gallery";
          elCloneImage.removeEventListener("click", revert);
        });
      }

      elCloneImage.addEventListener("click", revert);
    });
  });
}

// elImages.forEach((figure) => {
//   figure.addEventListener("click", () => {
//     const elImage = figure.querySelector("img");

//     elDetail.innerHTML = "";

//     const elClone = figure.cloneNode(true);
//     elDetail.appendChild(elClone);

//     const elCloneImage = elClone.querySelector("img");

//     flipImages(elImage, elCloneImage, () => {
//       elApp.dataset.state = "detail";
//     });

//     function revert() {
//       flipImages(elCloneImage, elImage, () => {
//         elApp.dataset.state = "gallery";
//         elCloneImage.removeEventListener("click", revert);
//       });
//     }

//     elCloneImage.addEventListener("click", revert);
//   });
// });

// elVideos.forEach((figure) => {
//   figure.addEventListener("click", () => {
//     const elImage = figure.querySelector("video");

//     elDetail.innerHTML = "";

//     const elClone = figure.cloneNode(true);
//     elDetail.appendChild(elClone);

//     const elCloneImage = elClone.querySelector("video");

//     flipImages(elImage, elCloneImage, () => {
//       elApp.dataset.state = "detail";
//     });

//     function revert() {
//       flipImages(elCloneImage, elImage, () => {
//         elApp.dataset.state = "gallery";
//         elCloneImage.removeEventListener("click", revert);
//       });
//     }

//     elCloneImage.addEventListener("click", revert);
//   });
// });
