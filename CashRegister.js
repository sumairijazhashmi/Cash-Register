function checkCashRegister(price, cash, cid) {
    // map bills/coins to their actual value
    let mappings = {"PENNY" : 0.01, "NICKEL" : 0.05, "DIME" : 0.1, "QUARTER" : 0.25, "ONE" : 1, "FIVE" : 5, "TEN" : 10, "TWENTY" : 20, "ONE HUNDRED" : 100};
    // find change due
    let changeDue = cash - price;
    let balanceAvailable = 0;
    // find total balance available
    for(let i=0; i<cid.length; i++)
    {
        balanceAvailable += cid[i][1];
    }
    balanceAvailable = balanceAvailable.toFixed(2);
    balanceAvailable = parseFloat(balanceAvailable);
    // if balance < change return insufficient
    let result = {};
    if(balanceAvailable < changeDue)
    {
        result = {"status": "INSUFFICIENT_FUNDS", "change": []};
    }
    // if balance = change return closed
    if(balanceAvailable == changeDue)
    {
        result = {"status": "CLOSED", "change": cid};
    }
    // reverse to operate from bottom up (largest bill -> smallest)
    cid.reverse();
    if(balanceAvailable > changeDue)
    {
        let change = [];
        // for each bill in cid keep decreasing it by that bill until either you run out of that type of bill or the change gets less than that bill
        // the amount cut for each bill is added to the "change" return value
        for(let i=0; i<cid.length; i++)
        {
            let amountCutPerBill = 0;
            while(changeDue >= mappings[cid[i][0]] && cid[i][1] > 0)
            {
                cid[i][1] -= mappings[cid[i][0]];
                changeDue -= mappings[cid[i][0]];
                amountCutPerBill += mappings[cid[i][0]];

                cid[i][1] = cid[i][1].toFixed(2);
                changeDue = changeDue.toFixed(2);
                amountCutPerBill = amountCutPerBill.toFixed(2);

                cid[i][1] = parseFloat(cid[i][1]);
                changeDue = parseFloat(changeDue);
                amountCutPerBill = parseFloat(amountCutPerBill);
                
            }
            if(amountCutPerBill > 0)
            {
                change.push([cid[i][0], amountCutPerBill]);
            }
            amountCutPerBill = 0;
        }
        if(change.length < 1 || changeDue > 0)
        {
            result = {"status": "INSUFFICIENT_FUNDS", "change": []};
        }
        else 
        {
            result = {"status" : "OPEN", "change" : change};
        }
    }
    // reverse cid before returning.
    cid.reverse();
    return result;
}
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));