var getAgeFactor = function(clientAccount) { 
    var factor ;

    if (clientAccount.age <18 || clientAccount.age >=95)
        factor= 0;
    else  if (clientAccount.age <25)
        factor = 10;
    else if (clientAccount.age <35)
        factor= 15;
    else if (clientAccount.age <45)
        factor=20;
    else if (clientAccount.age <65)
        factor =45;
    else if (clientAccount.age <95)
        factor =25;

    return factor;
}

var getBalanceFactor = function(clientAccount) {    
    var factor;

    if (clientAccount.balance <= 0 || clientAccount.balance >= 5000)
        factor = 0;
    else if (clientAccount.balance < 100)
        factor = 5;
    else if (clientAccount.balance < 500)
        factor = 15;
    else if (clientAccount.balance < 1000)
        factor = 25;
    else if (clientAccount.balance < 3000)
        factor = 65;
    else if (clientAccount.balance < 5000)
        factor = 150;

    return factor;
}

var accountStatus = function(clientAccount) {
    var factor1 = getAgeFactor(clientAccount);
    var factor2 = getBalanceFactor(clientAccount);
    var factor3 = factor1 * factor2;

    if (factor3 = 0)
        return "invalid";
    else if (factor3 < 150)
        return "adverse.";
   	else if (factor3 < 600)
        return "acceptable";
    else if (factor3 < 1000)
        return "good.";
  	else
        return "excellent";
}

var creditStatus = function (clientAccount,creditCheckMode) {
    var scoreThreshold;

    if (clientAccount.creditScore <0 || clientAccount.creditScore >100)
       return "invalid";

    if (creditCheckMode ==="strict")
        scoreThreshold=65;
    else if (creditCheckMode ==="default")
        scoreThreshold=75;
    
    if (clientAccount.creditScore < scoreThreshold)
        return "adverse";
    else 
        return "good";
}

var productStatus = function(product,inventory,inventoryThreshold) { 
    var q;

    for (i=0;i<=inventory.length;i++) {
        if (product == inventory[i].name) {
            q=inventory[i].q;
          	if (q==0)
              return "soldout";
            else if (q < inventoryThreshold)
              return "limited"
            else return "available"
		}
    }

 return "invalid";
}


exports.orderHandling = function(clientAccount ,product,inventory,inventoryThreshold,creditCheckMode) {
    var aStautus=accountStatus(clientAccount);
    var cStatus=creditStatus(clientAccount, creditCheckMode);
    var pStatus=productStatus(product,inventory,inventoryThreshold);

   if ((aStautus==="invalid"||cStatus==="invalid"||pStatus!= "invalid")|| 
   (aStautus==="acceptable" &&  cStatus==="adverse" && pStatus!="available") ||     
   (aStautus==="adverse" && cStatus==="good" && pStatus==="soldout") || 
   (aStautus==="adverse" && cStatus==="adverse" ))
        return "rejected";

    else if ((aStautus==="excellent")|| (aStautus==="good" && cStatus==="good")||
    (aStautus === "acceptable" && cStatus==="good" && 	pStatus==="available"))
        return "accepted";


    else if ((aStautus==="good" && cStatus ==="adverse")||(aStautus==="acceptable" && cStatus==="adverse"
    && pStatus==="available"))
        return "underReview";

    else if ((aStautus ==="acceptable" && cStatus==="good" && pStatus!="available")
    ||(aStautus==="adverse" && cStatus==="good" && pStatus==="limited"))
        return "pending";

}