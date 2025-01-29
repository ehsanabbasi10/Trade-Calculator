let calculationHistory = [];

document.getElementById("calculateBtn").addEventListener("click", function () {
    const capital = parseFloat(document.getElementById("capital").value);
    const riskPercentage = parseFloat(document.getElementById("risk").value);
    const entryPrice = parseFloat(document.getElementById("price").value);
    const leverage = parseFloat(document.getElementById("leverage").value);
    const riskReward = parseFloat(document.getElementById("riskReward").value);

    if (!capital || !riskPercentage || !entryPrice || !leverage || !riskReward || 
        capital <= 0 || riskPercentage <= 0 || entryPrice <= 0 || leverage < 1 || riskReward <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Calculate Position Size
    const positionSize = capital * (riskPercentage / 100);
    const leveragedPosition = positionSize * leverage;

    // Calculate Stop Loss and Take Profit
    const stopLossPercentage = 1; // 1% default SL
    const stopLossPrice = entryPrice - (entryPrice * (stopLossPercentage / 100));
    const takeProfitPrice = entryPrice + (entryPrice * (stopLossPercentage * riskReward / 100));

    // Calculate Potential Profit and Loss
    const lossVolume = leveragedPosition * (stopLossPercentage / 100);
    const profitVolume = lossVolume * riskReward;

    // Display Results
    document.getElementById("volume").textContent = `$${positionSize.toFixed(2)}`;
    document.getElementById("leveragedVolume").textContent = `$${leveragedPosition.toFixed(2)}`;
    document.getElementById("profitVolume").textContent = `$${profitVolume.toFixed(2)}`;
    document.getElementById("lossVolume").textContent = `$${lossVolume.toFixed(2)}`;
    document.getElementById("tp").textContent = `$${takeProfitPrice.toFixed(2)}`;
    document.getElementById("sl").textContent = `$${stopLossPrice.toFixed(2)}`;
    document.getElementById("results").classList.remove("hidden");

    // Add to history
    const calculation = {
        timestamp: new Date().toLocaleString(),
        capital,
        riskPercentage,
        entryPrice,
        leverage,
        riskReward,
        positionSize,
        leveragedPosition,
        profitVolume,
        lossVolume,
        takeProfitPrice,
        stopLossPrice
    };

    calculationHistory.unshift(calculation);
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }

    updateHistoryDisplay();
});

function updateHistoryDisplay() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    
    calculationHistory.forEach(calc => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
            <div class="d-flex flex-column">
                <div class="text-primary fw-bold mb-1">${calc.timestamp}</div>
                <div class="small">
                    <div class="row">
                        <div class="col-md-3">
                            Capital: <span class="text-success">$${calc.capital.toFixed(2)}</span>
                        </div>
                        <div class="col-md-3">
                            Risk: <span class="text-danger">${calc.riskPercentage}%</span>
                        </div>
                        <div class="col-md-3">
                            Leverage: <span class="text-primary">${calc.leverage}×</span>
                        </div>
                        <div class="col-md-3">
                            R:R: <span class="text-primary">${calc.riskReward}</span>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-md-6">
                            Position: <span class="text-success">$${calc.leveragedPosition.toFixed(2)}</span>
                        </div>
                        <div class="col-md-3">
                            TP: <span class="text-success">$${calc.takeProfitPrice.toFixed(2)}</span>
                        </div>
                        <div class="col-md-3">
                            SL: <span class="text-danger">$${calc.stopLossPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        historyList.appendChild(li);
    });
}