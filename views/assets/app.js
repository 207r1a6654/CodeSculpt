document.addEventListener('DOMContentLoaded', () => {
  const runButton = document.getElementById("run");
  const saveButton = document.getElementById("save");
  const code = document.getElementById("code").contentWindow.document;

  const htmlCodeInput = document.getElementById("html1");
  const cssCodeInput = document.getElementById("css1");
  const jsCodeInput = document.getElementById("js1");

  runButton.addEventListener("click", () => {
    const htmlCode = htmlCodeInput.value;
    const cssCode = cssCodeInput.value;
    const jsCode = jsCodeInput.value;

    localStorage.setItem("htmlCode", htmlCodeInput.value);
    localStorage.setItem("cssCode", cssCodeInput.value);
    localStorage.setItem("jsCode", jsCodeInput.value);

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


saveButton.addEventListener("click", async () => {
  const htmlCode = htmlCodeInput.value;
  const cssCode = cssCodeInput.value;
  const jsCode = jsCodeInput.value;
  const projectTitle = document.getElementById("projectTitle").value; // Get project title input value

  console.log("HTML Code:", htmlCode);
  console.log("CSS Code:", cssCode);
  console.log("JS Code:", jsCode);
  console.log("Project Title:", projectTitle);

  const response = await fetch('/save-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      project_title: projectTitle, // Include project title in the request body
    }),
  });

  const result = await response.json();

  if (result.success) {
    alert('Code saved successfully');
    console.log('Code saved successfully');
    
    const shareLinkButton = document.getElementById("shareLinkButton");
    shareLinkButton.textContent = result.shareableLink; // Set the button text to shareableLink
    shareLinkButton.style.display = 'inline-block'; // Make the button visible
  
    shareLinkButton.addEventListener('click', () => {
      const dummyTextArea = document.createElement('textarea');
      dummyTextArea.value = result.shareableLink;
      document.body.appendChild(dummyTextArea);
      dummyTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(dummyTextArea);
  
      alert('Shareable link copied to clipboard');
    });
  } else {
    alert(`Error occurred during code saving: ${result.message}`);
    console.error(`Error occurred during code saving: ${result.message}`);
  }
  
});
});
