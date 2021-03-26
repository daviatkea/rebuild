console.clear();

const app = document.querySelector("#app");

const tasks = Array.from(document.querySelectorAll("[class^='gallery-']"));
// const elVideos = Array.from(document.querySelectorAll(".gallery-video"));

const detail = document.querySelector(".detail");

function flipTasks(firstEl, lastEl, change) {
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

// handler(elImages, "img");
// handler(elVideos, "video");

// function handler(elems, type) {
tasks.forEach((el) => {
  el.addEventListener("click", () => {
    const taskRef = el.querySelector(":scope > :first-child");

    detail.innerHTML = "";

    const taskClone = el.cloneNode(true);
    detail.appendChild(taskClone);

    const taskRefClone = taskClone.querySelector(":scope > :first-child");

    flipTasks(taskRef, taskRefClone, () => {
      app.dataset.state = "detail";
    });

    const copyEl = taskClone.querySelector("[data-copy]");

    function githubBtn() {
      if (!copyEl) return;

      copyEl.addEventListener("click", copyText, { once: true });

      function copyText(e) {
        const el = e.target;
        el.dataset.copied = "copied";
        navigator.clipboard.writeText(el.dataset.copy);

        el.addEventListener("animationend", () => {
          delete el.dataset.copied;
        });
      }
    }
    githubBtn();

    document.body.classList.add("overflow-hidden");

    // if (type === "video") elCloneImage.play();
    if (taskRefClone.nodeName == "VIDEO") taskRefClone.play();

    function revert() {
      // if (type === "video") elCloneImage.pause();
      if (taskRefClone.nodeName == "VIDEO") taskRefClone.pause();
      document.body.classList.remove("overflow-hidden");
      // copyEl.removeEventListener("click", copyText);
      flipTasks(taskRefClone, taskRef, () => {
        app.dataset.state = "gallery";
        taskRefClone.removeEventListener("click", revert);
      });
    }

    taskRefClone.addEventListener("click", revert);
  });
});
// }

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
