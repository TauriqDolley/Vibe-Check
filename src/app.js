const searchButton = document.querySelector("#search__btn");
const queryString = require("query-string");
// <d374fdb169264f3a87e5d068ca70d124:1020f3ad8257423390fe82594464d076>
//GET SPOTIFY ID

//1. RECEIVE INPUT

const textArea = document.querySelector("#search__artist-title");
let artistName = " ";

if (sessionStorage.userAuthorized === undefined) {
	sessionStorage.userAuthorized = "false";
	sessionStorage.verifier = generateRandomString();
}

//Utility functions for encoding verifier/code challenge
function dec2hex(dec) {
	return ("0" + dec.toString(16)).substr(-2);
}

function generateRandomString() {
	var array = new Uint32Array(56 / 2);
	window.crypto.getRandomValues(array);
	return Array.from(array, dec2hex).join("");
}

async function sha256(plain) {
	// returns promise ArrayBuffer
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);
	return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a) {
	// Convert the ArrayBuffer to string using Uint8 array.
	// btoa takes chars from 0-255 and base64 encodes.
	// Then convert the base64 encoded to base64url encoded.
	// (replace + with -, replace / with _, trim trailing =)
	return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

// 1. Create the code verifier and challenge
//1.1 generate a random code verifier

sessionStorage.setItem("clientID", "d374fdb169264f3a87e5d068ca70d124");

//1.2 generate a code challenge
async function generateCodeChallenge(v) {
	const hashed = await sha256(v);
	const base64encoded = base64urlencode(hashed);
	return base64encoded;
}

//2 Construct the authorization URI

const generateAuthURI = async () => {
	let challenge = await generateCodeChallenge(sessionStorage.verifier);

	const authorisationURI =
		"https://accounts.spotify.com/authorize?" +
		queryString.stringify({
			client_id: "d374fdb169264f3a87e5d068ca70d124",
			response_type: "code",
			redirect_uri: "https://friendly-ramanujan-54e75f.netlify.app/",
			code_challenge_method: "S256",
			code_challenge: challenge
		});
	return authorisationURI;
};

window.onload = async function () {
	if (sessionStorage.userAuthorized === "false") {
		const authURI = await generateAuthURI();
		window.location = authURI;
		sessionStorage.userAuthorized = "true";
	} else {
		let params = new URL(document.location).searchParams;
		let code = params.get("code");
		sessionStorage.setItem("code", code);

		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		};

		const requestBody = {
			client_id: "d374fdb169264f3a87e5d068ca70d124",
			grant_type: "authorization_code",
			code: sessionStorage.getItem("code"),
			redirect_uri: "https://friendly-ramanujan-54e75f.netlify.app/",
			code_verifier: sessionStorage.verifier
		};

		axios
			.post(
				"https://accounts.spotify.com/api/token",
				queryString.stringify(requestBody),
				config
			)
			.then((response) => {
				artistName = textArea.value.trim();
				sessionStorage.access_token = response.data.access_token;
			})
			.catch((error) => {
				console.log("Error with GET request");
				console.log(error.response);
				console.log(error);
			});
	}
};

searchButton.addEventListener("click", searchArtists);

function searchArtists() {
	if (textArea.value != " ") {
		artistName = textArea.value;
		axios
			.get(
				"https://api.spotify.com/v1/search?" +
					queryString.stringify({
						q: artistName,
						type: ["artist"].join(),
						limit: 1
					}),
				{
					headers: {
						Authorization: "Bearer " + sessionStorage.access_token,

						Accept: "application/json",
						"Content-Type": "application/application/json"
					}
				},
				queryString.stringify({
					grant_type: "client_credentials"
				})
			)
			.catch((error) => {
				// console.log(accessToken);
				console.log("Error with GET request");
				console.log(error.response);
				//console.log(error.response.data);
				console.log(error.response.data);
			})
			.then((response) => {
				axios
					.get(
						"https://api.spotify.com/v1/artists/" +
							response.data.artists.items[0].id +
							"/related-artists",
						{
							headers: {
								//prettier-ignore
								"Authorization" : "Bearer " +  sessionStorage.access_token,
								Accept: "application/json",
								"Content-Type": "application/application/json"
							}
						},
						queryString.stringify({
							grant_type: "client_credentials"
						})
					)
					.then((response) => {
						console.log("Similar Artist Data");
						console.log(response.data.artists);

						const artistCards = document.querySelectorAll(".card");
						let count = 0;
						artistCards.forEach((card) => {
							const title = card.querySelector("h5");
							const cardText = card.querySelector("p");
							const button = card.querySelector("a");
							card.firstElementChild.src =
								response.data.artists[count].images[0].url;
							title.innerHTML = `<h5 class="card-title">${response.data.artists[count].name}</h5>`;
							cardText.innerHTML = `Genres : ${response.data.artists[
								count
							].genres
								.slice(0, 3)
								.join(", ")}`;
							button.innerHTML = "Listen on Spotify";
							button.href = response.data.artists[count].external_urls.spotify;

							card.classList.add("fade-in");

							count++;
						});
						console.log(document.querySelectorAll(".card a"));
						document.querySelector(".card a").scrollIntoView(top);
						//Attempt to update card one's image to new image
					});
			})
			.catch((error) => {
				// console.log(accessToken);
				console.log("Error with GET request");
				console.log(error.response);
				//console.log(error.response.data);
				console.log(error);
			});
	}
}
