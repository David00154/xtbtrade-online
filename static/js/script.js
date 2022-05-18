// register service workers

if ("serviceWorker" in navigator) {
	// window.addEventListener("load", () => {
	navigator.serviceWorker
		.register("/service-worker.js")
		.then((req) => {
			if (!req.active) {
				console.log("Service Worker: Registering...");
			}
		})
		.catch((err) => console.error(`Service Worker ${err}`));
	// });
}



		const menuBtn = document.getElementById("menu-btn");
		const itemsToToggle = document.getElementById(
			"menu-items-to-toggle"
		);

		menuBtn.onclick = () => {
			itemsToToggle.classList.toggle("active");
		};


		const signUpCheckbox = document.getElementById("signup-check-box")
		const authBtn = document.getElementById("auth-menu-btn")

		if (signUpCheckbox) {
			signUpCheckbox.onclick = () => toggleAuthBtnState()
		}



		const toggleAuthBtnState = () => {
			if (authBtn.disabled) {
				authBtn.disabled = false
			} else {
				authBtn.disabled = true
			}
			if (signUpCheckbox.ariaChecked == "false") {
				signUpCheckbox.ariaChecked = "true"
				signUpCheckbox.innerHTML = `<svg height="7" viewBox="0 0 10 7" width="10" type="multiple" class="signup-check-box-svg"><path d="M2.05 3.062L.933 4.176l2.629 2.627a.789.789 0 001.115 0L9.934 1.55 8.82.434 4.12 5.131z"></path></svg>`
			} else {
				signUpCheckbox.ariaChecked = "false"
				signUpCheckbox.innerHTML = ""
			}
			signUpCheckbox.classList.toggle("signup-check-box-checked")
		}


// const sideBarItem = document.getElementById("sidebar-item")

// console.log(sideBarItem)