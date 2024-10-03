 // Example data
        const symptoms = [
            "Cough", "Runny Nose", "Sore Throat", "Congestion", "Fever",
            "Muscle Pain", "Fatigue", "Itchy Eyes", "Nasal Congestion",
            "Shortness of Breath", "Headache", "Nausea", "Indigestion",
            "Abdominal Pain", "Joint Pain", "Swelling", "Blurred Vision",
            "Itchy Skin", "Red, Scaly Patches on Skin", "Dry Skin", "Diarrhea",
            "Weight Loss", "Persistent Cough", "Vision Problems"
        ];

        const medicines = {
            "Cough": ["Cough Syrups", "Expectorants"],
            "Runny Nose": ["Nasal Sprays", "Decongestants"],
            "Sore Throat": ["Throat Lozenges", "Pain Relievers"],
            "Congestion": ["Decongestants", "Steam Inhalers"],
            "Fever": ["Antipyretics", "Hydration"],
            "Muscle Pain": ["Pain Relievers", "Muscle Relaxants"],
            "Fatigue": ["Energy Supplements", "Hydration"],
            "Itchy Eyes": ["Antihistamines", "Eye Drops"],
            "Nasal Congestion": ["Decongestants", "Nasal Sprays"],
            "Shortness of Breath": ["Inhalers", "Oxygen Therapy"],
            "Headache": ["Pain Relievers", "Rest"],
            "Nausea": ["Anti-nausea Medications", "Hydration"],
            "Indigestion": ["Antacids", "Digestive Enzymes"],
            "Abdominal Pain": ["Pain Relievers", "Antispasmodics"],
            "Joint Pain": ["Pain Relievers", "Anti-inflammatory Drugs"],
            "Swelling": ["Anti-inflammatory Medications", "Compression"],
            "Blurred Vision": ["Vision Correction Glasses", "Consultation"],
            "Itchy Skin": ["Antihistamines", "Moisturizers"],
            "Red, Scaly Patches on Skin": ["Topical Steroids", "Moisturizers"],
            "Dry Skin": ["Moisturizers", "Hydration"],
            "Diarrhea": ["Anti-diarrheal Medications", "Hydration"],
            "Weight Loss": ["Nutritional Supplements", "Hydration"],
            "Persistent Cough": ["Cough Syrups", "Expectorants"],
            "Vision Problems": ["Vision Correction Glasses", "Consultation"]
        };

        const illnesses = {
            "Common Cold": ["Cough", "Runny Nose", "Sore Throat", "Fever"],
            "Flu": ["Fever", "Cough", "Muscle Pain", "Fatigue"],
            "Allergies": ["Runny Nose", "Itchy Eyes", "Sore Throat"],
            "Sinusitis": ["Congestion", "Facial Pain", "Fever"],
            "Pneumonia": ["Cough", "Shortness of Breath", "Fever"],
            "Gastritis": ["Abdominal Pain", "Nausea", "Indigestion"],
            "Diabetes": ["Fatigue", "Weight Loss", "Blurred Vision"],
            "Gastroenteritis": ["Nausea", "Diarrhea", "Abdominal Pain"],
            "Arthritis": ["Joint Pain", "Swelling", "Fatigue"],
            "Skin Conditions": ["Itchy Skin", "Red, Scaly Patches on Skin"],
            "Conjunctivitis": ["Itchy Eyes", "Redness", "Discharge"]
        };

        // Functionality remains unchanged
        const tabButtons = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(tab => {
            tab.addEventListener('click', () => {
                const activeTab = document.querySelector('.tab.active');
                activeTab.classList.remove('active');
                tab.classList.add('active');

                const contentId = tab.getAttribute('data-tab');
                tabContents.forEach(content => {
                    content.classList.remove('show');
                    if (content.id === contentId) {
                        content.classList.add('show');
                    }
                });
            });
        });

        const checkboxContainer = document.getElementById('checkbox-container');
        symptoms.forEach(symptom => {
            const label = document.createElement('label');
            label.className = 'card';
            label.innerHTML = `<input type="checkbox" value="${symptom}"> ${symptom}`;
            checkboxContainer.appendChild(label);
        });

        const analyzeButton = document.getElementById('analyze-button');
        analyzeButton.addEventListener('click', () => {
            const selectedSymptoms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
            const resultContainer = document.getElementById('results');
            resultContainer.querySelector('#selected-symptoms-list').innerHTML = selectedSymptoms.map(symptom => `<li><i class="fas fa-check-circle"></i>${symptom}</li>`).join('');

            const illnessesFound = [];
            for (const illness in illnesses) {
                const symptomsRequired = illnesses[illness];
                if (selectedSymptoms.some(symptom => symptomsRequired.includes(symptom))) {
                    illnessesFound.push(illness);
                }
            }
            resultContainer.querySelector('#illnesses-list ul').innerHTML = illnessesFound.map(illness => `<li><i class="fas fa-stethoscope"></i>${illness}</li>`).join('');

            const medicinesRecommended = [];
            selectedSymptoms.forEach(symptom => {
                if (medicines[symptom]) {
                    medicinesRecommended.push(...medicines[symptom]);
                }
            });
            const uniqueMedicines = [...new Set(medicinesRecommended)];
            resultContainer.querySelector('#medicines-list ul').innerHTML = uniqueMedicines.map(medicine => `<li><i class="fas fa-pills"></i>${medicine}</li>`).join('');

            // Progress display
            const progress = document.getElementById('progress');
            progress.classList.add('show');
            setTimeout(() => {
                progress.classList.remove('show');
            }, 2000);
        });

        // Populate medicines table
        const medicineTableBody = document.querySelector('.medicine-table tbody');
        for (const symptom in medicines) {
            medicines[symptom].forEach(medicine => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${medicine}</td><td>${symptom}</td><td>Consult a healthcare provider for more information.</td>`;
                medicineTableBody.appendChild(row);
            });
        }

        // Toggle visibility of symptoms and illnesses
        const toggleSymptomsButton = document.getElementById('toggle-symptoms');
        const toggleIllnessesButton = document.getElementById('toggle-illnesses');

        toggleSymptomsButton.addEventListener('click', () => {
            checkboxContainer.classList.toggle('hidden');
            toggleSymptomsButton.textContent = toggleSymptomsButton.textContent === 'Hide Symptoms' ? 'Show Symptoms' : 'Hide Symptoms';
        });

        toggleIllnessesButton.addEventListener('click', () => {
            document.getElementById('illnesses-container').classList.toggle('hidden');
            toggleIllnessesButton.textContent = toggleIllnessesButton.textContent === 'Hide Illnesses' ? 'Show Illnesses' : 'Hide Illnesses';
        });
// contentProtection.js

// Function to prevent default actions
function preventDefaults(e) {
    e.preventDefault();
}

// Disable right-click and other actions
document.addEventListener('contextmenu', preventDefaults);
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.key === 's') || (e.key === 'F12') || (e.key === 'I')) {
        preventDefaults(e);
    }
});
document.addEventListener('mousedown', preventDefaults);
document.addEventListener('dragstart', preventDefaults);
document.addEventListener('copy', preventDefaults);

// Detect developer tools
let devToolsOpen = false;
const threshold = 160;

setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold && !devToolsOpen) {
        devToolsOpen = true;
        alert("Developer tools are open. Please close them.");
        // Optionally, you can redirect or reload
        // location.reload();
    } else if (!widthThreshold) {
        devToolsOpen = false;
    }
}, 1000);

// Overlay to block screenshots
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.zIndex = '9999';
overlay.style.pointerEvents = 'none';
document.body.appendChild(overlay);
