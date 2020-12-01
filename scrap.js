var orderHandling = function(clientAccount ,product,inventory,inventoryThreshold,creditCheckMode) {
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