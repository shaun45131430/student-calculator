let activityCount = 0;

function addActivity() {
    if (activityCount < 25) {
        const activityDiv = document.createElement('div');
        activityDiv.innerHTML = `
            <label>Activity ${activityCount + 1}:</label>
            <input type="text" placeholder="Activity Name" required>
            <input type="number" placeholder="Mark Obtained" required>
            <input type="number" placeholder="Total Marks" required>
            <label>Weightage (%):</label>
            <input type="number" placeholder="Weightage" required>
        `;
        document.getElementById('activityInputs').appendChild(activityDiv);
        activityCount++;
    } else {
        alert("Maximum of 25 activities reached.");
    }
}

function calculateParticipation() {
    const activities = Array.from(document.querySelectorAll('#activityInputs div'));
    let totalWeightedMarks = 0;
    let totalWeightage = 0;

    activities.forEach(activity => {
        const markObtained = Number(activity.querySelector('input[type="number"]').value);
        const totalMarks = Number(activity.querySelectorAll('input[type="number"]')[1].value);
        const weightage = Number(activity.querySelectorAll('input[type="number"]')[2].value);

        if (totalMarks > 0) {
            const adjustedMark = (markObtained * 100) / totalMarks;
            const weightedMark = (adjustedMark * weightage) / 100;

            totalWeightedMarks += weightedMark;
            totalWeightage += weightage;
        }
    });

    const participationMark = totalWeightage > 0 ? (totalWeightedMarks / totalWeightage) * 100 : 0;
    document.getElementById('participationResult').innerText = `Participation Mark: ${participationMark.toFixed(2)}`;

    const examQualify = Number(document.getElementById('examQualify').value);
    if (participationMark < examQualify) {
        document.getElementById('participationResult').innerText += "\nDID NOT QUALIFY FOR EXAM";
        document.getElementById('examSection').style.display = "none";
    } else {
        document.getElementById('participationResult').innerText += "\nQUALIFIED FOR EXAM";
        document.getElementById('examSection').style.display = "block";
    }

    updateFinalMarkDisplay(participationMark);
}

function updateFinalMarkDisplay(participationMark) {
    const dmContribution = Number(document.getElementById('dmContribution').value);
    const participationFinal = (participationMark * dmContribution) / 100;
    document.getElementById('finalMarkDisplay').innerText = `Calculated Participation Contribution: ${participationFinal.toFixed(2)}`;
}

function calculateFinalMark() {
    const examMark = Number(document.getElementById('examMark').value);
    const examContribution = Number(document.getElementById('examContribution').value);
    const manualParticipationContribution = Number(document.getElementById('manualParticipationContribution').value);

    const examFinal = (examMark * examContribution) / 100;
    const finalMark = manualParticipationContribution + examFinal;

    let resultMessage = `Final Mark: ${finalMark.toFixed(2)}`;
    resultMessage += `\nParticipation Contribution: ${manualParticipationContribution.toFixed(2)}`;
    resultMessage += `\nExam Contribution: ${examFinal.toFixed(2)}`;

    if (examMark < 40) {
        resultMessage += "\nExam Result: Failed (sub-minimum)";
        resultMessage += "\nPrepare for a second opportunity.";
    } else {
        resultMessage += "\nExam Result: Passed";
    }

    if (finalMark < 50) {
        resultMessage += "\nSorry, you have failed the module.";
    } else if (finalMark >= 75) {
        resultMessage += "\nCongratulations, you have passed the module with distinction!";
    } else {
        resultMessage += "\nCongratulations, you have passed the module.";
    }

    document.getElementById('finalResult').innerText = resultMessage;
}

function calculateDirectFinalMark() {
    const participationMark = Number(document.getElementById('directParticipationMark').value);
    const examMark = Number(document.getElementById('directExamMark').value);
    const examContribution = Number(document.getElementById('directExamContribution').value);
    const directDmContribution = Number(document.getElementById('directDmContribution').value);
    
    const participationFinal = (participationMark * directDmContribution) / 100;
    const examFinal = (examMark * examContribution) / 100;

    const finalMark = participationFinal + examFinal;

    let resultMessage = `Final Mark: ${finalMark.toFixed(2)}`;
    resultMessage += `\nParticipation Contribution: ${participationFinal.toFixed(2)}`;
    resultMessage += `\nExam Contribution: ${examFinal.toFixed(2)}`;

    if (examMark < 40) {
        resultMessage += "\nExam Result: Failed (sub-minimum)";
        resultMessage += "\nPrepare for a second opportunity.";
    } else {
        resultMessage += "\nExam Result: Passed";
    }

    if (finalMark < 50) {
        resultMessage += "\nSorry, you have failed the module.";
    } else if (finalMark >= 75) {
        resultMessage += "\nCongratulations, you have passed the module with distinction!";
    } else {
        resultMessage += "\nCongratulations, you have passed the module.";
    }

    document.getElementById('directFinalResult').innerText = resultMessage;
}