document.addEventListener('DOMContentLoaded', () => {
  const runButton = document.getElementById("run");
  const saveButton = document.getElementById("save");
  const code = document.getElementById("code").contentWindow.document;

  const htmlCodeInput = document.getElementById("html1");
  const cssCodeInput = document.getElementById("css1");
  const jsCodeInput = document.getElementById("js1");

  // Clear local storage when the page loads for guest user
  localStorage.removeItem("htmlCode");
  localStorage.removeItem("cssCode");
  localStorage.removeItem("jsCode");

  // Set the saved code in the textareas
  htmlCodeInput.value = ""; // Always clear the saved code for guest user
  cssCodeInput.value = "";
  jsCodeInput.value = "";

  runButton.addEventListener("click", () => {
    const htmlCode = htmlCodeInput.value;
    const cssCode = cssCodeInput.value;
    const jsCode = jsCodeInput.value;

    // Save code to local storage
    localStorage.setItem("htmlCode", htmlCode);
    localStorage.setItem("cssCode", cssCode);
    localStorage.setItem("jsCode", jsCode);

    code.open();
    code.writeln(htmlCode + "<style>" + cssCode + "</style>" + "<script>" + jsCode + "</script>");
    code.close();
  });

  const codingArea = document.getElementById('coding_area');
  const textAreas = codingArea.querySelectorAll('textarea');
  let isResizing = false;
  let initialX = 0;

  textAreas.forEach(textArea => {
    textArea.addEventListener('mousedown', (event) => {
      isResizing = true;
      initialX = event.clientX;
    });
  });
  
  document.addEventListener('mousemove', (event) => {
    if (!isResizing) return;
  
    const deltaX = event.clientX - initialX;
    const newWidth = codingArea.offsetWidth + deltaX;
  
    if (newWidth > 200) {
      codingArea.style.width = newWidth + 'px';
      initialX = event.clientX;
    }
  });
  
  document.addEventListener('mouseup', () => {
    isResizing = false;
  });

  // Save guest code to server
  saveButton.addEventListener("click", async () => {
    const htmlCode = htmlCodeInput.value;
    const cssCode = cssCodeInput.value;
    const jsCode = jsCodeInput.value;

    const response = await fetch('/from-guest-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('Guest code saved successfully');
    } else {
      console.error('Error occurred during guest code saving:', result.message);
    }
  });

  // Clear local storage on logout
  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("htmlCode");
    localStorage.removeItem("cssCode");
    localStorage.removeItem("jsCode");
  });
});
