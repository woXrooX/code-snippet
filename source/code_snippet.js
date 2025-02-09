import JavaScript from "./languages/JavaScript.js";
import HTML from "./languages/HTML.js";

export default class code_snippet extends HTMLElement{
	constructor(){
		super();

		this.shadow = this.attachShadow({mode: 'closed'});

		////// RAW data
		this.RAW = this.innerHTML;

		// Remove 1st new line
		this.RAW = this.RAW.substring(1, this.RAW.length);

		// Remove last new lines
		this.RAW = this.RAW.substring(0, this.RAW.length-4);

		// If language is not defined, then set it to "RAW"
		if(!!this.hasAttribute("lang") === false) this.lang = "RAW";

		// If title is not defined, then set it to ''
		if(!!this.hasAttribute("title") === false) this.title = '';

		this.shadow.innerHTML = `
			<style>
				:host(code-snippet){
					display: block;
					max-width: 100%;
				}

				div{
					background-color: hsla(230, 13%, 9%, 1);
					border-radius: 5px;
					box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.5);
					overflow: hidden;

					position: relative;

					& > header{
						background-color: hsla(230, 13%, 15%, 1);

						padding: 5px 10px;

						display: grid;
						grid-template-columns: 1fr 1fr 1fr;
						justify-items: center;
						align-items: center;

						& > span{
							color: white;
							font-size: 0.5rem;
							font-family: Sans;

							&.lang{
								justify-self: flex-start;
							}

							&.title{
								font-size: 0.7rem;
							}
						}

						& > button{
							cursor: pointer;

							background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23FFFFFF'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z'/%3E%3C/svg%3E");

							background-size: contain;
							background-repeat: no-repeat;
							background-color: transparent;

							width: 24px;
							height: 24px;
							border: none;

							justify-self: end;
						}
					}

					& > code{
						display: block;

						color: white;
						font-size: 0.7rem;
						line-height: 0.8rem;
						white-space: pre;

						width: auto;
						height: auto;

						box-sizing: border-box;
						padding: 10px;
						padding-top: 15px;

						overflow-x: scroll;
						scrollbar-width: auto;
						scrollbar-color: hsla(230, 13%, 40%, 0.5) transparent;

						&::-webkit-scrollbar{
							display: unset;
							width: 5px;
							height: 5px;
						}

						&::-webkit-scrollbar-track{
							background-color: transparent;
						}

						&::-webkit-scrollbar-thumb{
							background-color: hsla(230, 13%, 25%, 0.5);
							border-radius: 5px;
						}

						&::-webkit-scrollbar-thumb:hover{
							background-color: hsla(230, 13%, 40%, 0.5);
						}
					}
				}
			</style>
			<div>
				<header>
					<span class="lang">${this.lang}</span>
					<span class="title">${this.title}</span>
					<button></button>
				</header>
				<code></code>
			</div>
		`;

		insert_code: {
			this.code_element = this.shadow.querySelector("div > code");

			switch(this.lang){
				case "JavaScript":
					this.code_element.innerHTML = JavaScript.handle(this.RAW);
					break;

				case "HTML":
					this.code_element.innerHTML = HTML.handle(this.RAW);
					break;

				default:
					this.code_element.innerText = this.RAW;
					console.warn("Code-Snippet: Not supported language!");
			}
		}

		copy: {
			this.copy_button = this.shadow.querySelector("div > header > button");
			this.copy_button.onclick = ()=>{
				navigator.clipboard.writeText(this.code_element.innerText);

				this.copy_button.style = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewBox='0 0 24 24' width='24px' fill='%2300820a'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M5,5h2v3h10V5h2v5h2V5c0-1.1-0.9-2-2-2h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C3.9,3,3,3.9,3,5v14 c0,1.1,0.9,2,2,2h6v-2H5V5z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3z'/%3E%3Cpolygon points='21,11.5 15.51,17 12.5,14 11,15.5 15.51,20 22.5,13'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`;

				setTimeout(()=>{this.copy_button.removeAttribute("style");}, 5000);
			}
		}
	}
};

window.customElements.define('code-snippet', code_snippet);

// Make code_snippet Usable W/O Importing It
window.code_snippet = code_snippet;
