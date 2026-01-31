console.log("This is a popup!");

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.ail',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
        return '';
    }
}

function findComposeToolBar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
        return null;
    }
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function getTheToneSelector() {
    //Dropdown for tone
    const toneSelect = document.createElement("Select");
    toneSelect.className = "tone-dropdown";
    toneSelect.style.marginRight = '8px';
    ["Professional", "Friendly", "Concise", "Apologetic"].forEach(tone => {
        const option = document.createElement("option");
        option.value = tone.toLowerCase();
        option.innerText = tone;
        toneSelect.appendChild(option);
    });
    return toneSelect;
}

function getWrapperClass() {
    // Wrapper for grouping
    const wrapper = document.createElement("div");
    wrapper.className = "ai-reply-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "6px";
    return wrapper;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    const existingWrapper = document.querySelector('.ai-reply-wrapper');
    if (existingWrapper) {
        existingWrapper.remove();
    }
    if (existingButton) {
        console.log("Toolbar has Been Found");
        existingButton.remove();
    }
    const toolbar = findComposeToolBar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }
    console.log("Create an Ai Button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    console.log("Create the tone Dropdown.");
    const toneSelect = getTheToneSelector();
    toneSelect.classList.add('tone-dropdown');

    const wrapper = getWrapperClass();

    button.addEventListener('click', async () => {
        //This is used for API call
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;
            const emailContent = getEmailContent();
            const tone = toneSelect.value;
            const response = await fetch('http://localhost:8080/api/email/generator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: toneSelect.value
                })
            });
            if (!response.ok) {
                throw new Error('API Request Failed.');
            }
            const generatedReply = await response.text();
            console.log("Generated Reply:", generatedReply);
            const composedBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composedBox) {
                composedBox.focus();
                composedBox.innerHTML = "";
                document.execCommand('insertText', false, generatedReply);//This is basically a method which do actions without manupulating the actual DOM
                //False is basically used for UI prompt for modern browsers we avoid it.
            }
            else {
                console.error('Compose Box Not Found!');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to Generate a Reply');
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    //Both of them inserted intro wrapper
    wrapper.appendChild(button);
    wrapper.appendChild(toneSelect);

    //Inserting the wrapper intro toolbar
    toolbar.insertBefore(wrapper, toolbar.firstChild);

}

const observer = new MutationObserver((mutations) => {
    //This is used to Observe all the changes over browser
    for (const mutation of mutations) {
        const addNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]') !== null)// This lookes for the element nodes only
        );

        if (hasComposeElements) {
            console.log("Compose window detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
})