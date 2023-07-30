const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// An event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
    return;
    }

    // Show prompt
    promptEvent.prompt();
    
    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    textHeader.textContent = 'Successfully installed!';
    console.log('Install done 👍', 'appinstalled', event);
    // Clear prompt
    window.deferredPrompt = null;
});
