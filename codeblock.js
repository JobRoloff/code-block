let template = document.createElement('template');
template.innerHTML = `
<div class="codedisplay">
        <style>
        #copy-icon{
            opacity: 0;
            width: fit-content;
            transition: opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        
        #copy-icon[show] {
            opacity: 1;
        }
        
        .codeblock{
            display: flex;
            flex-direction: column;
            background-color: var(--custom-color);
            padding: 1rem;
            padding-top: 3rem;
            border-radius: .5rem;
        
        }
        
        .codedisplay{
            position: relative;
        }
        
        button{
            border-radius: .5rem;
            background-color: yellow;
            display: block;
        }
        
        .copy-section{
            display: flex;
            flex-direction: column;
            background-color: peachpuff;
            width: fit-content;
            height: fit-content;
            position: absolute;
            right: 1rem;
            top: 1rem;
        }
        </style>

        <div class="copy-section">
            <button class="btn">copy</button>
            <div id="copy-icon">copied!</div>
        </div>
        <pre class="codeblock"><code>
            <slot name="code-slot"></slot>
        </code></pre>
    </div>
`;



class CodeBlock extends HTMLElement {
    constructor() {
        super();
        // let id = crypto.randomUUID().toString();
        // this.setAttribute('id', id);
        let templateInstance = template.content.cloneNode(true);
        const shadow = this.attachShadow({ mode: "open" });
        shadow.prepend(templateInstance)
        // get the button reference: 
        let btnRef = shadow.querySelector(".btn");
        // console.log(btnRef)
        btnRef.addEventListener('click', (e) => {
            copyCodeBlock(this);
            toggleCopiedIcon(this);

            // toggle UI state off after 3 seconds
            setTimeout(() => {
                toggleCopiedIcon(this)
            }, 3000)
        })
    }
}
/**
 * 
 * @param {String} i text to indicate the code block have been copied
 */
function toggleCopiedIcon(i) {
    // reference UI
    icn = i.shadowRoot.querySelector('#copy-icon');
    // toggle UI state 
    icn.toggleAttribute('show')
}
/**
 * 
 * @param {Object} i takes the inputted web component and copies the code block to the clipboard
 */
function copyCodeBlock(i) {
    // copy the code block's text
    const copyText = i.querySelector('div').innerText; // is is ok to use const here?
    // copy to clipboard
    navigator.clipboard.writeText(copyText);
}



customElements.define('code-block', CodeBlock)



