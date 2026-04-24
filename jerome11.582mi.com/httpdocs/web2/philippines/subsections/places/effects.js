let options = {
    root: null,
    rootMargin: "0px 0px -200px 0px",
    threshold: .1 
  };
  
  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  };
  
  let observer = new IntersectionObserver(callback, options);
  let targets = document.querySelectorAll("#capy");
  targets.forEach((target) => {
    observer.observe(target);
  });
  