let calculationHistory = [];

document.getElementById("calculateBtn").addEventListener("click", function () {
    const capital = parseFloat(document.getElementById("capital").value);
    const riskPercentage = parseFloat(document.getElementById("risk").value);
    const livePrice = parseFloat(document.getElementById("price").value);

    if (!capital || !riskPercentage || !livePrice || capital <= 0 || riskPercentage <= 0 || livePrice <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    // Calculate Trade Volume (in coins/shares)
    const tradeVolume = capital * (riskPercentage / 100);

    // Calculate Take Profit (TP) and Stop Loss (SL)
    const sl = livePrice - (livePrice * 0.01); // 1% below live price
    const tp = livePrice + (livePrice * 0.03); // 3% above live price

    // Display Results
    document.getElementById("volume").textContent = `$${tradeVolume.toFixed(2)}`;
    document.getElementById("tp").textContent = `$${tp.toFixed(2)}`;
    document.getElementById("sl").textContent = `$${sl.toFixed(2)}`;
    document.getElementById("results").classList.remove("hidden");

    // Add to history
    const calculation = {
        timestamp: new Date().toLocaleString(),
        capital: capital,
        riskPercentage: riskPercentage,
        livePrice: livePrice,
        tradeVolume: tradeVolume,
        tp: tp,
        sl: sl
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
                        <div class="col-sm-6">
                            Capital: <span class="text-success">$${calc.capital.toFixed(2)}</span>
                        </div>
                        <div class="col-sm-3">
                            Risk: <span class="text-danger">${calc.riskPercentage}%</span>
                        </div>
                        <div class="col-sm-3">
                            Price: <span class="text-primary">$${calc.livePrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-sm-4">
                            Volume: <span class="text-success">$${calc.tradeVolume.toFixed(2)}</span>
                        </div>
                        <div class="col-sm-4">
                            TP: <span class="text-success">$${calc.tp.toFixed(2)}</span>
                        </div>
                        <div class="col-sm-4">
                            SL: <span class="text-danger">$${calc.sl.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        historyList.appendChild(li);
    });
}