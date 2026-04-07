// Load the jsPDF library dynamically
function loadJSPDF(callback) {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js";
  script.onload = callback;
  document.head.appendChild(script);
}

// Main function to initiate the notice center
export function morajNoticeCenter(cp_id, app_id, org_id, org_key, org_secret) {
  createCenterNotice(cp_id, app_id, org_id, org_key, org_secret);
}

// Function to create the notice center
function createCenterNotice(cp_id, app_id, org_id, org_key, org_secret) {
  // Save org_id in local storage
  localStorage.setItem("org_id", org_id);

  // Fetch data from the API
  fetch(`https://ngp.adnan-qasim.me/get-notice-info`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "cp-id": cp_id,
      "app-id": app_id,
      "org-id": org_id,
      "org-key": org_key,
      "org-secret": org_secret,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched data:", data); // Log the fetched data to the console

      const noticeInfo = data.notice_info;

      // Check if UUID exists in local storage
      let uuid = localStorage.getItem("user_uuid");

      if (!uuid) {
        // Generate UUID
        uuid = generateUUID();
        // Store UUID in local storage
        localStorage.setItem("user_uuid", uuid);
      }

      // Create overlay for the notice center
      const overlay = document.createElement("div");
      overlay.className = "moraj-overlay";

      // Create notice container
      const noticeContainer = document.createElement("div");
      noticeContainer.className = "moraj-notice-center center-position";
      noticeContainer.style.backgroundColor =
        noticeInfo.colors?.back_ground || "#ffffff"; // Set the background color

      // Create notice header
      const noticeHeader = document.createElement("div");
      noticeHeader.className = "moraj-notice-header";

      // Create and add the logo image
      const logo = document.createElement("img");
      logo.src = noticeInfo.urls.header_logo;
      logo.alt = "Logo";

      // Create and add the title
      const title = document.createElement("h2");
      title.innerText =
        noticeInfo.english?.meta_data?.header || "Default Header";

      // Create speaker button with SVG icon
      const speakerButton = document.createElement("button");
      speakerButton.className = "speaker-button-left";
      speakerButton.innerHTML = `<img id="speaker-icon" src="${
        "https://cdn-icons-png.flaticon.com/512/9289/9289709.png" ||
        "https://via.placeholder.com/30"
      }" alt="Speaker Icon"/>`;

      // Define the audio to be played
      let audio = new Audio(
        noticeInfo.english?.meta_data?.mp3Link ||
          "https://via.placeholder.com/audio.mp3"
      );

      // Add event listener to the speaker button
      speakerButton.addEventListener("click", () => {
        if (speakerButton.classList.contains("active")) {
          speakerButton.innerHTML = `<img id="speaker-icon" src="${
            "https://cdn-icons-png.flaticon.com/512/9289/9289709.png" ||
            "https://via.placeholder.com/30"
          }" width="40" height="30" alt="Speaker Icon"/>`;
          // Pause the audio if it's active
          audio.pause();
          audio.currentTime = 0; // Optional: Reset the audio to start from the beginning
        } else {
          speakerButton.innerHTML = `<img id="pause-icon" src="${
            "https://cdn-icons-png.freepik.com/512/6326/6326330.png" ||
            "https://via.placeholder.com/30"
          }" width="45" height="30" alt="Pause Icon"/>`;
          // Start playing the audio
          audio.play();
        }
        speakerButton.classList.toggle("active");
      });
      // Create a container div to hold both the image and the dropdown
      const accessibilityContainer = document.createElement("div");
      accessibilityContainer.className = "accessibility-container";
      accessibilityContainer.style.display = "flex"; // Flexbox for horizontal layout
      accessibilityContainer.style.alignItems = "center"; // Align items vertically in center

      // Create the image element
      const imgElement = document.createElement("img");
      imgElement.src =
        "https://developer.apple.com/assets/elements/icons/accessibility/accessibility-128x128_2x.png";
      imgElement.alt = "Accessibility Icon";
      imgElement.style.width = "30px"; // Adjust width as per requirement
      imgElement.style.height = "30px"; // Adjust height as per requirement
      imgElement.style.cursor = "pointer"; // Make it clickable

      // Create accessibility options dropdown (hidden initially)
      const accessibilityDropdown = document.createElement("select");
      accessibilityDropdown.className = "accessibility-dropdown";
      accessibilityDropdown.style.display = "none"; // Hide the dropdown initially

      // Add a default disabled option for "Accessibility Options"
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.innerText = "Accessibility";
      defaultOption.disabled = true;
      defaultOption.selected = true; // Make it selected by default
      accessibilityDropdown.appendChild(defaultOption);

      // Add accessibility options to the dropdown
      const accessibilityOptions = [
        { label: "Gray Scale", value: "grayscale" },
        { label: "High Contrast", value: "high-contrast" },
        { label: "Low Contrast", value: "low-contrast" },
        { label: "Light Background", value: "light-background" },
        { label: "Reset", value: "reset" },
      ];

      accessibilityOptions.forEach((optionData) => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.innerText = optionData.label;
        accessibilityDropdown.appendChild(option);
      });

      // Function to apply selected accessibility mode
      function applyAccessibilityEffect(option) {
        const container = document.querySelector(".moraj-notice-center");

        // Reset previous accessibility settings
        container.classList.remove(
          "grayscale-mode",
          "high-contrast-mode",
          "low-contrast-mode",
          "light-background-mode"
        );

        // Apply selected option
        switch (option) {
          case "grayscale":
            container.classList.add("grayscale-mode");
            break;
          case "high-contrast":
            container.classList.add("high-contrast-mode");
            break;
          case "low-contrast":
            container.classList.add("low-contrast-mode");
            break;
          case "light-background":
            container.classList.add("light-background-mode");
            break;
          case "reset":
            // Reset will remove all accessibility styles and show the image again
            accessibilityDropdown.style.display = "none"; // Hide the dropdown
            imgElement.style.display = "block"; // Show the image again
            break;
        }
      }

      // Add event listener to the image to show the dropdown when clicked
      imgElement.addEventListener("click", () => {
        imgElement.style.display = "none"; // Hide the image
        accessibilityDropdown.style.display = "block"; // Show the dropdown
        accessibilityDropdown.selectedIndex = 0; // Reset the dropdown to "Accessibility" option
      });

      // Add event listener to the dropdown for selecting accessibility options
      accessibilityDropdown.addEventListener("change", (event) => {
        applyAccessibilityEffect(event.target.value);
      });

      // Append the image and dropdown to the container
      accessibilityContainer.appendChild(imgElement);
      accessibilityContainer.appendChild(accessibilityDropdown);

      // Create close button
      const closeButton = document.createElement("button");
      closeButton.className = "close-button";
      closeButton.innerHTML = "&times;";
      closeButton.style.fontSize = "30px"; // Increase icon size
      closeButton.style.lineHeight = "30px"; // Adjust the line height if necessary
      closeButton.style.cursor = "pointer"; // Add pointer cursor for better UX
      closeButton.addEventListener("click", () => {
        document.body.removeChild(overlay);
        const fixedBottomDiv = document.querySelector(".fixed-bottom-div");
        if (fixedBottomDiv) {
          fixedBottomDiv.remove();
        }
      });

      noticeHeader.appendChild(logo); // Append the logo to the noticeHeader
      noticeHeader.appendChild(title); // Append the title to the noticeHeader
      noticeHeader.appendChild(speakerButton); // Append the speaker button to the noticeHeader
      noticeHeader.appendChild(accessibilityContainer); // Append the accessibility dropdown between speaker and close button
      noticeHeader.appendChild(closeButton); // Append the close button to the noticeHeader

      // Create content container
      const contentContainer = document.createElement("div");
      contentContainer.className = "moraj-content-container";

      const noticeMainBody = document.createElement("div");
      noticeMainBody.className = "moraj-notice-main-body";

      // Create first instance of noticeBody
      const noticeBody = document.createElement("div");
      noticeBody.className = "moraj-notice-body-left-head";

      // Add a text element
      const bodyText = document.createElement("span");
      bodyText.innerText =
        noticeInfo.english?.meta_data?.title || "Default Title";

      // Create the language dropdown
      const languageDropdown = document.createElement("select");
      languageDropdown.className = "language-dropdown";

      // Add language options to the dropdown
      const languages = [
        { label: "English", value: "english" },
        { label: "हिंदी", value: "hindi" },
        { label: "தமிழ்", value: "tamil" },
        { label: "తెలుగు", value: "telugu" },
        { label: "ગુજરાતી", value: "gujarati" },
        { label: "অসমীয়া", value: "assamese" },
        { label: "বাংলা", value: "bengali" },
        { label: "बोडो", value: "bodo" },
        { label: "ڈوگری", value: "dogri" },
        { label: "کٲشُر", value: "kashmiri" },
        { label: "ಕನ್ನಡ", value: "kannada" },
        { label: "कोंकणी", value: "konkani" },
        { label: "मैथिली", value: "maithili" },
        { label: "മലയാളം", value: "malayalam" },
        { label: "ꯃꯅꯤꯄꯨꯔꯤ", value: "manipuri" },
        { label: "मराठी", value: "marathi" },
        { label: "سنڌي", value: "sindhi" },
        { label: "اردو", value: "urdu" },
        { label: "नेपाली", value: "nepali" },
        { label: "संस्कृत", value: "sanskrit" },
        { label: "ਪੰਜਾਬੀ", value: "punjabi" },
        { label: "ᱥᱟᱱᱛᱟᱲᱤ", value: "santali" },
        { label: "ଓଡ଼ିଆ", value: "oriya" },
      ];

      languages.forEach((language) => {
        const option = document.createElement("option");
        option.value = language.value.toLowerCase();
        option.innerText = language.label;
        languageDropdown.appendChild(option);
      });

      noticeBody.appendChild(bodyText); // Append body text to noticeBody
      noticeBody.appendChild(languageDropdown); // Append language dropdown to noticeBody

      const noticeBodyDesc = document.createElement("div");
      noticeBodyDesc.className = "moraj-notice-body-left-desc";
      noticeBodyDesc.innerText =
        noticeInfo.english?.meta_data?.description ||
        "Default description text...";

      // Create second instance of noticeBody with "Select All" functionality
      const noticeBody2 = document.createElement("div");
      noticeBody2.className = "moraj-notice-body-left-head";

      // Add a text element
      const bodyText2 = document.createElement("span");
      bodyText2.innerText =
        noticeInfo.english?.meta_data?.manage_consent_title ||
        "Manage Consent Preferences";

      // Add a "Select All" checkbox
      const selectAllContainer = document.createElement("div");
      selectAllContainer.className = "select-all-container";

      const selectAllCheckbox = document.createElement("input");
      selectAllCheckbox.type = "checkbox";
      selectAllCheckbox.id = "select-all";
      selectAllCheckbox.className = "select-all-checkbox";
      selectAllCheckbox.style.accentColor =
        noticeInfo.colors?.check_mark || "#000000";

      const selectAllLabel = document.createElement("label");
      selectAllLabel.htmlFor = "select-all";
      selectAllLabel.innerText =
        noticeInfo.english?.button?.selectAll || "Select All";
      selectAllLabel.className = "select-all-label";

      selectAllContainer.appendChild(selectAllLabel); // Append the select all label to the select all container
      selectAllContainer.appendChild(selectAllCheckbox); // Append the select all checkbox to the select all container

      // Add event listener to the select all checkbox
      selectAllCheckbox.addEventListener("change", (event) => {
        const checkboxes = document.querySelectorAll(
          ".accordion-checkbox, .purpose-checkbox"
        );
        checkboxes.forEach((checkbox) => {
          checkbox.checked = event.target.checked;
        });
      });

      noticeBody2.appendChild(bodyText2); // Append body text 2 to noticeBody2
      noticeBody2.appendChild(selectAllContainer); // Append the select all container to noticeBody2

      // Create the accordion container
      const accordionContainer = document.createElement("div");
      accordionContainer.className = "moraj-accordion-container";

      // Create the accordion
      const accordion = document.createElement("div");
      accordion.className = "accordion";
      // Function to render accordion content based on provided data
      const renderAccordion = (data_element) => {
        accordion.innerHTML = ""; // Clear existing content

        data_element.forEach((item, index) => {
          const accordionItem = document.createElement("div");
          accordionItem.className = "accordion-item";

          const question = document.createElement("div");
          question.className = "accordion-question";

          const icon = document.createElement("span");
          icon.className = "accordion-icon";
          icon.innerText = "+";

          const label = document.createElement("label");
          label.htmlFor = `question-${index}`;
          label.innerText = item.data_element_title; // Only show the title here
          label.className = "accordion-label";

          // Create a div to hold expiry and retention period on separate lines
          const expiryRetentionDiv = document.createElement("div");
          expiryRetentionDiv.className = "expiry-retention-div";

          // Create a div for expiry
          const expiryDiv = document.createElement("div");
          expiryDiv.className = "expiry-div";
          expiryDiv.innerText = `Consent: ${item.expiry} days`;

          // Create a div for retention period
          const retentionDiv = document.createElement("div");
          retentionDiv.className = "retention-div";
          retentionDiv.innerText = `Retention: ${item.retention_period} days`;

          // Append expiry and retention divs to the expiryRetentionDiv
          expiryRetentionDiv.appendChild(expiryDiv);
          expiryRetentionDiv.appendChild(retentionDiv);

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = `checkbox-${index}`;
          checkbox.className = "accordion-checkbox";
          checkbox.style.accentColor =
            noticeInfo.colors?.check_mark || "#000000";

          const answer = document.createElement("div");
          answer.className = "accordion-answer-left";
          answer.style.display = "none";

          const answerList = document.createElement("ul");
          item.purposes.forEach((purpose) => {
            const listItem = document.createElement("li");
            listItem.className = "purpose-item"; // Add class for styling

            // Create container for text
            const textContainer = document.createElement("span");
            textContainer.className = "text-container";
            textContainer.innerText = `• ${purpose.purpose_description}`;

            // Create the tooltip icon
            const tooltipIcon = document.createElement("span");
            tooltipIcon.className = "tooltip-icon";
            tooltipIcon.innerText = "?";

            // Create the tooltip text element
            const tooltipText = document.createElement("div");
            tooltipText.className = "tooltip-text";
            tooltipText.innerHTML = `
              <strong> Consent:</strong> ${
                purpose.purpose_expiry || "N/A"
              } days<br/>
              <strong> Retention:</strong> ${
                purpose.purpose_retention || "N/A"
              } days
            `;
            tooltipText.style.display = "none"; // Hide tooltip by default

            // Add event listener to show/hide the tooltip on click
            tooltipIcon.addEventListener("click", () => {
              tooltipText.style.display =
                tooltipText.style.display === "none" ? "block" : "none";
            });

            // Append the tooltip icon and text to the text container
            textContainer.appendChild(tooltipIcon);
            textContainer.appendChild(tooltipText);

            // Create purpose checkbox
            const purposeCheckbox = document.createElement("input");
            purposeCheckbox.type = "checkbox";
            purposeCheckbox.className = "purpose-checkbox";
            purposeCheckbox.setAttribute("data-purpose-id", purpose.purpose_id);
            purposeCheckbox.setAttribute("data-element", item.data_element);

            // Add event listener to the purpose checkbox
            purposeCheckbox.addEventListener("change", () => {
              const allPurposeCheckboxes =
                listItem.parentElement.querySelectorAll(".purpose-checkbox");
              const allChecked = Array.from(allPurposeCheckboxes).every(
                (cb) => cb.checked
              );
              checkbox.checked = allChecked;

              // Check/uncheck select all checkbox based on overall state
              const allCheckboxes = document.querySelectorAll(
                ".accordion-checkbox, .purpose-checkbox"
              );
              const allCheckboxesChecked = Array.from(allCheckboxes).every(
                (cb) => cb.checked
              );
              selectAllCheckbox.checked = allCheckboxesChecked;
            });

            // Append purpose info and checkbox to the list item
            listItem.appendChild(textContainer); // Append text container to list item
            listItem.appendChild(purposeCheckbox); // Append checkbox to list item

            answerList.appendChild(listItem);
          });

          // Add event listener to the data_element_title checkbox
          checkbox.addEventListener("change", (event) => {
            const allPurposeCheckboxes =
              answer.querySelectorAll(".purpose-checkbox");
            allPurposeCheckboxes.forEach(
              (cb) => (cb.checked = event.target.checked)
            );

            // Check/uncheck select all checkbox based on overall state
            const allCheckboxes = document.querySelectorAll(
              ".accordion-checkbox, .purpose-checkbox"
            );
            const allCheckboxesChecked = Array.from(allCheckboxes).every(
              (cb) => cb.checked
            );
            selectAllCheckbox.checked = allCheckboxesChecked;
          });

          answer.appendChild(answerList);

          question.appendChild(icon); // Append the icon to the question
          question.appendChild(label); // Append the label to the question
          question.appendChild(expiryRetentionDiv); // Append the expiry and retention div before the checkbox
          question.appendChild(checkbox); // Append the checkbox to the question
          question.addEventListener("click", (event) => {
            // Prevent checkbox click from toggling accordion
            if (event.target !== checkbox) {
              const isVisible = answer.style.display === "block";
              answer.style.display = isVisible ? "none" : "block";
              icon.innerText = isVisible ? "+" : "-";
            }
          });

          accordionItem.appendChild(question); // Append the question to the accordion item
          accordionItem.appendChild(answer); // Append the answer to the accordion item
          accordion.appendChild(accordionItem); // Append the accordion item to the accordion
        });
      };

      renderAccordion(noticeInfo.english?.collection_point?.data_elements); // Initial render with provided questions and answers

      accordionContainer.appendChild(accordion); // Append the accordion to the accordion container

      // Create the notice footer
      const noticeFooter = document.createElement("div");
      noticeFooter.className = "moraj-notice-center-footer";

      // Create accept button
      const acceptButton = document.createElement("button");
      acceptButton.className = "accept";
      acceptButton.innerText = "I Agree"; // Change text to "I Agree"
      acceptButton.style.backgroundColor =
        noticeInfo.colors?.button || "#132f5f"; // Set the background color
      acceptButton.classList = "moraj-notice-center-footer-button";

      let isAgreementGenerated = false;

      // Add this code to change the button color to gray and disable it after the first click
      acceptButton.addEventListener("click", () => {
        // Change the background color to gray and disable the accept button
        acceptButton.style.backgroundColor = "gray";
        acceptButton.disabled = true;

        const selectedDataElements = [];

        // Loop through each accordion item to collect the selected purposes
        document.querySelectorAll(".accordion-item").forEach((item) => {
          const selectedPurposes = [];

          // Collect all selected purposes for each data element
          item.querySelectorAll(".purpose-checkbox").forEach((checkbox) => {
            if (checkbox.checked) {
              selectedPurposes.push({
                purpose_id: checkbox.getAttribute("data-purpose-id"),
                consent_status: true,
                shared: true,
                data_processors: [], // Add relevant data processors if needed
                cross_border: true,
                consent_timestamp: new Date().toISOString(),
                expiry_date: null, // Add expiry date if needed
                retention_date: null, // Add retention date if needed
              });
            }
          });

          // Add the data element and its consents to the selectedDataElements array
          if (selectedPurposes.length > 0) {
            selectedDataElements.push({
              data_element: item
                .querySelector(".purpose-checkbox")
                .getAttribute("data-element"),
              consents: selectedPurposes,
            });
          }
        });

        if (selectedDataElements.length === 0) {
          alert("Please select at least one purpose.");
          acceptButton.disabled = false; // Re-enable the button if no purpose is selected
          acceptButton.style.backgroundColor =
            noticeInfo.colors?.button || "#132f5f"; // Reset the button background color
          return;
        }

        const selectedLanguage = languageDropdown.value || "english";

        const payload = {
          consent_language: selectedLanguage,
          linked_agreement: "string", // Adjust this value as needed
          data_elements: selectedDataElements,
        };

        console.log("Payload:", JSON.stringify(payload, null, 2)); // Log the payload for debugging

        // Send the payload to the server
        fetch(
          `https://ngp.adnan-qasim.me/post-consent-preference?dp_id=${uuid}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "df-id": org_id,
              "application-id": app_id,
              "cp-id": cp_id,
              "dp-e": uuid,
            },
            body: JSON.stringify(payload),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Post consent preference response:", data);

            // Store agreement_id in local storage
            if (data.agreement_id) {
              localStorage.setItem("agreement_id", data.agreement_id);
              alert(
                `Consent preferences updated successfully. Agreement ID: ${data.agreement_id}`
              );
            } else {
              alert(
                "Consent preferences updated successfully, but no agreement ID received."
              );
            }

            // Replace the description with agreement_description based on the selected language
            isAgreementGenerated = true;
            updateAgreementDescription();

            // Hide the Manage Consent Preferences and accordion
            noticeBody2.style.display = "none";
            accordionContainer.style.display = "none";

            // Remove the accept button
            acceptButton.style.display = "none";

            // Create a div with a yellow background to hold the buttons
            const buttonContainer = document.createElement("div");
            buttonContainer.className = "moraj-notice-center-pdf-exit"; // Assuming 'yellow' is a predefined CSS class

            // Create container for the PDF icon
            const pdfIconContainer = document.createElement("div");
            pdfIconContainer.className = "moraj-notice-center-pdf-icon";

            // Create the PDF icon
            const pdfIcon = document.createElement("img");
            pdfIcon.src = "https://i.postimg.cc/YSRDgSvM/Consent-pdf-2.png";
            pdfIcon.width = 120;
            pdfIcon.height = 120;
            pdfIcon.alt = "PDF Icon";

            // Create the DigiLocker icon
            const digiIcon = document.createElement("img");
            digiIcon.src =
              "https://i.postimg.cc/prwPPXQJ/digilocker-removebg-preview.png";
            digiIcon.width = 150;
            digiIcon.height = 150;
            digiIcon.alt = "DigiLocker Icon";

            // Add event listener to route to DigiLocker on click
            digiIcon.addEventListener("click", () => {
              window.open("https://www.digilocker.gov.in/", "_blank");
            });

            // Append the icons to the container (PDF icon first)
            pdfIconContainer.appendChild(pdfIcon);
            pdfIconContainer.appendChild(digiIcon);

            // Create another container for the Download PDF and Exit buttons
            const buttonsContainer = document.createElement("div");
            buttonsContainer.className = "moraj-notice-center-pdf-buttons-div";
            buttonsContainer.style.display = "flex";

            // Create Download PDF button
            const downloadPDFButton = document.createElement("button");
            downloadPDFButton.className = "moraj-notice-center-exit-button";
            downloadPDFButton.innerText = "Download PDF";

            // Create Exit button
            const exitButton = document.createElement("button");
            exitButton.innerText = "Exit";
            exitButton.className = "moraj-notice-center-exit-button";

            // Append the buttons to the buttons container
            buttonsContainer.appendChild(downloadPDFButton);
            buttonsContainer.appendChild(exitButton);

            // Append the PDF icon container and buttons container to the main button container
            buttonContainer.appendChild(pdfIconContainer);
            buttonContainer.appendChild(buttonsContainer);

            // Append the button container to the footer
            noticeFooter.appendChild(buttonContainer);

            // Function to generate and download the PDF
            const downloadPDF = () => {
              loadJSPDF(() => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Function to format date and time fields
                function formatDate(dateString) {
                  const date = new Date(dateString);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  };
                  return date.toLocaleDateString("en-US", options);
                }

                // Function to convert numbers to Roman numerals
                function toRoman(num) {
                  const lookup = {
                    M: 1000,
                    CM: 900,
                    D: 500,
                    CD: 400,
                    C: 100,
                    XC: 90,
                    L: 50,
                    XL: 40,
                    X: 10,
                    IX: 9,
                    V: 5,
                    IV: 4,
                    I: 1,
                  };
                  let roman = "";
                  for (let i in lookup) {
                    while (num >= lookup[i]) {
                      roman += i;
                      num -= lookup[i];
                    }
                  }
                  return roman.toLowerCase(); // Convert to lowercase to match the format (i., ii., iii.)
                }

                const imgData = noticeInfo.urls.header_logo;

                // Set the top margins
                const firstPageTopMargin = 70; // The margin where text starts on the first page
                const subsequentPagesTopMargin = 50; // Slightly lower margin for subsequent pages

                // Function to add the image to the top right of every page
                function addImageToPage(doc, imgData) {
                  doc.addImage(imgData, "PNG", 150, 10, 50, 20);
                }

                // Add the image to the first page
                addImageToPage(doc, imgData);

                // Title
                doc.setFont("helvetica", "bold");
                doc.setFontSize(18);
                doc.text(
                  "Personal Data Processing & Consent Agreement",
                  doc.internal.pageSize.getWidth() / 2,
                  40,
                  { align: "center" }
                );

                // Subtitle
                doc.setFont("helvetica", "italic");
                doc.setFontSize(12);
                doc.text(
                  "As per the Digital Personal Data Protection Act, 2023",
                  doc.internal.pageSize.getWidth() / 2,
                  50,
                  { align: "center" }
                );

                // Set initial Y position for text after the title and subtitle
                let yPosition = firstPageTopMargin;
                const rightMarginOffset = 20; // Add space from the right for Agreement ID and Timestamp only
                const lineHeight = 6; // Slightly increased line height for comfortable spacing
                const sectionSpacing = 12; // Slightly increased spacing between sections
                const pageHeight = doc.internal.pageSize.height; // Get page height

                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);

                function addTextWithPageCheck(
                  text,
                  x,
                  y,
                  align = "left",
                  isFirstPage = false
                ) {
                  if (y > pageHeight - 20) {
                    // Check if the text exceeds the page height
                    doc.addPage();
                    addImageToPage(doc, imgData); // Add the image to the new page
                    y = isFirstPage
                      ? firstPageTopMargin
                      : subsequentPagesTopMargin; // Set y position based on page type
                  }
                  doc.text(text, x, y, { align }); // Align text based on specified alignment
                  return y + lineHeight;
                }

                // For Agreement ID and Timestamp, add space from the right
                yPosition = addTextWithPageCheck(
                  `Agreement ID: ${data.agreement_id || "N/A"}`,
                  doc.internal.pageSize.getWidth() - rightMarginOffset,
                  yPosition,
                  "right",
                  true
                );
                yPosition = addTextWithPageCheck(
                  `Agreement Timestamp: ${
                    formatDate(data.consent_artifact.consent.timestamp) || "N/A"
                  }`,
                  doc.internal.pageSize.getWidth() - rightMarginOffset,
                  yPosition,
                  "right",
                  true
                );

                // First Paragraph
                yPosition += sectionSpacing;
                let text = `1. This notice is to inform you of how we, Trust Bank located at 1234, IT Park, Sector 16, Noida, Uttar Pradesh, 201301, India, with Data Fiduciary ID ${
                  data.consent_artifact.consent.data_fiduciary.df_id || "N/A"
                }, process your personal data, with your consent.`;
                let splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(
                    line,
                    20,
                    yPosition,
                    "left",
                    true
                  );
                });

                // Second Paragraph
                yPosition += sectionSpacing;
                text = `2. At the ${
                  data.consent_artifact.consent.cp_name || "N/A"
                } collection point, we have collected the following personal data from you, with the data principal identifier being ${
                  data.consent_artifact.consent.data_principal.dp_id || "N/A"
                }, for the purposes mentioned in this notice:`;
                splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(
                    line,
                    20,
                    yPosition,
                    "left",
                    true
                  );
                });

                // Check if consent_scope exists and is an array
                if (
                  Array.isArray(data.consent_artifact.consent.consent_scope) &&
                  data.consent_artifact.consent.consent_scope.length > 0
                ) {
                  // Dynamic Data Elements and Purposes
                  yPosition += sectionSpacing;
                  data.consent_artifact.consent.consent_scope.forEach(
                    (scope, index) => {
                      doc.setFont("helvetica", "bold");
                      yPosition = addTextWithPageCheck(
                        `(${String.fromCharCode(97 + index)}) ${
                          scope.data_element || "N/A"
                        } will be used to:`,
                        20,
                        yPosition
                      );

                      scope.consents.forEach((consent, subIndex) => {
                        doc.setFont("helvetica", "normal");
                        yPosition += lineHeight; // Add line height before each consent

                        // Generate the Roman numeral format (i., ii., iii., etc.)
                        const numberFormat = `${toRoman(subIndex + 1)}.`;

                        const consentText = `${numberFormat} ${
                          consent.purpose_id || "N/A"
                        } and ${
                          scope.data_element || "N/A"
                        } will be processed until ${
                          formatDate(consent.purpose_expiry) || "N/A"
                        } and retained only until ${
                          formatDate(consent.purpose_retention) || "N/A"
                        }`;

                        // Split the text into multiple lines if necessary
                        const splitConsentText = doc.splitTextToSize(
                          consentText,
                          170
                        );

                        // Print the split text line by line
                        splitConsentText.forEach((line) => {
                          yPosition = addTextWithPageCheck(line, 25, yPosition);
                        });
                      });

                      yPosition += sectionSpacing; // Add space after each data element
                    }
                  );
                } else {
                  console.error("consent_scope is undefined or not an array");
                }

                // Additional Information
                yPosition += sectionSpacing;
                text =
                  "We will only collect as much personal data as is necessary for the purposes mentioned. The personal data will not be used for any other purpose.";
                splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(line, 20, yPosition);
                });

                // First link section: Withdrawal of Consent
                yPosition += sectionSpacing;
                text = `3. You can withdraw your consent for processing of your personal data at any time, by `;

                const firstPart = `Perfios DPAR`; // Text that will have the hyperlink
                splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(line, 20, yPosition);
                });

                doc.setTextColor(0, 0, 255); // Set the color to light blue
                doc.textWithLink(firstPart, 20, yPosition, {
                  url: "https://www.perfios.com/index.php",
                }); // Start the link at the beginning of the new line
                yPosition += lineHeight; // Move to the next line

                doc.setTextColor(0, 0, 0); // Reset color to black
                text = `If you do so, your personal data will be erased, unless there is any legal requirement to retain it.`;
                splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(line, 20, yPosition);
                });

                // Second link section: Contacting DPO
                yPosition += sectionSpacing;
                text = `4. If you have any questions regarding the processing of your data, you can contact the data protection officer at `;
                splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(line, 20, yPosition);
                });

                const secondPart = "Perfios DPAR";
                doc.setTextColor(0, 0, 255); // Set the color to light blue
                doc.textWithLink(secondPart, 20, yPosition, {
                  url: "https://www.perfios.com/index.php",
                }); // Hyperlink the second occurrence of Perfios DPAR

                yPosition += lineHeight; // Move to the next line

                doc.setTextColor(0, 0, 0); // Reset color to black
                text = `.`;
                splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(line, 20, yPosition);
                });

                // Rights
                yPosition += sectionSpacing;
                doc.setFont("helvetica", "normal"); // Set font to normal
                yPosition = addTextWithPageCheck(
                  "5. You have the right to:",
                  20,
                  yPosition
                );

                yPosition = addTextWithPageCheck(
                  "(a) Access information about your personal data",
                  25,
                  yPosition
                );
                yPosition = addTextWithPageCheck(
                  "(b) Correct and update your personal data",
                  25,
                  yPosition
                );
                yPosition = addTextWithPageCheck(
                  "(c) Erase your personal data",
                  25,
                  yPosition
                );
                yPosition = addTextWithPageCheck(
                  "(d) Seek redress of any grievance regarding processing of your personal data",
                  25,
                  yPosition
                );
                yPosition = addTextWithPageCheck(
                  "(e) Nominate someone to exercise these rights in case of death or incapacity",
                  25,
                  yPosition
                );

                // Section 6: Grievance and other rights
                yPosition += sectionSpacing;
                text = `6. You can register any grievance by Perfios DPAR and can also exercise your other rights by Perfios DPAR. In case you do not receive any reply from us within 7 Days of registering your grievance or it is not redressed by our response, you can approach the Data Protection Board of India by Government of India.`;
                splitText = doc.splitTextToSize(text, 170);
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(line, 20, yPosition);
                });

                // Add the final consent artifact information
                yPosition += sectionSpacing;
                text = `This consent agreement has been generated automatically with the consent artifact identified hash: ${data.consent_artifact_hash}`;
                splitText.forEach((line) => {
                  yPosition = addTextWithPageCheck(line, 20, yPosition);
                });

                // Save the PDF
                const fileName = `concur-consent-${
                  data.agreement_id || "N/A"
                }.pdf`;
                doc.save(fileName);
              });
            };

            // Event listener for Download PDF button
            downloadPDFButton.addEventListener("click", downloadPDF);

            // Event listener for PDF icon click to download PDF
            pdfIcon.addEventListener("click", downloadPDF);

            // Event listener for Exit button
            exitButton.addEventListener("click", () => {
              document.body.removeChild(overlay);
              const fixedBottomDiv =
                document.querySelector(".fixed-bottom-div");
              if (fixedBottomDiv) {
                fixedBottomDiv.remove();
              }
            });
          })
          .catch((error) => {
            console.error("Failed to post consent preference:", error);
            acceptButton.disabled = false; // Re-enable the button if there's an error
            acceptButton.style.backgroundColor =
              noticeInfo.colors?.button || "#132f5f"; // Reset the button background color
          });
      });

      // Create the fixed bottom div
      const fixedBottomDiv = document.createElement("div");
      fixedBottomDiv.className = "center-bottom-div";

      // Create left div for fixed bottom div
      const leftDiv = document.createElement("div");
      leftDiv.className = "fixed-bottom-div-left";

      // Create first anchor element with icon
      const leftA1 = document.createElement("a");
      leftA1.className = "fixed-bottom-link";
      leftA1.href = noticeInfo.urls?.dpar_link || "#"; // Add the appropriate href value
      leftA1.target = "_blank"; // Open link in a new tab
      leftA1.innerText = "DPAR";
      const icon1 = document.createElement("img");
      icon1.className = "link-icon";
      icon1.src =
        noticeInfo.urls?.arrowIcon || "https://via.placeholder.com/20";
      leftA1.appendChild(icon1);

      // Create second anchor element with icon
      const leftA2 = document.createElement("a");
      leftA2.className = "fixed-bottom-link";
      leftA2.href = noticeInfo.urls?.manage_consent_link || "#"; // Add the appropriate href value
      leftA2.target = "_blank"; // Open link in a new tab
      leftA2.innerText = "Manage Consent";
      const icon2 = document.createElement("img");
      icon2.className = "link-icon";
      icon2.src =
        noticeInfo.urls?.arrowIcon || "https://via.placeholder.com/20";
      leftA2.appendChild(icon2);

      // Append anchor elements to the left div
      leftDiv.appendChild(leftA1);
      leftDiv.appendChild(leftA2);

      // Create right div for fixed bottom div
      const rightDiv = document.createElement("div");
      rightDiv.className = "fixed-bottom-div-right";

      // Create heading for right div
      const rightH1 = document.createElement("h3");
      rightH1.innerText = "";

      // Create anchor element with Google logo
      const anchor = document.createElement("a");
      anchor.href = "https://www.perfios.com/index.php";
      anchor.target = "_blank"; // Open link in a new tab
      const googleLogo = document.createElement("img");
      googleLogo.src = noticeInfo.urls.footer_logo;
      googleLogo.alt = "footer Logo";

      anchor.appendChild(googleLogo); // Append Google logo to the anchor
      rightDiv.appendChild(rightH1); // Append heading to the right div
      rightDiv.appendChild(anchor); // Append anchor to the right div

      fixedBottomDiv.appendChild(leftDiv); // Append left div to the fixed bottom div
      fixedBottomDiv.appendChild(rightDiv); // Append right div to the fixed bottom div

      noticeFooter.appendChild(acceptButton); // Append accept button to the notice footer

      // Append the header and content containers to the main notice container
      noticeContainer.appendChild(noticeHeader); // Append notice header to the notice container
      noticeContainer.appendChild(contentContainer); // Append content container to the notice container

      // Append content to the content container
      contentContainer.appendChild(noticeMainBody); // Append main body to the content container
      contentContainer.appendChild(noticeBody); // Append notice body to the content container
      contentContainer.appendChild(noticeBodyDesc); // Append notice body description to the content container
      contentContainer.appendChild(noticeBody2); // Append second notice body to the content container
      contentContainer.appendChild(accordionContainer); // Append accordion container to the content container
      contentContainer.appendChild(noticeFooter); // Append notice footer to the content container
      contentContainer.appendChild(fixedBottomDiv); // Append fixed bottom div to the content container

      overlay.appendChild(noticeContainer); // Append notice container to the overlay
      document.body.appendChild(overlay); // Append overlay to the document body

      // Function to update content based on selected language
      function updateContent(noticeInfo, language) {
        const langData = noticeInfo[language];
        if (!langData) return;

        title.innerText = langData.meta_data.header || "Default Header";
        bodyText.innerText = langData.meta_data.title || "Default Title";
        noticeBodyDesc.innerHTML =
          langData.meta_data.description || "Default description text...";
        bodyText2.innerText =
          langData.meta_data.manage_consent_title ||
          "Manage Consent Preferences";
        acceptButton.innerText = langData.button.primary || "Accept";
        selectAllLabel.innerText = langData.button.selectAll || "Select All";

        // Update the audio source dynamically based on the selected language
        audio.src =
          langData.meta_data.mp3Link || "https://via.placeholder.com/audio.mp3";
        audio.load(); // Load the new audio source

        renderAccordion(langData.collection_point.data_elements);
      }

      // Attach the language change event listener
      languageDropdown.addEventListener("change", () => {
        const selectedLanguage = languageDropdown.value;
        updateContent(noticeInfo, selectedLanguage);

        if (isAgreementGenerated) {
          updateAgreementDescription();
        }
      });

      // Function to update the agreement description dynamically
      function updateAgreementDescription() {
        if (isAgreementGenerated) {
          const selectedLanguage = languageDropdown.value || "english";
          noticeBodyDesc.innerText =
            noticeInfo[selectedLanguage]?.meta_data?.agreement_description ||
            "Agreement Description Text...";
        }
      }

      // Initial content update
      updateContent(noticeInfo, "english");
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
}

// Utility function to generate a UUID
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
